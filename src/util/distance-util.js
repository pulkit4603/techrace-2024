import getDistance from "geolib/es/getDistance";
export const distanceFinder = (lat1, lon1, lat2, lon2) => {
    return getDistance(
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 },
    );
};
// @pulkit4603 handle errors (or joi/yup)
