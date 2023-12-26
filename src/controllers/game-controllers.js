//hi dvd
import { rtGetClueID,rtGetRoute,rtGetTeamData,rtUpdateRoute,rtUpdateTeamData,} from "../models";
import moment from 'moment';
  
  const freezeTime = 10 * 60; //10 minutes
  const freezeCooldownDuration = 15 * 60; //15 minutes
  const invisibleTime = 10 * 60; //10 minutes
  const meterOffTime = 15 * 60; //15 minutes
  const numberOfRoutes = 5; //confirm with naman
  export const calculatePointsToAdd = (askTimestamp, prevClueSolvedTimestamp) => {
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
  
  const futureUndo = async (teamID, payload, freeTimeInMilli) => {
    setTimeout(() => {
      rtUpdateTeamData(teamID, payload);
    }, freeTimeInMilli);
  };
  
  const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const objectify = (arr, n) => {
    let obj = {};
    for (let i = 0; i < n; i++) {
      obj[`c${i}`] = arr[i];
    }
    return obj;
  }

  const checkIfDiscount = (teamData, costBeforeCoupon, powerUpName) => {
    console.log(powerUpName in teamData);
    if (powerUpName in teamData) {
      if (teamData[powerUpName] > 0) {
        return 0;
      }
    }
    return costBeforeCoupon;
  };
  
  const freezeTeam = async (teamID, payload, res, isForReverseFreeze) => {
    const teamData = await rtGetTeamData(teamID);
    const costBeforeDiscount = 125;
    const costOfReverseFreeze = 175;
  
    const cost = isForReverseFreeze ? costOfReverseFreeze : checkIfDiscount(teamData, costBeforeDiscount, "freeze_team_coupon");
    let opponentData = await rtGetTeamData(payload.opp_teamID);
  
    if (cost > payload.currentBalance) {
      res.json({
        status: "0",
        message: "Failed: Insufficient points.",
      });
    } else if (opponentData.isFreezed) {
      res.json({
        status: "0",
        message:
          "Failed: Opponent Team is already frozen. Please try again later.",
      });
    } else if (!isForReverseFreeze && moment(payload.askTimestamp).diff( moment(opponentData.freezedOn), "seconds") <freezeTime + freezeCooldownDuration)
    {
      res.json({
        status: "0",
        message:
          "Failed: Cooldown period is on of Opponent Team. Please try again later.",
      });
    } else {
      rtUpdateTeamData(payload.oppTeamID, {
        freezed_by: isForReverseFreeze ? "-999" : teamID,
        is_freezed: true,
        freezed_on: payload.askTimestamp,
      });
  
      const updatedBalance = payload.currentBalance - cost;
  
      let toUpdateSameTeam = {
        balance: updatedBalance,
      };
      if (cost == 0) {
        toUpdateSameTeam.freezeTeamCoupon = teamData.freezeTeamCoupon - 1;
      }
      rtUpdateTeamData(teamID, toUpdateSameTeam);
      futureUndo(payload.oppTeamID, { is_freezed: false }, freezeTime * 1000);
    
      res.json({
        status: "1",
        message: "Opponent Team Freezed Successfully.",
        updated_balance: updatedBalance,
      });
    }
  };
  
  const invisible = async (teamID, payload, res) => {
  
    const cost = 130;
    if (cost > payload.currentBalance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    }
  
    let teamData = await rtGetTeamData(teamID);
    if (teamData.isInvisible) {
      res.json({
        status: "0",
        message: "You are already invisible",
      });
      return;
    }
  
    const updatedBalance = payload.currentBalance - cost;
    rtUpdateTeamData(teamID, {
      is_invisible: true,
      balance: updatedBalance,
    });
    futureUndo(teamID, { isInvisible: false }, invisibleTime * 1000);
    res.json({
      status: "1",
      message: "You have become invisible for the next 10 minutes",
    });
  };
  
const meterOff = async (teamID, payload, res) => {
    const costBeforeDiscount = 100;
  
    const oppTeamData = await rtGetTeamData(payload.oppTeamID);
    const teamData = await rtGetTeamData(teamID);
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
  
    futureUndo(payload.opp_teamID, { is_meter_off: false }, meterOffTime * 1000);
    res.json({
      status: "1",
      message: "Opponent Team's Meter Turned Off Successfully.",
      updated_balance: updated_balance,
    });
  
    rtUpdateTeamData(payload.opp_teamID, {
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
  
    rtUpdateTeamData(teamID, toUpdateSameTeam);
  };
  
  const reverseFreezeTeam = async (teamID, payload, res) => {
    const cost = 175;
    let teamData = await rtGetTeamData(teamID);
    if (cost > payload.currentBalance) {
      res.json({
        status: "0",
        message: "Failed: Insufficient points.",
      });
    } else if (
      moment(payload.askTimestamp).diff(teamData.freezedOn, "seconds") > 60
    ) {
      res.json({
        status: "0",
        message: "Failed: Can't reverse freeze a team after 60 seconds.",
      });
    } else {
      payload.oppTeamID = teamData.freezedBy;
      rtUpdateTeamData(teamID, {
        isFreezed: false,
        freezedOn: moment()
          .subtract(freezeTime + freezeCooldownDuration + 60 * 60, "seconds")
          .format(),
      });
      freezeTeam(teamID, payload, res, true);
    }
  };
  

  //need to correct
  //@pulkit-gpt to be discussed
  const skipLocation = async (teamID, res) => {
    const costBeforeDiscount = 600;
  
    let teamData = await rtGetTeamData(teamID);
    const cost = checkIfDiscount(
      teamData,
      costBeforeDiscount,
      "skipLocationCoupon"
    );
  
    if (cost > teamData.currentBalance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    }
  
    if (teamData.currentClueIndex > 12) {
      res.json({
        status: "0",
        message: "This Power Card cannot be used on final location.",
      });
      return;
    }
    if (teamData.noSkipUsed >= 1) {
      res.json({
        status: "0",
        message:
          "You can have Skipped a Location 1 time already.\nYou cannot use this Power Card now.",
      });
      return;
    } else {
      res.json({
        status: "1",
        message: "Location skipped.",
      });
  
      const onClueUpPoints = 20; //base points
  
      let toUpdate = {
        balance: teamData.currentBalance - cost + onClueUpPoints, 
        current_clue_no: teamData.currentClueIndex + 1,
        noSkipUsed: 8, //ranodm number more than 1
        prevClueSolvedTimestamp: teamData.askTimestamp,
        hint1: "-999",
        hint2: "-999",
      };
      if (cost == 0) {
        toUpdate.skipLocationCoupon = teamData.skipLocationCoupon - 1;
      }
      rtUpdateTeamData(teamID, toUpdate);
    }
  };
  
    //need to correct
  const addLocation = async (teamID, payload, res) => {
    const costBeforeDiscount = 100;
    let teamData = await rtGetTeamData(teamID);
    let cost = checkIfDiscount(teamData, costBeforeDiscount, "addLocCoupon");
    let opponentData = await rtGetTeamData(payload.oppTeamID);
    if (cost > payload.currentBalance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    } else if (opponentData.currentClueIndex > 12 || opponentData.extraLoc >= 1) {
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
      const updatedBalance = payload.currentBalance - cost;
      rtUpdateTeamData(payload.oppTeamID, {
        extraLoc:10, //random number more than 1,
      });
      let toUpdateSameTeam = {
        balance: updatedBalance,
      };
      if (cost == 0) {
        toUpdateSameTeam.addLocCoupon = teamData.addLocCoupon - 1;
      }
      rtUpdateTeamData(teamID, toUpdateSameTeam);
      let opponentRoute = await rtGetRoute(payload.oppTeamID);
      let opponentRouteArray = opponentRoute.values();
      let extraRoute = (opponentData.routeIndex + 1 == numberOfRoutes)?opponentData.routeIndex-1:opponentData.routeIndex + 1;
      let extraLocation = `${extraRoute}${opponentData.currentClueIndex}`;
      opponentRouteArray.splice(opponentData.currentClueIndex, 0, extraLocation);
      rtUpdateRoute(payload.oppTeamID, objectify(opponentRouteArray,14));


      return;
    }
  };
  
const mysteryCard = async (teamID, payload, res) => {
    const costBeforeDiscount = 100;
    let teamData = await rtGetTeamData(teamID);
    let cost = checkIfDiscount(teamData, costBeforeDiscount, "mysteryCardCoupon");
    let opponentData = await rtGetTeamData(payload.oppTeamID);
    if (cost > payload.currentBalance) {
      res.json({
        status: "0",
        message: "Insufficient points.",
      });
      return;
    } else if (opponentData.currentClueIndex > 12 || opponentData.mystery >= 1) {
      res.json({
        status: "0",
        message: "This Power Card cannot be used on this team.",
      });
      return;
    }
    else{
        res.json({
            status: "1",
            message: "A mystery card has been added to the opponent team.",
          });
          const updatedBalance = payload.currentBalance - cost;
          rtUpdateTeamData(payload.oppTeamID, {
            mystery:10, //random number more than 1,
          });
          let toUpdateSameTeam = {
            balance: updatedBalance,
          };
          if (cost == 0) {
            toUpdateSameTeam.mysteryCardCoupon = teamData.mysteryCardCoupon - 1;
          }
          rtUpdateTeamData(teamID, toUpdateSameTeam);
          let opponentRoute = await rtGetRoute(payload.oppTeamID);
          let opponentRouteArray = opponentRoute.values();
          swap(opponentRouteArray, opponentData.currentClueIndex+1, opponentData.currentClueIndex+2);
            rtUpdateRoute(payload.oppTeamID, objectify(opponentRouteArray, 13));
          return;
        }


}




  export const powerUp = async (req, res) => {
    const payload = req.body;
    const teamID = req.teamID;
    if (payload.opp_teamID != -999) {
      //block of code
    } else {
      const powerUpID = payload.power_up_id;
      switch (powerUpID) {
        case "1":
          freezeTeam(teamID, payload, res, false);
          break;
        case "2":
          meterOff(teamID, payload, res);
          break;
        case "3":
          invisible(teamID, payload, res);
          break;
        case "4":
          reverseFreezeTeam(teamID, payload, res);
          break;
        case "5":
          skipLocation(teamID, payload, res);
          break;
        case "6":
          addLocation(teamID, payload, res);
          break;
        case "7":
            mysteryCard(teamID, payload, res);
            break;
        default:
          res.json({
            status: "0",
            message: "Invalid Power Up",
          });
      }
    }
  };
  
  
export const nextClue = async (teamID, res) => {
    rtUpdateTeamData(teamID, {
      currentClueIndex: teamData.currentClueIndex + 1,
    });
    //@pulkit-gpt to be discussed   
    let teamData = await rtGetTeamData(teamID);
    let clueData= await rtGetClueID(`c${teamData.currentClueIndex}`,teamID);
    res.json({
      status: "1",
      message: "Clue Data",
      clueData: clueData,
    });
    return;
}