import _CONTEXT from "./InternalContext.js";
import type Variable from "./Variable.js";

type ConditionType = "condPlayerCount" | "condDifficultyCheck" | "condVarCheck" | "condHpThreshold";

class Condition {
    type: ConditionType;
    args: string[];

    constructor(type: ConditionType, args: string[], callback: () => void) {
        this.type = type;
        this.args = args;
        if (_CONTEXT.timeBlock === null) {
            throw new Error("Condition function used outside of time block");
        }

        _CONTEXT.timeBlock.addCondition(this);
        callback();
        _CONTEXT.timeBlock.endCondition();
    }

    toString() {
        return `${this.type},${this.args.join(",")}`;
    };
}

interface PlayerCount {
    singlePlayer?: boolean;
    twoPlayer?: boolean;
    threePlayer?: boolean;
    fourPlayer?: boolean;
}
/** Decides whether to continue running the current time block based on player count */
const condPlayerCount = (playerCounts: PlayerCount, callback: () => void) => new Condition("condPlayerCount", [playerCounts.singlePlayer ? "true" : "false", playerCounts.twoPlayer ? "true" : "false", playerCounts.threePlayer ? "true" : "false", playerCounts.fourPlayer ? "true" : "false"], callback);

interface Difficulty {
    normal?: boolean;
    hard?: boolean;
    lunar?: boolean;
}
/** Decides whether to continue running the current time block based on the current difficulty setting. Cute/normal are the same */
const condDifficultyCheck = (diff: Difficulty, callback: () => void) => new Condition("condDifficultyCheck", [diff.normal ? "true" : "false", diff.hard ? "true" : "false", diff.lunar ? "true" : "false"], callback);

type VarCompare = "==" | "!=" | ">" | "<" | ">=" | "<=";
/** Decides whether to continue running the current time block based on variable comparison */
const condVarCheck = (var1: Variable, comparison: VarCompare, var2: Variable, callback: () => void) => new Condition("condVarCheck", [var1.toString(), comparison, var2.toString()], callback);

/** Decides whether to continue running the current time block based on enemy's HP (will continue if enemy HP is less than given percentage)
 * This is a percentage from 0-100 (DIFFERS from modding API)
 * */
const condHpThreshold = (hpPercent: number, callback: () => void) => new Condition("condHpThreshold", [(hpPercent / 100).toString()], callback);

export { Condition, condPlayerCount, condDifficultyCheck, condVarCheck, condHpThreshold };