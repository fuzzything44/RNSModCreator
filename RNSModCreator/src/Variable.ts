import Expression from "./Expression.js";
import _CONTEXT from "./InternalContext.js";
import type { Value } from "./PatternVars.js";

/** You should *not* directly create variable objects, use setVar(value) instead */
class Variable {
    varName: string;

    constructor(setline: string, skipCreation: boolean = false) {
        if (skipCreation) {
            this.varName = setline;
            return;
        }

        this.varName = "var" + _CONTEXT.varNum++;
        if (_CONTEXT.timeBlock === null) {
            throw new Error("Variable setting used outside of time block");
        }

        _CONTEXT.timeBlock.addContent(setline.replaceAll("{KEY}", this.varName));
    }

    toString(): string {
        return this.varName;
    }

    /** Set a variable to a value again, in case you want to reuse a variable across multiple different blocks.
     *  For example, if you wanted to set it differently based off number of players you'd create an initial var
     *  And then set it in each player count block with this function.
     * 
     * @param setTo What to set the variable to
     */
    set(setTo: Value) {
        if (_CONTEXT.timeBlock === null) {
            throw new Error("Variable setting used outside of time block");
        }
        _CONTEXT.timeBlock?.addContent(`setVar,${this.varName},${setTo}`);
    }

    add(toAdd: Value) {
        return new Expression(this.varName + "+" + toAdd.toString());
    }

    subtract(toSub: Value) {
        return new Expression(this.varName + "-" + toSub.toString());
    }

    multiply(toMult: Value) {
        return new Expression(`${this.varName}*(${toMult.toString()})`);
    }

    divide(toDiv: Value) {
        return new Expression(`${this.varName}/(${toDiv.toString()})`);
    }

    /**
     * Bitwise AND
     */
    and(mask: Value) {
        return new Expression(`${this.varName}&(${mask.toString()})`);
    }

    /**
     * Bitwise OR
     */
    or(mask: Value) {
        return new Expression(`${this.varName}|(${mask.toString()})`);
    }

    sin() {
        return new Expression(`sin(${this.varName})`);
    }

    cos() {
        return new Expression(`cos(${this.varName})`);
    }


}

export type { Variable };

export const setVar = (value: Value) => new Variable(`setVar,{KEY},${value}`);
export const setCoinflip = (heads: boolean = true) => new Variable(`setCoinflip,{KEY},${heads}`);
export const setDiceRoll = (...options: Value[]) => new Variable(`setDiceRoll,{KEY},${options.join(",")}`);

export const allTargets = 127;
export const bfMinX = new Variable("bfMinX", true);
export const bfMaxX = new Variable("bfMaxX", true);
export const bfCenterX = new Variable("bfCenterX", true);
export const bfMinY = new Variable("bfMinY", true);
export const bfMaxY = new Variable("bfMaxY", true);
export const bfCenterY = new Variable("bfCenterY", true);
export const bfWidth = new Variable("bfWidth", true);
export const bfHeight = new Variable("bfHeight", true);
export const orderBin0 = new Variable("orderBin0", true);
export const orderBin1 = new Variable("orderBin1", true);
export const orderBin2 = new Variable("orderBin2", true);
export const orderBin3 = new Variable("orderBin3", true);
export const orderBin = [orderBin0, orderBin1, orderBin2, orderBin3];
export const allyNum = new Variable("allyNum", true);
export const enemyNum = new Variable("enemyNum", true);
export const enemyX = new Variable("enemyX", true);
export const enemyY = new Variable("enemyY", true);
export const randomSign = new Variable("randomSign", true);