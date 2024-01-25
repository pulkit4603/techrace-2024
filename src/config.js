//game-config variables
export default {
    freezeTime: 10 * 60, //10 minutes
    freezeCooldownDuration: 15 * 60, //15 minutes
    invisibleTime: 10 * 60, //10 minutes
    meterOffTime: 15 * 60, //15 minutes
    numberOfRoutes: 2, //confirm with naman
    maxTeamID: 500, // for mutex

    costFreezeTeam: 125,
    costMeterOff: 100,
    costInvisible: 130,
    costReverseFreeze: 175,
    costSkipLocation: 225,
    costAddLocation: 200,
    costMysteryCard: 250,

    powerUpCosts: {
        1: 125, //freezeTeam
        2: 100, //meterOff
        3: 130, //invisible
        4: 175, //reverseFreeze
        5: 225, //skipLocation
        6: 200, //addLocation
        7: 250, //mysteryCard
    },

    powerUpNames: {
        1: "freezeTeam",
        2: "meterOff",
        3: "invisible",
        4: "reverseFreeze",
        5: "skipLocation",
        6: "addLocation",
        7: "mysteryCard",
    },
};

export const allTeams = [
    "000",
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "007",
    "008",
    "009",
];
