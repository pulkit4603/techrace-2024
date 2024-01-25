import * as yup from "yup";

export const loginSchema = yup.object().shape({
    teamID: yup.string().required(),
    password: yup.string().required(),
    currLat: yup
        .string()
        .test(
            "latitude",
            "Must be a valid latitude",
            (value) => value >= -180 && value <= 180,
        )
        .required(),
    currLong: yup
        .string()
        .test(
            "longitude",
            "Must be a valid longitude",
            (value) => value >= -180 && value <= 180,
        )
        .required(),
});
