import {
    fsNewUserSchema,
    fsAddClueSchema,
    rtNewUserSchema,
    rtUpdateUserSchema,
} from "./user-schemas.js";
import { loginSchema } from "./login-schemas.js";
import {
    powerUpSchema,
    getClueSchema,
    nextClueSchema,
    getHintSchema,
} from "./game-schemas.js";

export {
    //user schemas
    fsNewUserSchema,
    fsAddClueSchema,
    rtNewUserSchema,
    rtUpdateUserSchema,
    //login schemas
    loginSchema,
    //game schemas
    powerUpSchema,
    getClueSchema,
    nextClueSchema,
    getHintSchema,
};
