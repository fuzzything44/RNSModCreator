import { Command } from "./Command.js";
import Expression from "./Expression.js";
import _CONTEXT from "./InternalContext.js";
import type { Value } from "./PatternVars.js";

interface PlayerCount {
    singlePlayer?: boolean;
    twoPlayer?: boolean;
    threePlayer?: boolean;
    fourPlayer?: boolean;
}
/** Decides whether to continue running the current time block based on player count */
const condPlayerCount = (playerCounts: PlayerCount, callback: () => void) => new Command("condPlayerCount", [playerCounts.singlePlayer ? 1 : 0, playerCounts.twoPlayer ? 1 : 0, playerCounts.threePlayer ? 1 : 0, playerCounts.fourPlayer ? 1 : 0], callback);

interface Difficulty {
    normal?: boolean;
    hard?: boolean;
    lunar?: boolean;
}
/** Decides whether to continue running the current time block based on the current difficulty setting. Cute/normal are the same */
const condDifficultyCheck = (diff: Difficulty, callback: () => void) => new Command("condDifficultyCheck", [diff.normal ? 1 : 0, diff.hard ? 1 : 0, diff.lunar ? 1 : 0], callback);

type VarCompare = "==" | "!=" | ">" | "<" | ">=" | "<=";
/** Decides whether to continue running the current time block based on variable comparison */
const condVarCheck = (var1: Value, comparison: VarCompare, var2: Value, callback: () => void) => new Command("condVarCheck", [var1, new Expression(comparison), var2], callback);

/** Decides whether to continue running the current time block based on enemy's HP (will continue if enemy HP is less than given percentage)
 * This is a percentage from 0-100 (DIFFERS from modding API)
 * */
const condHpThreshold = (hpPercent: number, callback: () => void) => new Command("condHpThreshold", [hpPercent / 100], callback);

export { condPlayerCount, condDifficultyCheck, condVarCheck, condHpThreshold };