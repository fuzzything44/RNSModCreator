import Enemy from "./Enemy.js";
import type { FileDef } from "./FileDef.js";
import _CONTEXT from "./InternalContext.js";
import type { PatternBundle } from "./Pattern.js";

interface EncounterEnemy {
    enemyKey: string;
    spawnX: number;
    spawnY: number;
    health: number;
    patterns: PatternBundle;
}

class Encounter {
    encounterKey: string;
    sheetName: string
    enemies: EncounterEnemy[];

    constructor(key: string) {
        this.sheetName = `Encounter_${key}`;
        this.encounterKey = key;
        this.enemies = [];

        if (_CONTEXT.fightMod === null) {
            console.warn("Encounter exists outside of Fight Mod: " + key);
        }
        _CONTEXT.fightMod?.addEncounter(this);
    }

    addEnemy(toAdd: Enemy | string, patterns: PatternBundle, spawnX: number = 400, spawnY: number = 0, health = 5000): Encounter {
        this.enemies.push({
            enemyKey: toAdd instanceof Enemy ? toAdd.props.key : toAdd,
            spawnX: spawnX,
            spawnY: spawnY,
            health: health,
            patterns: patterns
        });
        return this;
    }

    generate(): FileDef[] {
        if (this.enemies.length == 0) {
            throw new Error(`Encounter ${this.encounterKey} has no attached enemies`);
        }

        const header = "lineType,enemyKey,enemyPosX,enemyPosY,health,pattNormalSingle,pattHardSingle,pattLunarSingle,pattNormal,pattHard,pattLunar";

        return [{
            fileName: this.sheetName + ".csv",
            content: header + "\n" +
                "encounter," + this.encounterKey + "\n" +
                this.enemies.map(enemy => {
                    return `enemy,${enemy.enemyKey},${enemy.spawnX},${enemy.spawnY},${enemy.health},${enemy.patterns.single.normal.patternKey},${enemy.patterns.single.hard.patternKey},${enemy.patterns.single.lunar.patternKey},${enemy.patterns.multi.normal.patternKey},${enemy.patterns.multi.hard.patternKey},${enemy.patterns.multi.lunar.patternKey}`;
                }).join("\n")
        }];
    };
}

export default Encounter;