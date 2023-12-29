import { powerUp, nextClue, gethint } from "./game-controllers.js";
import {
    fsNewUser,
    fsGetUser,
    fsAddClue,
    fsGetClue,
    rtGetUser,
    rtNewUser,
} from "./user-controllers.js";
import { login } from "./login-controllers.js";

// game controllers:
export { powerUp, nextClue, gethint };

// user controllers:
export { fsNewUser, fsGetUser, fsAddClue, fsGetClue, rtGetUser, rtNewUser };

// login controllers:
export { login };
