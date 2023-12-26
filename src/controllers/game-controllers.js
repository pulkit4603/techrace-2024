//hi dvd
import { /*rtGetClueID,rtGetRoute,*/rtGetTeamData,/*rtUpdateRoute,*/rtUpdateTeamData,} from "../models";
import moment from 'moment';
  
  const freezeTime = 10 * 60; //10 minutes
  const freezeCooldownDuration = 15 * 60; //15 minutes
  const invisibleTime = 10 * 60; //10 minutes
  const meterOffTime = 15 * 60; //15 minutes
  
  const calculatePointsToAdd = (askTimestamp, prevClueSolvedTimestamp) => {
    const basePoints = 20;
    const minusFrom = 60;
    console.log(
        moment(askTimestamp).diff(moment(prevClueSolvedTimestamp), "minutes")
    );

    const bonusPoints =
        minusFrom -
        moment(askTimestamp).diff(prevClueSolvedTimestamp, "minutes");

    console.log("bonusPoints");
    console.log(bonusPoints);

    let onClueUpPoints = basePoints + (bonusPoints < 0 ? 0 : bonusPoints);
    console.log("onClueUpPoints");
    console.log(onClueUpPoints); //80
  
    return onClueUpPoints;
  };
  
  const futureUndo = async (tid, payload, freeTimeInMilli) => {
    setTimeout(() => {
      rtUpdateTeamData(tid, payload);
    }, freeTimeInMilli);
  };
  
  const checkIfDiscount = (teamData, costBeforeCoupon, powerUpName) => {
    console.log(powerUpName in teamData);
    if (powerUpName in teamData) {
      if (teamData[powerUpName] > 0) {
        return 0;
      }
    }
    return costBeforeCoupon;
  };
  
  const freezeTeam = async (tid, payload, res, isForReverseFreeze) => {
    const teamData = await rtGetTeamData(tid);
    const costBeforeDiscount = 125;
    const costOfReverseFreeze = 175;
  
    const cost = isForReverseFreeze ? costOfReverseFreeze : checkIfDiscount(teamData, costBeforeDiscount, "freeze_team_coupon");
    let opponentData = await rtGetTeamData(payload.opp_tid);
  
    if (cost > payload.current_balance) {
      res.json({
        status: "0",
        message: "Failed: Insufficient points.",
      });
    } else if (opponentData.is_freezed) {
      res.json({
        status: "0",
        message:
          "Failed: Opponent Team is already frozen. Please try again later.",
      });
    } else if (!isForReverseFreeze && moment(payload.ask_timestamp).diff( moment(opponentData.freezed_on), "seconds") <freezeTime + freezeCooldownDuration)
    {
      res.json({
        status: "0",
        message:
          "Failed: Cooldown period is on of Opponent Team. Please try again later.",
      });
    } else {
      rtUpdateTeamData(payload.opp_tid, {
        freezed_by: isForReverseFreeze ? "-999" : tid,
        is_freezed: true,
        freezed_on: payload.ask_timestamp,
      });
  
      const updated_balance = payload.current_balance - cost;
  
      let toUpdateSameTeam = {
        balance: updated_balance,
      };
      if (cost == 0) {
        toUpdateSameTeam.freeze_team_coupon = teamData.freeze_team_coupon - 1;
      }
      rtUpdateTeamData(tid, toUpdateSameTeam);
      futureUndo(payload.opp_tid, { is_freezed: false }, freezeTime * 1000);
    
      res.json({
        status: "1",
        message: "Opponent Team Freezed Successfully.",
        updated_balance: updated_balance,
      });
    }
  };
  
  const invisible = async (tid, payload, res) => {
  
    const cost = 130;
    if (cost > payload.current_balance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    }
  
    let teamData = await rtGetTeamData(tid);
    if (teamData.is_invisible) {
      res.json({
        status: "0",
        message: "You are already invisible",
      });
      return;
    }
  
    const updated_balance = payload.current_balance - cost;
    rtUpdateTeamData(tid, {
      is_invisible: true,
      balance: updated_balance,
    });
    futureUndo(tid, { is_invisible: false }, invisibleTime * 1000);
    res.json({
      status: "1",
      message: "You have become invisible for the next 10 minutes",
    });
  };
  
  const meterOff = async (tid, payload, res) => {
    const costBeforeDiscount = 100;
  
    const oppTeamData = await rtGetTeamData(payload.opp_tid);
    const teamData = await rtGetTeamData(tid);
    const cost = checkIfDiscount(
      teamData,
      costBeforeDiscount,
      "meter_off_coupon"
    );
  
    if (cost > payload.current_balance) {
      res.json({
        status: "0",
        message: "Failed: Insufficient points.",
      });
      return;
    }
    if (oppTeamData.is_meter_off) {
      res.json({
        status: "0",
        message: "Failed: Opponent Team's meter is already off.",
      });
      return;
    }
  
    const updated_balance = payload.current_balance - cost;
  
    futureUndo(payload.opp_tid, { is_meter_off: false }, meterOffTime * 1000);
    res.json({
      status: "1",
      message: "Opponent Team's Meter Turned Off Successfully.",
      updated_balance: updated_balance,
    });
  
    rtUpdateTeamData(payload.opp_tid, {
      is_meter_off: true,
      meter_off_on: payload.ask_timestamp,
    });
  
    let toUpdateSameTeam = {
      balance: updated_balance,
    };
  
    if (cost == 0) {
      toUpdateSameTeam.meter_off_coupon = teamData.meter_off_coupon - 1;
    }
  
    console.log("toUpdateSameTeam");
    console.log(toUpdateSameTeam);
  
    rtUpdateTeamData(tid, toUpdateSameTeam);
  };
  
  const reverseFreezeTeam = async (tid, payload, res) => {
    const cost = 175;
    let teamData = await rtGetTeamData(tid);
    if (cost > payload.current_balance) {
      res.json({
        status: "0",
        message: "Failed: Insufficient points.",
      });
    } else if (
      moment(payload.ask_timestamp).diff(teamData.freezed_on, "seconds") > 60
    ) {
      res.json({
        status: "0",
        message: "Failed: Can't reverse freeze a team after 60 seconds.",
      });
    } else {
      payload.opp_tid = teamData.freezed_by;
      rtUpdateTeamData(tid, {
        is_freezed: false,
        freezed_on: moment()
          .subtract(freezeTime + freezeCooldownDuration + 60 * 60, "seconds")
          .format(),
      });
      freezeTeam(tid, payload, res, true);
    }
  };
  

  //need to correct
  const skipLocation = async (tid, payload, res) => {
    const costBeforeDiscount = 600;
  
    let teamData = await rtGetTeamData(tid);
    const cost = checkIfDiscount(
      teamData,
      costBeforeDiscount,
      "guess_loc_coupon"
    );
  
    if (cost > payload.current_balance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    }
  
    if (teamData.current_clue_no > 12) {
      res.json({
        status: "0",
        message: "This Power Card cannot be used on final location.",
      });
      return;
    }
    if (teamData.no_skip_used >= 1) {
      res.json({
        status: "0",
        message:
          "You can have Skipped a Location 1 time already.\nYou cannot use this Power Card now.",
      });
      return;
    } else {
      res.json({
        status: "1",
        message: "Correct guess.",
      });
  
      const onClueUpPoints = calculatePointsToAdd(
        payload.ask_timestamp,
        teamData.prev_clue_solved_timestamp
      );
  
      let toUpdate = {
        balance: payload.current_balance - cost + onClueUpPoints, 
        current_clue_no: teamData.current_clue_no + 1,
        //cid: constructCid(teamData.current_clue_no + 1),
        no_guessed_used: teamData.no_guessed_used + 1,
        prev_clue_solved_timestamp: payload.ask_timestamp,
        hint_1: "-999",
        hint_2: "-999",
      };
      if (cost == 0) {
        toUpdate.guess_loc_coupon = teamData.guess_loc_coupon - 1;
      }
      rtUpdateTeamData(tid, toUpdate);
    }
  };
  
//need to correct
  const addLocation = async (tid, payload, res) => {
    const costBeforeDiscount = 100;
    let cost = checkIfDiscount(teamData, costBeforeDiscount, "add_loc_coupon");
    let teamData = await rtGetTeamData(tid);
    let opponentData = await rtGetTeamData(payload.opp_tid);
    if (cost > payload.current_balance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    } else if (opponentData.current_clue_no > 12 || opponentData.extra_loc >= 3) {
      res.json({
        status: "0",
        message: "This Power Card cannot be used on this team.",
      });
      return;
    } else {
      res.json({
        status: "1",
        message: "An extra location has been added to the opponent team.",
      });
      const updated_balance = payload.current_balance - cost;
      rtUpdateTeamData(payload.opp_tid, {
        extra_loc: payload.opp_tid + 1,
        is_extra_loc_added: true,
      });
      let toUpdateSameTeam = {
        balance: updated_balance,
      };
      if (cost == 0) {
        toUpdateSameTeam.add_loc_coupon = teamData.add_loc_coupon - 1;
      }
      rtUpdateTeamData(tid, toUpdateSameTeam);
      return;
    }
  };
  

  export const powerUp = async (req, res) => {
    const payload = req.body;
    const tid = req.tid;
    if (payload.opp_tid != -999) {
      //block of code
    } else {
      const powerUpID = payload.power_up_id;
      switch (powerUpID) {
        case "1":
          freezeTeam(tid, payload, res, false);
          break;
        case "2":
          meterOff(tid, payload, res);
          break;
        case "3":
          invisible(tid, payload, res);
          break;
        case "4":
          reverseFreezeTeam(tid, payload, res);
          break;
        case "5":
          skipLocation(tid, payload, res);
          break;
        case "6":
          addLocation(tid, payload, res);
          break;
        default:
          res.json({
            status: "0",
            message: "Invalid Power Up",
          });
      }
    }
  };
  
  
