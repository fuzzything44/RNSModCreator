import type { Value } from "./PatternVars.js";

class Expression {
    expr: string;

    constructor(value: Value | string) {
        this.expr = value.toString();
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

export const diffSwitch = (normal: Value, hard: Value, lunar: Value) => new Expression(`diffSwitch(${normal}>${hard}>${lunar})`);
export const circleRadiusDef = (multiplier: Value) => new Expression(`circleRadiusDef(${multiplier})`);
export const coneRadiusDef = (multiplier: Value) => new Expression(`coneRadiusDef(${multiplier})`);
export const randomRange = (min: Value, max: Value) => new Expression(`randomRange(${min}>${max})`);
export const random = (max: Value) => new Expression(`random($${max})`);
export const intRandom = (max: Value) => new Expression(`irandom(${max})`);
export const randomTargetId = (orderBinary: Value) => new Expression(`randomTargetId($${orderBinary})`);
export const playerXPos = (playerId: Value) => new Expression(`playerXPos($${playerId})`);
export const playerYPos = (playerId: Value) => new Expression(`playerYPos($${playerId})`);
export const pointFrom = (x0: Value, y0: Value, x1: Value, y1: Value) => new Expression(`pointFrom(${x0}>${y0}>${x1}>${y1})`);
export const angleFrom = pointFrom;
export const pointDist = (x0: Value, y0: Value, x1: Value, y1: Value) => new Expression(`pointDist(${x0}>${y0}>${x1}>${y1})`);
export const randomTargetBinary = (playerNum: Value) => new Expression(`randomTargetBinary($${playerNum})`);
export const hbs = (key: string) => new Expression(`hbs(${key})`);


export default Expression;