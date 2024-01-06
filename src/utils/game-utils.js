import moment from "moment";

const objectify = (arr, n) => {
    let obj = {};
    for (let i = 0; i < n; i++) {
        obj[`c${i + 1}`] = arr[i];
    }
    return obj;
};

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

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

const checkIfDiscount = (teamData, costBeforeCoupon, powerUpName) => {
    console.log(powerUpName in teamData);
    if (powerUpName in teamData && teamData[powerUpName] > 0) {
        return 0;
    }
    return costBeforeCoupon;
};

export default {
    objectify,
    swap,
    calculatePointsToAdd,
    checkIfDiscount,
};
