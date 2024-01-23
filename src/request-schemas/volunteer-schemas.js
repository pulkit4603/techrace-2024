import * as yup from "yup";

export const volunteerLoginSchema = yup.object().shape({
    volunteerID: yup.string().required(),
    password: yup.string().required(),
    currLat: yup.number().required(),
    currLong: yup.number().required(),
});
