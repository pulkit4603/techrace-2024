import * as yup from "yup";
import moment from "moment";
const timestampFormat = "YYYY-MM-DD HH:mm:ss.SSSSSS";

export const fsNewUserSchema = yup.object().shape({
    teamID: yup.string().required(),
    password: yup.string().required(),
    player1: yup.string().required(),
    player2: yup.string().required(),
});

//fsGetUserSchema (GET request params validation later)

export const fsAddClueSchema = yup.object().shape({
    clueID: yup.string().required(),
    clue: yup.string().required(),
    clueType: yup.string().required(),
    hint1: yup.string().required(),
    hint1Type: yup.string().required(),
    hint2: yup.string().required(),
    hint2Type: yup.string().required(),
    targetLocationLatitude: yup
        .string()
        .test(
            "latitude",
            "Must be a valid latitude",
            (value) => value >= -180 && value <= 180,
        )
        .required(),
    targetLocationLongitude: yup
        .string()
        .test(
            "longitude",
            "Must be a valid longitude",
            (value) => value >= -180 && value <= 180,
        )
        .required(),
});

//fsGetClueSchema (GET request params validation later)

//rtGetUserSchema (GET request params validation later)

export const rtNewUserSchema = yup.object().shape({
    teamID: yup.string().required(),
    balance: yup.number().required(),
    currentClueIndex: yup.number().required(),
    extraLoc: yup.number().required(),
    hint1: yup.string().required(),
    hint1Type: yup.string().required(),
    hint2: yup.string().required(),
    hint2Type: yup.string().required(),
    isFrozen: yup.boolean(),
    isInvisible: yup.boolean(),
    isMeterOff: yup.boolean(),
    logoutLocationLatitude: yup
        .string()
        .test(
            "latitude",
            "Must be a valid latitude",
            (value) => value >= -180 && value <= 180,
        )
        .required(),
    logoutLocationLongitude: yup
        .string()
        .test(
            "longitude",
            "Must be a valid longitude",
            (value) => value >= -180 && value <= 180,
        )
        .required(),
    madeFrozenAtTime: yup
        .string()
        .test("timestamp", "Invalid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        ),
    madeFrozenBy: yup.string().required(),
    madeInvisibleAtTime: yup
        .string()
        .test("timestamp", "Invalid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        ),
    madeMeterOffAtTime: yup
        .string()
        .test("timestamp", "Invalid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        ),
    mystery: yup.number().required(),
    noSkipUsed: yup.number().required(),
    player1: yup.string().required(),
    player2: yup.string().required(),
    previousClueSolvedAtTime: yup
        .string()
        .test("timestamp", "Invalid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        )
        .required(),
    route: yup.object().required(),
    routeIndex: yup.number().required(),
});

export const rtUpdateUserSchema = yup
    .object()
    .shape({
        teamID: yup.string().required(),
        balance: yup.number(),
        currentClueIndex: yup.number(),
        extraLoc: yup.number(),
        hint1: yup.string(),
        hint1Type: yup.string(),
        hint2: yup.string(),
        hint2Type: yup.string(),
        isFrozen: yup.boolean(),
        isInvisible: yup.boolean(),
        isMeterOff: yup.boolean(),
        logoutLocationLatitude: yup
            .string()
            .test(
                "latitude",
                "Must be a valid latitude",
                (value) => value >= -180 && value <= 180,
            ),
        logoutLocationLongitude: yup
            .string()
            .test(
                "longitude",
                "Must be a valid longitude",
                (value) => value >= -180 && value <= 180,
            ),
        madeFrozenAtTime: yup
            .string()
            .test("timestamp", "Invalid timestamp", (value) =>
                moment(value, timestampFormat, true).isValid(),
            ),
        madeFrozenBy: yup.string(),
        madeInvisibleAtTime: yup
            .string()
            .test("timestamp", "Invalid timestamp", (value) =>
                moment(value, timestampFormat, true).isValid(),
            ),
        madeMeterOffAtTime: yup
            .string()
            .test("timestamp", "Invalid timestamp", (value) =>
                moment(value, timestampFormat, true).isValid(),
            ),
        mystery: yup.number(),
        noSkipUsed: yup.number(),
        player1: yup.string(),
        player2: yup.string(),
        previousClueSolvedAtTime: yup
            .string()
            .test("timestamp", "Invalid timestamp", (value) =>
                moment(value, timestampFormat, true).isValid(),
            ),
        route: yup.object(),
        routeIndex: yup.number(),
    })
    .test(
        "at-least-one-field",
        "You must provide at least one field",
        (value) =>
            !!(
                value.balance ||
                value.currentClueIndex ||
                value.extraLoc ||
                value.hint1 ||
                value.hint1Type ||
                value.hint2 ||
                value.hint2Type ||
                value.isFrozen ||
                value.isInvisible ||
                value.isMeterOff ||
                value.logoutLocationLatitude ||
                value.logoutLocationLongitude ||
                value.madeFrozenAtTime ||
                value.madeFrozenBy ||
                value.madeInvisibleAtTime ||
                value.madeMeterOffAtTime ||
                value.mystery ||
                value.noSkipUsed ||
                value.player1 ||
                value.player2 ||
                value.previousClueSolvedAtTime ||
                value.route ||
                value.routeIndex
            ),
    );
