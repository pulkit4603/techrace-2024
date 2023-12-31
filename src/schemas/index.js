import {
    fsNewUserSchema,
    fsAddClueSchema,
    rtNewUserSchema,
    rtUpdateUserSchema,
} from "./user-schemas.js";
import { loginSchema, refreshSchema } from "./login-schemas.js";
import {
    powerUpSchema,
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
    refreshSchema,
    //game schemas
    powerUpSchema,
    nextClueSchema,
    getHintSchema,
};
