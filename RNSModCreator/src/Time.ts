import _CONTEXT from "./InternalContext.js";

type TimeBlockType = "time" | "timeRepeating" | "timeRepeatTimes" | "timeRepeatingMult"

class TimeBlock {
    type: TimeBlockType;
    contents: string[];
    args: number[];

    constructor(type: TimeBlockType, args: number[], callback: () => void) {
        this.type = type;
        this.contents = [];
        this.args = args;


        if (_CONTEXT.pattern === null) {
            throw new Error("Time function used outside of pattern");
        }
        if (_CONTEXT.timeBlock !== null) {
            throw new Error("Time functions nested inside each other, please split to separate patterns");
        }

        _CONTEXT.pattern.addTimeBlock(this);

        const _oldContext = _CONTEXT.timeBlock;
        _CONTEXT.timeBlock = this;
        callback();
        _CONTEXT.timeBlock = _oldContext;
    }

    addContent(toAdd: string) {
        this.contents.push(toAdd);
    }

    toString() {
        return `${this.type},${this.args.join(",")}\n` + 
            this.contents.join("\n");
    };
}

const time = (t: number, callback: () => void): TimeBlock => new TimeBlock("time", [t], callback);
const timeRepeating = (startTime: number, interval: number, callback: () => void): TimeBlock => new TimeBlock("timeRepeating", [startTime, interval], callback);
const timeRepeatingTimes = (startTime: number, interval: number, repeats: number, callback: () => void): TimeBlock => new TimeBlock("timeRepeatTimes", [startTime, interval, repeats], callback);
// Documentation on this one doesn't make much sense. Just make a pattern and call that pattern I guess
const timeRepeatingMult = (startTime: number, executeTimes: number[], callback: () => void): TimeBlock => new TimeBlock("timeRepeating", [startTime, ...executeTimes], callback);

export { TimeBlock, time, timeRepeating, timeRepeatingTimes, timeRepeatingMult };