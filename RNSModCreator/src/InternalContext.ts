import type FightMod from "./FightMod.js"
import type Pattern from "./Pattern.js";
import type { TimeBlock } from "./Time.js";

interface Context {
    fightMod: FightMod | null;
    pattern: Pattern | null;
    timeBlock: TimeBlock | null;
}

const _CONTEXT: Context = {
    fightMod: null,
    pattern: null,
    timeBlock: null
}

export default _CONTEXT;