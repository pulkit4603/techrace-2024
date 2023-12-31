import * as yup from "yup";
import moment from "moment";
const timestampFormat = "YYYY-MM-DD HH:mm:ss.SSSSSS";

export const powerUpSchema = yup.object().shape({
    teamID: yup.string().required(),
    powerUpID: yup.string().required(),
    askTimestamp: yup
        .string()
        .test("timestamp", "Must be a valid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        )
        .required(),
    opponentTeamID: yup.string(),
});

export const nextClueSchema = yup.object().shape({
    teamID: yup.string().required(),
    askTimestamp: yup
        .string()
        .test("timestamp", "Must be a valid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        )
        .required(),
});

export const getHintSchema = yup.object().shape({
    teamID: yup.string().required(),
});
