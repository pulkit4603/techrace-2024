import * as yup from "yup";
import moment from "moment";
import { timestampFormat } from "../constants";

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
