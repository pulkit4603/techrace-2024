import { powerUp, nextClue, getHint } from "./game-controllers.js";
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
export { powerUp, nextClue, getHint };

// user controllers:
export { fsNewUser, fsGetUser, fsAddClue, fsGetClue, rtGetUser, rtNewUser };

// login controllers:
export { login };
