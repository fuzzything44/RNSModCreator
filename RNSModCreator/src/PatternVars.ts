import type { Element } from "./BasePattern.js";
import type Expression from "./Expression.js";
import type { Variable } from "./Variable.js";

const POS_MIN = -10000;
const POS_MAX = 10000;

type Value = number | Variable | Expression;

interface _PatternVars {
    x: Value;
    y: Value;

    fx: Value;
    fy: Value;

    number: Value;
    delay: Value;
    delay2: Value;
    radius: Value;
    stat: Value;
    rand: Value;
    duration: Value;

    pointMult: Value;
    timeMult: Value;

    rot: Value | Value[];
    dir: Value;
    fdir: Value;
    frot: Value;
    angle: Value;
    spd: Value | Value[];
    mult: Value;
    oAngle: Value;
    speedMult: Value;
    moveSpeed: Value;
    speedDuration: Value;
    spdDur: Value;
    amount: Value;
    minimum: Value;
    maximum: Value;
    minAmount: Value;
    maxAmount: Value;
    hbsColorInd: Value;
    doubled: Value;
    extraHit: Value;
    playSound: Value;
    
    time: Value;
    timeBetween: Value;
    timeExtra: Value;
    displayNumber: Value;
    warnMsg: Value;
    varIndex: Value;
    varNum: Value;
    targetId: Value;
    showWarning: Value;
    faded: Value;
    hasFixed: Value;
    permanent: Value;
    resetAnim: Value;

    warningDelay: Value;
    spawnDelay: Value;
    spawnDelay2: Value;
    spawnDelayTotal: Value;
    eraseDelay: Value;
    warningDelay2: Value;
    laserSpawnDelay: Value;
    laserEraseDelay: Value;

    type: Value;
    element: Element | Variable;
    startAngle: Value;
    fanAngle: Value;
    lineAngle: Value;
    lineDir: Value;
    bulletDir: Value;
    angleInc: Value;
    numLines: Value;
    lineLength: Value;
    numCones: Value;
    numPoints: Value;
    scale: Value;
    scaleInc: Value;
    scaleEnd: Value;
    ringNum: Value;
    horizontal: Value;

    kbAmount: Value;
    lifespan: Value;
    spawnHealth: Value;
    
    hbsIndex: Value;
    hbsDuration: Value;
    hbsStrength: Value;
    hbsHitDelay: Value;
    
    num: Value;
    width: Value;
    widthInc: Value;
    length: Value;
    height: Value;
    spacing: Value;
    offset: Value;
    spdMin: Value;
    spdMax: Value;
    shouldMove: Value;
    
    exTrgId: Value;
    trgBinary: Value;
    trgBinary2: Value;
    
    dialogInd0: Value;
    dialogInd1: Value;
    dialogInd2: Value;
    
    offX: Value | Value[];
    offY: Value | Value[];

    // 0-6 (5 is max)
    playerId: Value[];
    t_xpos: Value[];
    t_ypos: Value[];
    // offX: Value[]; (included earlier)
    // offY: Value[]; (included earlier)

    // 0-20
    // spd: Value[]; (included earlier)
    // rot: Value[]; (included earlier)
    posX: Value[];
    posY: Value[];

    // 0-4?
    orderBin: Value[];
};

type PatternVars = Partial<_PatternVars>;

export type { PatternVars, Value };
export { POS_MIN, POS_MAX };