import _CONTEXT from "./InternalContext.js";
import type { Value } from "./PatternVars.js";
import { setVar } from "./Variable.js";

class Expression {
    expr: string;
    constructor(value: Value | string, isFuncCall: boolean = false) {
        this.expr = value.toString();

        // If an expression is itself a function call, we call and save the result to a variable
        // then use that variable instead.
        // This is to prevent potential issues with nesting functions. It might be slightly inefficient, but that's okay.
        if (isFuncCall) {
            if (_CONTEXT.timeBlock === null) {
                throw new Error("Function call expression used outside of time block");
            }
            const v = setVar(this);
            this.expr = v.toString();
        }
    }

    add(toAdd: Value) {
        return new Expression( this.expr + "+" + toAdd.toString());
    }

    subtract(toSub: Value) {
        return new Expression(this.expr + "-" + toSub.toString());
    }

    multiply(toMult: Value) {
        return new Expression(`(${this.expr})*(${toMult.toString()})`);
    }

    divide(toDiv: Value) {
        return new Expression(`(${this.expr})/(${toDiv.toString()})`);
    }

    /**
    * Bitwise AND
    */
    and(mask: Value) {
        return new Expression(`(${this.expr})&(${mask.toString()})`);
    }

    /**
     * Bitwise OR
     */
    or(mask: Value) {
        return new Expression(`(${this.expr})|(${mask.toString()})`);
    }

    sin() {
        return new Expression(`sin(${this.expr})`);
    }

    cos() {
        return new Expression(`cos(${this.expr})`);
    }

    toString(): string {
        return this.expr;
    }
}

export const diffSwitch = (normal: Value, hard: Value, lunar: Value) => new Expression(`diffSwitch(${normal}>${hard}>${lunar})`, true);
export const circleRadiusDef = (multiplier: Value) => new Expression(`circleRadiusDef(${multiplier})`, true);
export const coneRadiusDef = (multiplier: Value) => new Expression(`coneRadiusDef(${multiplier})`, true);
export const randomRange = (min: Value, max: Value) => new Expression(`randomRange(${min}>${max})`, true);
export const random = (max: Value) => new Expression(`random(${max})`, true);
export const intRandom = (max: Value) => new Expression(`irandom(${max})`, true);
export const randomTargetId = (orderBinary: Value) => new Expression(`randomTargetId(${orderBinary})`, true);
export const playerXPos = (playerId: Value) => new Expression(`playerXPos(${playerId})`, true);
export const playerYPos = (playerId: Value) => new Expression(`playerYPos(${playerId})`, true);
export const pointFrom = (x0: Value, y0: Value, x1: Value, y1: Value) => new Expression(`pointFrom(${x0}>${y0}>${x1}>${y1})`, true);
export const angleFrom = pointFrom;
export const pointDist = (x0: Value, y0: Value, x1: Value, y1: Value) => new Expression(`pointDist(${x0}>${y0}>${x1}>${y1})`, true);
export const randomTargetBinary = (playerNum: Value) => new Expression(`randomTargetBinary(${playerNum})`, true);
export const hbs = (key: string) => new Expression(`hbs(${key})`, true);


export default Expression;