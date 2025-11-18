import type { Element } from "./BasePattern.js";

const POS_MIN = -10000;
const POS_MAX = 10000;

interface _PatternVars {
    x: number;
    y: number;

    fx: number;
    fy: number;

    number: number;
    delay: number;
    delay2: number;
    radius: number;
    stat: number;
    rand: number;
    duration: number;

    pointMult: number;
    timeMult: number;

    rot: number | number[];
    dir: number;
    fdir: number;
    frot: number;
    angle: number;
    spd: number | number[];
    mult: number;
    oAngle: number;
    speedMult: number;
    moveSpeed: number;
    speedDuration: number;
    spdDur: number;
    amount: number;
    minimum: number;
    maximum: number;
    minAmount: number;
    maxAmount: number;
    hbsColorInd: number;
    doubled: number;
    extraHit: number;
    playSound: number;
    
    time: number;
    timeBetween: number;
    timeExtra: number;
    displayNumber: number;
    warnMsg: number;
    varIndex: number;
    varNum: number;
    targetId: number;
    showWarning: number;
    faded: number;
    hasFixed: number;
    permanent: number;
    resetAnim: number;

    warningDelay: number;
    spawnDelay: number;
    spawnDelay2: number;
    spawnDelayTotal: number;
    eraseDelay: number;
    warningDelay2: number;
    laserSpawnDelay: number;
    laserEraseDelay: number;

    type: number;
    element: Element;
    startAngle: number;
    fanAngle: number;
    lineAngle: number;
    lineDir: number;
    bulletDir: number;
    angleInc: number;
    numLines: number;
    lineLength: number;
    numCones: number;
    numPoints: number;
    scale: number;
    scaleInc: number;
    scaleEnd: number;
    ringNum: number;
    horizontal: number;

    kbAmount: number;
    lifespan: number;
    spawnHealth: number;
    
    hbsIndex: number;
    hbsDuration: number;
    hbsStrength: number;
    hbsHitDelay: number;
    
    num: number;
    width: number;
    widthInc: number;
    length: number;
    height: number;
    spacing: number;
    offset: number;
    spdMin: number;
    spdMax: number;
    shouldMove: number;
    
    exTrgId: number;
    trgBinary: number;
    trgBinary2: number;
    
    dialogInd0: number;
    dialogInd1: number;
    dialogInd2: number;
    
    offX: number | number[];
    offY: number | number[];

    // 0-6 (5 is max)
    playerId: number[];
    t_xpos: number[];
    t_ypos: number[];
    // offX: number[]; (included earlier)
    // offY: number[]; (included earlier)

    // 0-20
    // spd: number[]; (included earlier)
    // rot: number[]; (included earlier)
    posX: number[];
    posY: number[];

    // 0-4?
    orderBin: number[];
};

type PatternVars = Partial<_PatternVars>;

export type { PatternVars };
export { POS_MIN, POS_MAX };