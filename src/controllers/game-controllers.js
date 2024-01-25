//hi dvd
import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
} from "../models";
import config from "../config.js";
import utils from "../utils/game-utils";

import moment from "moment";

import { logger } from "../services/winston.js";

import { Mutex } from "async-mutex";
import { Exhausted } from "../errors/exhausted.error.js";
const mutexes = {};
for (let i = 0; i <= config.maxTeamID; i++) {
    let key = String(i).padStart(3, "0");
    mutexes[key] = new Mutex();
} // creates separate mutexes for each team

const futureUndo = async (teamID, payload, freeTimeInMilli) => {
    setTimeout(() => {
        rtUpdateTeamData(teamID, payload);
    }, freeTimeInMilli);
};

const freezeTeam = async (teamID, payload, res) => {
    const teamData = await rtGetTeamData(teamID);
    const costBeforeDiscount = config.costFreezeTeam;
    const costOfReverseFreeze = config.costReverseFreeze;
    const opponentTeamID = payload.opponentTeamID;
    const isForReverseFreeze = payload.isForReverseFreeze ? true : false;
    const cost = isForReverseFreeze
        ? costOfReverseFreeze
        : utils.checkIfDiscount(
              teamData,
              costBeforeDiscount,
              "freezeTeamCoupon",
          );
    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: `${teamID} on ${opponentTeamID}: Failed: Insufficient points.`,
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    }
    let opponentData = await rtGetTeamData(payload.opponentTeamID);
    if (opponentData.isInvisible) {
        res.json({
            status: "2",
            message: `${teamID} on ${opponentTeamID}: Failed: Opponent Team is invisible.`,
        });
        logger.log({
            level: "error",
            message: `Opponent Team is invisible for team ${opponentTeamID}`,
        });
        return;
    }
    if (opponentData.isFrozen) {
        res.json({
            status: "2",
            message: `${teamID} on ${opponentTeamID}: Failed: Opponent Team is already frozen. Please try again later.`,
        });
        logger.log({
            level: "error",
            message: `Opponent Team is already frozen for team ${opponentTeamID}`,
        });
    } else if (
        !isForReverseFreeze &&
        moment(payload.askTimestamp).diff(
            moment(opponentData.madeFrozenAtTime),
            "seconds",
        ) <
            config.freezeTime + config.freezeCooldownDuration
    ) {
        res.json({
            status: "2",
            message: `${teamID} on ${opponentTeamID} Failed: Cooldown period is on of Opponent Team. Please try again later.`,
        });
        logger.log({
            level: "error",
            message: `Cooldown period is on of Opponent Team for team ${opponentTeamID}`,
        });
    } else {
        await rtUpdateTeamData(payload.opponentTeamID, {
            madeFrozenBy: isForReverseFreeze ? "-999" : teamID,
            isFrozen: true,
            madeFrozenAtTime: payload.askTimestamp,
        });

        const updatedBalance = teamData.balance - cost;

        let toUpdateSameTeam = {
            balance: updatedBalance,
        };
        if (cost == 0) {
            toUpdateSameTeam.freezeTeamCoupon = teamData.freezeTeamCoupon - 1;
        }
        await rtUpdateTeamData(teamID, toUpdateSameTeam);
        futureUndo(
            payload.opponentTeamID,
            { isFrozen: false },
            config.freezeTime * 1000,
        );

        res.json({
            status: "1",
            message: `${teamID} on ${opponentTeamID}: Opponent Team Frozen Successfully.`,
            updated_balance: updatedBalance,
        });
        logger.log({
            level: "info",
            message: `Opponent Team ${payload.opponentTeamID} Frozen Successfully by team ${teamID}`,
        });
    }
};

const invisible = async (teamID, payload, res) => {
    const cost = 130;
    let teamData = await rtGetTeamData(teamID);
    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    }
    if (teamData.isFrozen) {
        res.json({
            status: "2",
            message: `You, ${teamID}, are frozen. You cannot use this Power Card.`,
        });
        logger.log({
            level: "error",
            message: `You are frozen. You cannot use this Power Card (for team ${teamID})`,
        });
        return;
    } else if (teamData.isInvisible) {
        res.json({
            status: "2",
            message: "You are already invisible",
        });
        logger.log({
            level: "error",
            message: `Team ${teamID} is already invisible`,
        });
        return;
    }

    const updatedBalance = teamData.balance - cost;
    await rtUpdateTeamData(teamID, {
        isInvisible: true,
        balance: updatedBalance,
        madeInvisibleAtTime: payload.askTimestamp,
    });
    futureUndo(teamID, { isInvisible: false }, config.invisibleTime * 1000);
    res.json({
        status: "1",
        message: "You have become invisible for the next 10 minutes",
    });
    logger.log({
        level: "info",
        message: `Team ${teamID} has become invisible`,
    });
};

const meterOff = async (teamID, payload, res) => {
    const costBeforeDiscount = config.costMeterOff;
    const opponentTeamID = payload.opponentTeamID;
    const teamData = await rtGetTeamData(teamID);
    const cost = utils.checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "meterOffCoupon",
    );

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Failed: Insufficient points.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    }
    const opponentTeamData = await rtGetTeamData(payload.opponentTeamID);
    if (opponentTeamData.isMeterOff) {
        res.json({
            status: "2",
            message: "Failed: Opponent Team's meter is already off.",
        });
        logger.log({
            level: "error",
            message: `Opponent Team's ${opponentTeamID} meter is already off for team ${teamID}`,
        });
        return;
    }

    const updated_balance = teamData.balance - cost;

    futureUndo(
        payload.opponentTeamID,
        { isMeterOff: false },
        config.meterOffTime * 1000,
    );
    res.json({
        status: "1",
        message: "Opponent Team's Meter Turned Off Successfully.",
        updated_balance: updated_balance,
    });
    logger.log({
        level: "info",
        message: `Opponent Team's ${opponentTeamID} Meter Turned Off Successfully by team ${teamID}`,
    });
    rtUpdateTeamData(payload.opponentTeamID, {
        isMeterOff: true,
        madeMeterOffAtTime: payload.askTimestamp,
    });

    let toUpdateSameTeam = {
        balance: updated_balance,
    };

    if (cost == 0) {
        toUpdateSameTeam.meterOffCoupon = teamData.meterOffCoupon - 1;
    }

    console.log("toUpdateSameTeam");
    console.log(toUpdateSameTeam);

    rtUpdateTeamData(teamID, toUpdateSameTeam);
};

const reverseFreezeTeam = async (teamID, payload, res) => {
    const cost = 175;
    let teamData = await rtGetTeamData(teamID);
    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Failed: Insufficient points.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    } else if (
        moment(payload.askTimestamp).diff(
            teamData.madeFrozenAtTime,
            "seconds",
        ) > 60
    ) {
        res.json({
            status: "0",
            message: "Failed: Can't reverse freeze a team after 60 seconds.",
        });
        logger.log({
            level: "error",
            message: `Can't reverse freeze a team after 60 seconds for team ${teamID}`,
        });
        return;
    } else {
        payload.isForReverseFreeze = true;
        payload.opponentTeamID = teamData.madeFrozenBy;
        rtUpdateTeamData(teamID, {
            isFrozen: false,
            madeFrozenAtTime: moment()
                .subtract(
                    config.freezeTime + config.freezeCooldownDuration + 60 * 60,
                    "seconds",
                )
                .format(),
        });
        freezeTeam(teamID, payload, res);
    }
};

//@pulkit-gpt to be discussed
const skipLocation = async (teamID, payload, res) => {
    const costBeforeDiscount = config.costSkipLocation;

    let teamData = await rtGetTeamData(teamID);
    const cost = utils.checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "skipLocationCoupon",
    );

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    }

    if (teamData.currentClueIndex > 12) {
        res.json({
            status: "0",
            message: "This Power Card cannot be used on final location.",
        });
        logger.log({
            level: "error",
            message: `This Power Card cannot be used on final location for team ${teamID}`,
        });
        return;
    }
    if (teamData.noSkipUsed >= 1) {
        res.json({
            status: "2",
            message:
                "You can have Skipped a Location 1 time already.\nYou cannot use this Power Card now.",
        });
        logger.log({
            level: "error",
            message: `You can have Skipped a Location 1 time already for team ${teamID}`,
        });
        return;
    } else {
        //@pulkit-gpt ask vineet
        const onClueUpPoints = 20; //base points

        teamData.currentClueIndex += 1;
        rtUpdateTeamData(teamID, {
            currentClueIndex: teamData.currentClueIndex,
            previousClueSolvedAtTime: payload.askTimestamp,
            balance: teamData.balance + onClueUpPoints,
            hint1: "-999",
            hint2: "-999",
            noSkipUsed: 10, //random number more than 1
        });
        //@pulkit-gpt to be discussed
        let clueData = await rtGetClueData(
            `c${teamData.currentClueIndex}`,
            teamID,
        );
        let clueSent = {
            clue: clueData.clue,
            clueType: clueData.clueType,
            targetLocationLatitude: clueData.targetLocationLatitude,
            targetLocationLongitude: clueData.targetLocationLongitude,
        };

        res.json({
            status: "1",
            message: "Location skipped.",
            clueData: clueSent,
        });
        logger.log({
            level: "info",
            message: `Location skipped for team ${teamID}`,
        });
        return;
    }
};

const addLocation = async (teamID, payload, res) => {
    const costBeforeDiscount = config.costAddLocation;
    const opponentTeamID = payload.opponentTeamID;
    let teamData = await rtGetTeamData(teamID);
    let cost = utils.checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "addLocCoupon",
    );

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    }
    let opponentData = await rtGetTeamData(payload.opponentTeamID);
    if (opponentData.currentClueIndex > 12 || opponentData.extraLoc >= 1) {
        res.json({
            status: "2",
            message: "This team already has an extra location.",
        });
        logger.log({
            level: "error",
            message: `This opponent team ${opponentTeamID} already has an extra location so powercard can't be used by team ${teamID}`,
        });
        return;
    } else {
        res.json({
            status: "1",
            message: "An extra location has been added to the opponent team.",
        });
        logger.log({
            level: "info",
            message: `An extra location has been added to the opponent team ${opponentTeamID} by team ${teamID}`,
        });
        const updatedBalance = teamData.balance - cost;
        rtUpdateTeamData(payload.opponentTeamID, {
            extraLoc: 10, //random number more than 1,
        });
        let toUpdateSameTeam = {
            balance: updatedBalance,
        };
        if (cost == 0) {
            toUpdateSameTeam.addLocCoupon = teamData.addLocCoupon - 1;
        }
        rtUpdateTeamData(teamID, toUpdateSameTeam);
        let opponentRoute = await rtGetRoute(payload.opponentTeamID);
        let opponentRouteArray = Object.values(opponentRoute);
        let extraRoute =
            opponentData.routeIndex + 1 > config.numberOfRoutes
                ? opponentData.routeIndex - 1
                : opponentData.routeIndex + 1;
        let extraLocation = `${extraRoute}-${opponentData.currentClueIndex}`;
        opponentRouteArray.splice(
            opponentData.currentClueIndex,
            0,
            extraLocation,
        );
        rtUpdateRoute(
            payload.opponentTeamID,
            utils.objectify(opponentRouteArray, opponentRouteArray.length),
        );

        return;
    }
};

const mysteryCard = async (teamID, payload, res) => {
    const costBeforeDiscount = config.costMysteryCard;
    const opponentTeamID = payload.opponentTeamID;
    let teamData = await rtGetTeamData(teamID);
    let cost = utils.checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "mysteryCardCoupon",
    );

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points for team ${teamID}`,
        });
        return;
    }
    let opponentData = await rtGetTeamData(payload.opponentTeamID);
    if (opponentData.currentClueIndex > 12 || opponentData.mystery >= 1) {
        res.json({
            status: "2",
            message: "This Power Card cannot be used on this team.",
        });
        logger.log({
            level: "error",
            message: `This Power Card cannot be used on this opponent team ${opponentTeamID} by team ${teamID}`,
        });
        return;
    } else {
        res.json({
            status: "1",
            message: "A mystery card has been added to the opponent team.",
        });
        logger.log({
            level: "info",
            message: `A mystery card has been added to the opponent team ${opponentTeamID} by team ${teamID}`,
        });
        const updatedBalance = teamData.balance - cost;
        rtUpdateTeamData(payload.opponentTeamID, {
            mystery: 10, //random number more than 1,
        });
        let toUpdateSameTeam = {
            balance: updatedBalance,
        };
        if (cost == 0) {
            toUpdateSameTeam.mysteryCardCoupon = teamData.mysteryCardCoupon - 1;
        }
        rtUpdateTeamData(teamID, toUpdateSameTeam);
        let opponentRoute = await rtGetRoute(payload.opponentTeamID);
        let opponentRouteArray = Object.values(opponentRoute);
        utils.swap(
            opponentRouteArray,
            opponentData.currentClueIndex,
            opponentData.currentClueIndex + 1,
        );

        rtUpdateRoute(
            payload.opponentTeamID,
            utils.objectify(opponentRouteArray, opponentRouteArray.length),
        );
        return;
    }
};

export const powerUp = async (req, res) => {
    const payload = req.body;
    const teamID = payload.teamID;
    const powerUpID = payload.powerUpID;

    const powerUpFunctions = {
        1: freezeTeam,
        2: meterOff,
        3: invisible,
        4: reverseFreezeTeam,
        5: skipLocation,
        6: addLocation,
        7: mysteryCard,
    };

    const powerUpFunction = powerUpFunctions[powerUpID];

    if (powerUpFunction) {
        //Lock the mutex of opponent team if opponent team is present else lock the mutex of team
        const lockID = payload.opponentTeamID ? payload.opponentTeamID : teamID;
        const release = await mutexes[lockID].acquire(); // lock the mutex
        try {
            await powerUpFunction(teamID, payload, res);
        } finally {
            release(); // release the mutex
        }
    } else {
        res.json({
            status: "0",
            message: "Invalid Power Up",
        });
        logger.log({
            level: "error",
            message: `Invalid Power Up ${powerUpID} for team ${teamID}`,
        });
    }
};

const isDm = true;
export const nextClue = async (payload, res) => {
    if (isDm) {
        console.log("here in nextclue");
    }
    let data = payload.body;
    let teamID = data.teamID;
    let teamData = await rtGetTeamData(teamID);
    if (teamData.state == "Finished") {
        //@pulkit-gpt check for teams w/ extra location
        throw new Exhausted("You have Finished the game.");
    } else if (!(`c${teamData.currentClueIndex + 1}` in teamData.route)) {
        throw new Exhausted("You have reached the Final Location.");
    }
    let onClueUpPoints = utils.calculatePointsToAdd(
        data.askTimestamp,
        teamData.previousClueSolvedAtTime,
    );
    teamData.currentClueIndex += 1;

    rtUpdateTeamData(teamID, {
        currentClueIndex: teamData.currentClueIndex,
        previousClueSolvedAtTime: data.askTimestamp,
        balance: teamData.balance + onClueUpPoints,
        hint1: "-999",
        hint2: "-999",
    });
    //@pulkit-gpt to be discussed
    let clueData = await rtGetClueData(`c${teamData.currentClueIndex}`, teamID);
    let clueSent = {
        clue: clueData.clue,
        clueType: clueData.clueType,
        targetLocationLatitude: clueData.targetLocationLatitude,
        targetLocationLongitude: clueData.targetLocationLongitude,
    };

    res.json({
        status: "1",
        message: "Clue Data",
        clueData: clueSent,
    });
    logger.log({ level: "info", message: `Clue Data for team ${teamID}` });
    return;
};

export const getClue = async (payload, res) => {
    let data = payload.body;
    let teamID = data.teamID;
    let teamData = await rtGetTeamData(teamID);
    if (teamData.state == "finished") {
        throw new Exhausted("You have finsihed the game.");
    }
    //@pulkit-gpt to be discussed
    let clueData = await rtGetClueData(`c${teamData.currentClueIndex}`, teamID);
    let clueSent = {
        clue: clueData.clue,
        clueType: clueData.clueType,
        targetLocationLatitude: clueData.targetLocationLatitude,
        targetLocationLongitude: clueData.targetLocationLongitude,
        routeId: teamData.route[`c${teamData.currentClueIndex}`],
    };

    res.json({
        status: "1",
        message: "Clue Data",
        clueData: clueSent,
    });
    logger.log({ level: "info", message: `Clue Data for team ${teamID}` });
    return;
};

export const getHint = async (req, res) => {
    let teamID = req.body.teamID;
    let teamData = await rtGetTeamData(teamID);
    let costHint1 = 20;
    let costHint2 = 40;
    let clueData = await rtGetClueData(`c${teamData.currentClueIndex}`, teamID);
    let hint1Sent = {
        hint: clueData.hint1,
        hintType: clueData.hint1Type,
    };
    let hint2Sent = {
        hint: clueData.hint2,
        hintType: clueData.hint2Type,
    };

    if (teamData.hint1 == -999 && teamData.balance >= costHint1) {
        rtUpdateTeamData(teamID, {
            balance: teamData.balance - costHint1,
            hint1: clueData.hint1,
            hint1Type: clueData.hint1Type,
        });

        res.json({
            status: "1",
            message: "Hint 1",
            hint: hint1Sent,
        });
        logger.log({ level: "info", message: `Hint 1 for team ${teamID}` });
        return;
    } else if (teamData.hint2 == -999 && teamData.balance >= costHint2) {
        rtUpdateTeamData(teamID, {
            balance: teamData.balance - costHint2,
            hint2: clueData.hint2,
            hint2Type: clueData.hint2Type,
        });
        res.json({
            status: "1",
            message: "Hint 2",
            hint: hint2Sent,
        });
        logger.log({ level: "info", message: `Hint 2 for team ${teamID}` });
        return;
    } else {
        res.json({
            status: "0",
            message:
                //@pulkit-gpt to be discussed
                "Insufficient points, or you have already used both hints.",
        });
        logger.log({
            level: "error",
            message: `Insufficient points, or you have already used both hints for team ${teamID}`,
        });
        return;
    }
};

export const stateChange = async (req, res) => {
    let teamID = req.body.teamID;
    rtUpdateTeamData(teamID, { state: "playing" });
    res.json({
        status: "1",
        message: "State changed",
    });
};
