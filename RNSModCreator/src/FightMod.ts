import type Encounter from "./Encounter.js";
import type Enemy from "./Enemy.js";
import type { FileDef } from "./FileDef.js";
import _CONTEXT from "./InternalContext.js";
import type Pattern from "./Pattern.js";

const generate = (enemies: string[]) => {
    const header = "Sheet Type,filename";
    const enemySheets = enemies.map(enemy => "EnemySheet," + enemy).join("\n");

    return "<SheetList.csv>\n" + header + "\n" +
        enemySheets;
};

class FightMod {
    private enemies: Enemy[];
    private encounters: Encounter[];
    private patterns: Pattern[];

    constructor(callback: () => void) {
        this.enemies = [];
        this.encounters = [];
        this.patterns = [];

        const _oldContext = _CONTEXT.fightMod;
        _CONTEXT.fightMod = this;
   
        callback();
        _CONTEXT.fightMod = _oldContext;

    }

    addEnemy(toAdd: Enemy) {
        if (this.enemies.some(enemy => enemy.props.key === toAdd.props.key)) {
            throw new Error("Enemy " + toAdd.props.key + " is defined more than once");
        }
        this.enemies.push(toAdd);
    }

    addEncounter(toAdd: Encounter) {
        if (this.encounters.some(enc => enc.encounterKey === toAdd.encounterKey)) {
            throw new Error("Encounter " + toAdd.encounterKey + " is defined more than once");
        }
        this.encounters.push(toAdd);
    }

    addPattern(toAdd: Pattern) {
        if (this.patterns.some(pat => pat.patternKey === toAdd.patternKey)) {
            throw new Error("Pattern " + toAdd.patternKey + " is defined more than once");
        }
        this.patterns.push(toAdd);
    }

    generate(): FileDef[] {
        const header = "Sheet Type,filename";
        const enemySheets = this.enemies.map(enemy => "EnemySheet," + enemy.sheetName).join("\n");
        const encounterSheets = this.encounters.map(enc => "EncounterSheet," + enc.sheetName).join("\n");
        const patternSheets = this.patterns.map(pat => "PatternSheet," + pat.sheetName).join("\n");

        const thisFile: FileDef = {
            fileName: "SheetList.csv",
            content: header + "\n" +
                enemySheets + "\n" +
                encounterSheets + "\n" +
                patternSheets
        };
        return [
            thisFile,
            ...this.enemies.flatMap(enemy => enemy.generate()),
            ...this.encounters.flatMap(enc => enc.generate()),
            ...this.patterns.flatMap(pat => pat.generate())
        ];
    };
}

export default FightMod;