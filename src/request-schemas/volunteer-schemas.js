import * as yup from "yup";
const timestampFormat = "YYYY-MM-DD HH:mm:ss.SSSSSS";
import moment from "moment";

export const volunteerLoginSchema = yup.object().shape({
    volunteerID: yup.string().required(),
    password: yup.string().required(),
    currLat: yup.number().required(),
    currLong: yup.number().required(),
});

export const volunteerValidateRequestSchema = yup.object().shape({
    teamID: yup.string().required(),
    validatorClueID: yup.string().required(),
    askTimestamp: yup
        .string()
        .test("timestamp", "Must be a valid timestamp", (value) =>
            moment(value, timestampFormat, true).isValid(),
        )
        .required(),
});
