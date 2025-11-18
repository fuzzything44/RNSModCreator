import _CONTEXT from "./InternalContext.js";
import type { PatternVars } from "./PatternVars.js";

enum Element {
    Purple = 2,
    Blue = 3,
    Red = 4,
    Yellow = 5,
    Green = 6
}


const addBasePattern = (patName: string, patArgs: PatternVars) => {
    if (_CONTEXT.timeBlock === null) {
        throw new Error("You must call base patterns inside a time block");
    }
    if (Object.keys(patArgs).length == 0) {
        _CONTEXT.timeBlock.addContent(`pattAdd,${patName}\n`);
    } else {
        const content =
            `pattVars,` + Object.keys(patArgs).map(key => {
                const value: number | number[] | undefined = patArgs[key as keyof PatternVars];
                // Some values are sent in as arrays, we need to handle that
                if (Array.isArray(value)) {
                    // t_xpos and t_ypos have no _, everything else does
                    const separator = key.startsWith("t_") ? "" : "_";
                    return value.map((val, index) => `${key}${separator}${index};${val}`).join(",");
                } else {
                    return `${key};${patArgs[key as keyof PatternVars]}`;
                }
            }).join(",") + "\n" +
            `pattAdd,${patName}\n` +
            `pattVarReset\n`;
        _CONTEXT.timeBlock.addContent(content);
    }
}

type DELAYS = "warningDelay" | "spawnDelay";

const bp = {

    /** Applies a HBS (buff) */
    applyHbsSynced: (args: Pick<PatternVars, "hbsIndex" | "hbsDuration" | "hbsStrength" | "delay" | "hbsHitDelay">) => addBasePattern("bp_apply_hbs_synced", args),

    /** Azel chain binds, horizontal */
    bindH: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "trgBinary">) => addBasePattern("bp_bind_h", args),

    /** Azel chain binds, vertical */
    bindV: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "trgBinary">) => addBasePattern("bp_bind_v", args),

    /** Kuu enlarging exploding spheres */
    bulletEnlarge: (args: Pick<PatternVars, DELAYS | "timeBetween" | "scale" | "scaleInc" | "num" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_bullet_enlarge", args),

    /** Illie cardinal 4-way lasers
     *  They only have a rotation of 0 in the base game, but they support any angle */
    cardinalR: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "warningDelay2" | "x" | "y" | "rot" | "width" | "displayNumber">) => addBasePattern("bp_cardinal_r", args),

    /** Unused in the base game, but creates a 1-frame circular hitbox similar to a spread */
    circlePosition: (args: Pick<PatternVars, DELAYS | "radius" | "trgBinary" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_circle_position", args),

    /** These are the circle spreads!
     *  The ones that are used everywhere.
     *  You can use circleRadiusDef(1) for radius to automatically adjust the size of the speads based off the number of people playing */
    circleSpreads: (args: Pick<PatternVars, DELAYS | "radius" | "trgBinary" | "warnMsg">) => addBasePattern("bp_circle_spreads", args),

    /** Merran/Tassha half-room cleaves.
     * These are the ones that target players.
     */
    cleave: (args: Pick<PatternVars, DELAYS | "warnMsg" | "orderBin"> & { rot?: number[] }) => addBasePattern("bp_cleave", args),

    /** Merran/Tassha half-room cleaves.
     * This one follows an enemy. */
    cleaveEnemy: (args: Pick<PatternVars, DELAYS | "warnMsg"> & { rot?: number} ) => addBasePattern("bp_cleave_enemy", args),
    /**
     * Merran/Tassha half-room cleaves.
     * This one is placed on a fixed point.
     */
    cleaveFixed: (args: Pick<PatternVars, DELAYS | "warnMsg" | "numPoints" | "posX" | "posY"> & { rot?: number[] }) => addBasePattern("bp_cleave_fixed", args),

    /** Cone spreads from a set point (sometimes used by Dragons/Wolves)
     */
    clockspot: (args: Pick<PatternVars, DELAYS | "warningDelay2" | "radius" | "fanAngle" | "trgBinary" | "warnMsg" | "displayNumber">) => addBasePattern("bp_clockspot", args),

    /** Color matching where each player gets a circle, and they must all stack together.
     */
    colormatch: (args: Pick<PatternVars, DELAYS | "hasFixed" | "x" | "y" | "element" | "radius" | "trgBinary" | "warnMsg" | "displayNumber">) => addBasePattern("bp_colormatch", args),

    /** Color matching where each player gets a symbol, and has to stand in a particular circle
     *  The circle's spawn timing can be changed with warningDelay
     *  The symbols over players' heads is changed with warningDelay2
     */
    colormatch2: (args: Pick<PatternVars, DELAYS | "warningDelay2" | "x" | "y" | "element" | "radius" | "ringNum" | "trgBinary" | "warnMsg" | "displayNumber">) => addBasePattern("bp_colormatch2", args),
    
    /** Avy OSU-style color matches; will go in the order of points
     */
    colormatch3: (args: Pick<PatternVars, DELAYS | "timeBetween" | "timeExtra" | "element" | "radius" | "trgBinary" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_colormatch3", args),
    
    /** Unused in the base game, but sends a cone spread-shaped AoE in a direction
     */
    coneDirection: (args: Pick<PatternVars, DELAYS | "fanAngle" | "trgBinary" | "x" | "y" | "numCones"> & { rot?: number[]}) => addBasePattern("bp_cone_direction", args),
    
    /** These are the cone spreads!
     *  The ones that are used everywhere. 
     *  You can use coneRadiusDef(1) for radius to automatically adjust the size of the speads based off the number of people playing"
     */
    coneSpreads: (args: Pick<PatternVars, DELAYS | "fanAngle" | "trgBinary" | "x" | "y" | "warnMsg">) => addBasePattern("bp_cone_spreads", args),
    
    /** A circular blast of bullets, centered on a point.
     *  Type 0 is small bullets, type 1 is large bullets
     */
    dark2Blast: (args: Pick<PatternVars, "spawnDelay" | "x" | "y" | "angle" | "offset" | "num"> & { spd?: number, type?: 0 | 1 }) => addBasePattern("bp_dark2_blast", args),
    
    /** A line of bullets, starting at (x,y)
     *  Type 0 is small bullets, type 1 is large bullets
     */
    dark2Line: (args: Pick<PatternVars, DELAYS | "spawnDelayTotal" | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "num" | "lineLength"> & { spd?: number, type?: 0 | 1 }) => addBasePattern("bp_dark2_line", args),
    
    /** A line of bullets, but their speed is randomized
     *  Type 0 is small bullets, type 1 is large bullets
     */
    dark2LineRandomized: (args: Pick<PatternVars, DELAYS | "spawnDelayTotal" | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "num" | "lineLength" | "spdMax" | "spdMin" | "rand"> & {type?: 0 | 1}) => addBasePattern("bp_dark2_line_randomized", args),
    
    /**
     */
    patNameHere: (args: Pick<PatternVars, DELAYS>) => addBasePattern("NAME_HERE", args),
}

export default addBasePattern;
export { bp, Element }