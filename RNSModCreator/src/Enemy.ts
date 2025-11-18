import type Color from "./Color.js";
import type { FileDef } from "./FileDef.js";
import _CONTEXT from "./InternalContext.js";

interface EnemyProps {
    key: string;
    animationKey?: string;
    animationKeyTransform?: string;
    color?: Color;
    colorSaturated?: Color;
    radius?: number;
    drawScale?: number;
    focusScale?: number;
    isSpawn?: boolean;
    spawnDrawType?: unknown;
}

class Enemy {
    sheetName: string;
    props: EnemyProps;

    constructor(props: EnemyProps) {
        this.sheetName = `Enemy_${props.key}`;
        this.props = props;

        if (_CONTEXT.fightMod === null) {
            console.warn("Enemy exists outside of Fight Mod: " + props.key);
        }
        _CONTEXT.fightMod?.addEnemy(this);
    }

    generate(): FileDef[] {
        const header = "key,animationKey,animationKeyTransform,color,colorSaturated,radius,drawScale,focusScale,isSpawn,spawnDrawType";
        const vars: (keyof EnemyProps)[] = [
            "key",
            "animationKey",
            "animationKeyTransform",
            "color",
            "colorSaturated",
            "radius",
            "drawScale",
            "focusScale",
            "isSpawn",
            "spawnDrawType"
        ];

        return [{
            fileName: this.sheetName + ".csv",
            content: header + "\n" +
                vars.map(id => (this.props[id] || "").toString()).join(",")
        }];
    };
}

export default Enemy;