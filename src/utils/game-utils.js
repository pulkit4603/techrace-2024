import moment from "moment";
import { Exhausted, Unauthorized } from "../errors";
import config from "../config";

/**
 * @param {array} arr
 * @param {number} n\
 * Converts an array to an object
 */
const objectify = (arr, n) => {
    let obj = {};
    for (let i = 0; i < n; i++) {
        obj[`c${i + 1}`] = arr[i];
    }
    return obj;
};

/**
 * @param {array} arr
 * @param {number} i
 * @param {number} j\
 * Swaps the elements of the array
 */
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

/**
 * @param {number} askTimestamp
 * @param {number} previousClueSolvedAtTime\
 * Calculates the points to be added to the team
 */
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

/**
 * @param {object} teamData
 * @param {number} costBeforeCoupon
 * @param {string} powerUpName\
 * Checks if the team has a discount coupon or not.\
 * If yes, then returns 0; else returns the costBeforeCoupon.
 */
const checkIfDiscount = (teamData, costBeforeCoupon, powerUpName) => {
    console.log(powerUpName in teamData);
    if (powerUpName in teamData && teamData[powerUpName] > 0) {
        return 0;
    }
    return costBeforeCoupon;
};

/**
 * @param {object} teamData - Includes teamID and balance
 * @param {number} cost
 * @param {number} powerUpIndex\
 * Validates if the balance is sufficient or not
 */
const validateBalance = (teamData, cost, powerUpIndex) => {
    if (teamData.balance < cost) {
        throw new Unauthorized("Insufficient Balance", {
            teamID: teamData.teamID,
            powerUpName: config.powerUpNames[powerUpIndex],
            balance: teamData.balance,
        });
    }
};

/**
 * @param {number} teamID
 * @param {number} opponentTeamID
 * @param {boolean} isPowerUpExhausted
 * @param {number} powerUpIndex\
 * Validates if the power up is exhausted or not
 */
const validatePowerUpState = (
    teamID,
    opponentTeamID,
    isPowerUpExhausted,
    powerUpIndex,
) => {
    if (isPowerUpExhausted) {
        throw new Exhausted("Power Up Already Exhausted", {
            teamID: teamID,
            powerUp: config.powerUpNames[powerUpIndex],
            opponentTeamID: opponentTeamID,
        });
    }
};

export default {
    objectify,
    swap,
    calculatePointsToAdd,
    checkIfDiscount,
    validateBalance,
    validatePowerUpState,
};
