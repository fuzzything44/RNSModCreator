import addBasePattern from "./BasePattern.js";
import type { FileDef } from "./FileDef.js";
import _CONTEXT from "./InternalContext.js";
import type { TimeBlock } from "./Time.js";


class Pattern {
    patternKey: string;
    sheetName: string

    timeBlocks: TimeBlock[];

    constructor(key: string, callback: () => void) {
        this.sheetName = `Pattern_${key}`;
        this.patternKey = key;

        this.timeBlocks = [];

        if (_CONTEXT.fightMod === null) {
            console.warn("Pattern exists outside of Fight Mod: " + key);
        }
        _CONTEXT.fightMod?.addPattern(this);

        this.extend(callback);
    }

    // A helper function to allow recursive patterns.
    // This extends the pattern with additional time blocks specified in the callback.

    // For example, if pattern A and B should call each other, you could:
    // const a = new Pattern("a", () => {});
    // const b = new Pattern("b", () => {});
    // a.extend(() => {time(1000, () => {b.run() })});
    // b.extend(() => {time(1000, () => {a.run() })});

    extend(callback: () => void) {
        const _oldContext = _CONTEXT.pattern;
        _CONTEXT.pattern = this;
        callback();
        _CONTEXT.pattern = _oldContext;
    }

    addTimeBlock(toAdd: TimeBlock): Pattern {
        this.timeBlocks.push(toAdd);
        return this;
    }

    run() {
        addBasePattern(this.patternKey, {});
    }

    generate(): FileDef[] {
        return [{
            fileName: this.sheetName + ".csv",
            content: "newPattern," + this.patternKey + "\n" +
                this.timeBlocks.map(tb => tb.toString()).join("\n")
        }];
    };
}

interface PatternDifficulty {
    normal: Pattern;
    hard: Pattern;
    lunar: Pattern;
}
interface PatternBundle {
    single: PatternDifficulty;
    multi: PatternDifficulty;
}

export default Pattern;
export type { PatternBundle };