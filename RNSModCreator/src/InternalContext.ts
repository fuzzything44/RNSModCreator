import type FightMod from "./FightMod.js"
import type Pattern from "./Pattern.js";
import type { TimeBlock } from "./Time.js";

interface Context {
    fightMod: FightMod | null;
    pattern: Pattern | null;
    timeBlock: TimeBlock | null;
    varNum: number;
}

const _CONTEXT: Context = {
    fightMod: null,
    pattern: null,
    timeBlock: null,
    varNum: 0
}

export default _CONTEXT;