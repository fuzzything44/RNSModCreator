import Expression from "./Expression.js";
import _CONTEXT from "./InternalContext.js";
import type { Value } from "./PatternVars.js";

export class Command {
    name: string;
    args: Value[];

    constructor(name: string, args: Value[], callback?: () => void) {
        this.name = name;
        this.args = args;
        if (_CONTEXT.timeBlock === null) {
            throw new Error(`Command ${name} used outside of time block`);
        }

        if (callback) {
            _CONTEXT.timeBlock.addContext(this);
            callback();
            _CONTEXT.timeBlock.endContext();
        } else {
            _CONTEXT.timeBlock.addContent(this.toString());
        }

    }

    toString() {
        return `${this.name},${this.args.join(",")}`;
    };
}

export const zoom = (amt: number) => new Command("zoom", [amt]);
export const heal = (amt: number) => new Command("heal", [amt]);

interface BossFlags {
    holmgang?: boolean;
    noPositional?: boolean;
    noTarget?: boolean;
    queen?: boolean;
    painshare?: boolean;
    hideHbs?: boolean;
}
export const setFlags = (flags: BossFlags) => {
    const flagCalc: number =
        (flags.holmgang ? 1 : 0) +
        (flags.noPositional ? 2 : 0) +
        (flags.noTarget ? 4 : 0) +
        (flags.queen ? 8 : 0) +
        (flags.painshare ? 16 : 0) +
        (flags.hideHbs ? 32 : 0);
    return new Command("setFlags", [flagCalc]);
};

export const setExpMult = (timeMult: number, rewardMult: number) => new Command("setExpMult", [timeMult, rewardMult]);
export const erasePatterns = () => new Command("erasePatterns", []);

export const move = (x: Value, y: Value, duration: Value) => new Command("move", [x, y, duration]);
export const moveResetAnim = (x: Value, y: Value, duration: Value) => new Command("moveResetAnim", [x, y, duration]);

export const facePoint = (xPos: Value) => new Command("facePoint", [xPos]);
export const faceRandom = () => new Command("faceRandom", []);
export const faceOrderBin = (orderBin: Value) => new Command("faceOrderBin", [orderBin]);

// Probably a better way to handle this (but need animation system)
export const animation = (animIndex: Value, chargeTime: Value, duration: Value, loop: boolean = true) => new Command(loop ? "animation" : "animationNoLoop", [animIndex, chargeTime, duration]);

export const transform = (animKey: Value, radius: Value, drawScale: Value, focusScale: Value, frameRate: Value, small: boolean = false) => new Command(small ? "transformSmall" : "transform", [animKey, radius, drawScale, focusScale, frameRate]);

// Probably a better way to handle this (but need text system)
export const dialog = (key0: string, key1?: string, key2?: string) => new Command("dialog", [key0, key1, key2].filter(k => k !== undefined).map(k => new Expression(k)));

export const orderBinRandom = (...groups: Value[]) => new Command("orderBinRandom", groups);
export const orderBinRandomNoKO = (...groups: Value[]) => new Command("orderBinRandomNoKO", groups);
export const orderBinChaos = (numGroups: Value) => new Command("orderBinChaos", [numGroups]);

export const orderBinNGroups = (numGroups: 2 | 3 | 4) => new Command(["orderBinTwoGroups", "orderBinThreeGroups", "orderBinFourGroups"][numGroups - 2] as string, [numGroups]);
export const orderBinSet = (index: 0 | 1 | 2 | 3, amount: Value) => new Command("orderBinSet", [index, amount]);

// Add a dummy context function to make sure when blocks are split this command is included
export const syncRandomSeed = () => new Command("syncRandomSeed", [], () => { });

