//hi dvd
import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
} from "../models";
import moment from "moment";

import { logger } from "../logger/winston";

import { objectify, swap } from "../utils/game-utils";

const freezeTime = 10 * 60; //10 minutes
const freezeCooldownDuration = 15 * 60; //15 minutes
const invisibleTime = 10 * 60; //10 minutes
const meterOffTime = 15 * 60; //15 minutes
const numberOfRoutes = 2; //confirm with naman

// freeze.  125
// meterOff  100
// invisible. 130
// reverseFreeze. 175
// skip location 225
// add location 200
// mysterycard 250

const calculatePointsToAdd = (askTimestamp, previousClueSolvedAtTime) => {
    const basePoints = 20;
    const minusFrom = 60;
    console.log(
        moment(askTimestamp).diff(moment(previousClueSolvedAtTime), "minutes"),
    );

    const bonusPoints =
        minusFrom -
        moment(askTimestamp).diff(previousClueSolvedAtTime, "minutes");

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
    const opponentTeamID = payload.opponentTeamID;
    const cost = isForReverseFreeze
        ? costOfReverseFreeze
        : checkIfDiscount(teamData, costBeforeDiscount, "freezeTeamCoupon");
    let opponentData = await rtGetTeamData(payload.opponentTeamID);

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Failed: Insufficient points.",
        });
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
    } else if (opponentData.isFrozen) {
        res.json({
            status: "2",
            message:
                "Failed: Opponent Team is already frozen. Please try again later.",
        });
        logger.log({"level": "error", "message": `Opponent Team is already frozen for team ${opponentTeamID}`});
    } else if (
        !isForReverseFreeze &&
        moment(payload.askTimestamp).diff(
            moment(opponentData.madeFrozenAtTime),
            "seconds",
        ) <
            freezeTime + freezeCooldownDuration
    ) {
        res.json({
            status: "2",
            message:
                "Failed: Cooldown period is on of Opponent Team. Please try again later.",
        });
        logger.log({"level": "error", "message": `Cooldown period is on of Opponent Team for team ${opponentTeamID}`});
    } else {
        rtUpdateTeamData(payload.opponentTeamID, {
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
        rtUpdateTeamData(teamID, toUpdateSameTeam);
        futureUndo(
            payload.opponentTeamID,
            { isFrozen: false },
            freezeTime * 1000,
        );

        res.json({
            status: "1",
            message: "Opponent Team Frozen Successfully.",
            updated_balance: updatedBalance,
        });
        logger.log({"level": "info", "message": `Opponent Team ${payload.opponentTeamID} Frozen Successfully by team ${teamID}`});
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
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
        return;
    }

    if (teamData.isInvisible) {
        res.json({
            status: "2",
            message: "You are already invisible",
        });
        logger.log({"level": "error", "message": `Team ${teamID} is already invisible`});
        return;
    }

    const updatedBalance = teamData.balance - cost;
    rtUpdateTeamData(teamID, {
        isInvisible: true,
        balance: updatedBalance,
        madeInvisibleAtTime: payload.askTimestamp,
    });
    futureUndo(teamID, { isInvisible: false }, invisibleTime * 1000);
    res.json({
        status: "1",
        message: "You have become invisible for the next 10 minutes",
    });
    logger.log({"level": "info", "message": `Team ${teamID} has become invisible`});
};

const meterOff = async (teamID, payload, res) => {
    const costBeforeDiscount = 100;
    const opponentTeamID = payload.opponentTeamID;
    const opponentTeamData = await rtGetTeamData(payload.opponentTeamID);
    const teamData = await rtGetTeamData(teamID);
    const cost = checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "meterOffCoupon",
    );

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Failed: Insufficient points.",
        });
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
        return;
    }
    if (opponentTeamData.isMeterOff) {
        res.json({
            status: "2",
            message: "Failed: Opponent Team's meter is already off.",
        });
        logger.log({"level": "error", "message": `Opponent Team's ${opponentTeamID} meter is already off for team ${teamID}`});
        return;
    }

    const updated_balance = teamData.balance - cost;

    futureUndo(
        payload.opponentTeamID,
        { isMeterOff: false },
        meterOffTime * 1000,
    );
    res.json({
        status: "1",
        message: "Opponent Team's Meter Turned Off Successfully.",
        updated_balance: updated_balance,
    });
    logger.log({"level": "info", "message": `Opponent Team's ${opponentTeamID} Meter Turned Off Successfully by team ${teamID}`});
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
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
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
        logger.log({"level": "error", "message": `Can't reverse freeze a team after 60 seconds for team ${teamID}`});
        return;
    } else {
        payload.opponentTeamID = teamData.madeFrozenBy;
        rtUpdateTeamData(teamID, {
            isFrozen: false,
            madeFrozenAtTime: moment()
                .subtract(
                    freezeTime + freezeCooldownDuration + 60 * 60,
                    "seconds",
                )
                .format(),
        });
        freezeTeam(teamID, payload, res, true);
    }
};

//@pulkit-gpt to be discussed
const skipLocation = async (teamID, payload, res) => {
    const costBeforeDiscount = 225;

    let teamData = await rtGetTeamData(teamID);
    const cost = checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "skipLocationCoupon",
    );

    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
        return;
    }

    if (teamData.currentClueIndex > 12) {
        res.json({
            status: "0",
            message: "This Power Card cannot be used on final location.",
        });
        logger.log({"level": "error", "message": `This Power Card cannot be used on final location for team ${teamID}`});
        return;
    }
    if (teamData.noSkipUsed >= 1) {
        res.json({
            status: "2",
            message:
                "You can have Skipped a Location 1 time already.\nYou cannot use this Power Card now.",
        });
        logger.log({"level": "error", "message": `You can have Skipped a Location 1 time already for team ${teamID}`});
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
        logger.log({"level": "info", "message": `Location skipped for team ${teamID}`});
        return;
    }
};

const addLocation = async (teamID, payload, res) => {
    const costBeforeDiscount = 200;
    const opponentTeamID = payload.opponentTeamID;
    let teamData = await rtGetTeamData(teamID);
    let cost = checkIfDiscount(teamData, costBeforeDiscount, "addLocCoupon");
    let opponentData = await rtGetTeamData(payload.opponentTeamID);
    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
        return;
    } else if (
        opponentData.currentClueIndex > 12 ||
        opponentData.extraLoc >= 1
    ) {
        res.json({
            status: "2",
            message: "This Power Card cannot be used on this team.",
        });
        logger.log({"level": "error", "message": `This Power Card cannot be used on this opponent team ${opponentTeamID} by team ${teamID}`});
        return;
    } else {
        res.json({
            status: "1",
            message: "An extra location has been added to the opponent team.",
        });
        logger.log({"level": "info", "message": `An extra location has been added to the opponent team ${opponentTeamID} by team ${teamID}`});
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
            opponentData.routeIndex + 1 > numberOfRoutes
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
            objectify(opponentRouteArray, opponentRouteArray.length),
        );

        return;
    }
};

const mysteryCard = async (teamID, payload, res) => {
    const costBeforeDiscount = 250;
    const opponentTeamID = payload.opponentTeamID;
    let teamData = await rtGetTeamData(teamID);
    let cost = checkIfDiscount(
        teamData,
        costBeforeDiscount,
        "mysteryCardCoupon",
    );
    let opponentData = await rtGetTeamData(payload.opponentTeamID);
    if (cost > teamData.balance) {
        res.json({
            status: "3",
            message: "Insufficient points.",
        });
        logger.log({"level": "error", "message": `Insufficient points for team ${teamID}`});
        return;
    } else if (
        opponentData.currentClueIndex > 12 ||
        opponentData.mystery >= 1
    ) {
        res.json({
            status: "2",
            message: "This Power Card cannot be used on this team.",
        });
        logger.log({"level": "error", "message": `This Power Card cannot be used on this opponent team ${opponentTeamID} by team ${teamID}`});
        return;
    } else {
        res.json({
            status: "1",
            message: "A mystery card has been added to the opponent team.",
        });
        logger.log({"level": "info", "message": `A mystery card has been added to the opponent team ${opponentTeamID} by team ${teamID}`});
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
        swap(
            opponentRouteArray,
            opponentData.currentClueIndex,
            opponentData.currentClueIndex + 1,
        );

        rtUpdateRoute(
            payload.opponentTeamID,
            objectify(opponentRouteArray, opponentRouteArray.length),
        );
        return;
    }
};

export const powerUp = async (req, res) => {
    const payload = req.body;
    const teamID = payload.teamID;
    //@pulkit4603 to be discussed (-999)

    const powerUpID = payload.powerUpID;
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
            logger.log({"level": "error", "message": `Invalid Power Up ${powerUpID} for team ${teamID}`});
    }
};

export const nextClue = async (payload, res) => {
    let data = payload.body;
    let teamID = data.teamID;
    let teamData = await rtGetTeamData(teamID);
    if (teamData.currentClueIndex == 13) {
        //@pulkit-gpt check for teams w/ extra location
        res.json({
            status: "0",
            message: "You have reached the final location.",
        });
        logger.log({"level": "error", "message": `You have reached the final location for team ${teamID}`});
        return;
    }
    let onClueUpPoints = calculatePointsToAdd(
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
    logger.log({"level": "info", "message": `Clue Data for team ${teamID}`});
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
        logger.log({"level": "info", "message": `Hint 1 for team ${teamID}`});
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
        logger.log({"level": "info", "message": `Hint 2 for team ${teamID}`});
        return;
    } else {
        res.json({
            status: "0",
            message:
                //@pulkit-gpt to be discussed
                "Insufficient points, or you have already used both hints.",
        });
        logger.log({"level": "error", "message": `Insufficient points, or you have already used both hints for team ${teamID}`});
        return;
    }
};
