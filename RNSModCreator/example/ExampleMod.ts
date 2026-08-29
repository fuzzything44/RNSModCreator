import Color from "../src/Color.js";
import { dialog, endPattern, move, moveResetAnim, setExpMult, zoom } from "../src/Command.js";
import { condDifficultyCheck } from "../src/Condition.js";
import Encounter from "../src/Encounter.js";
import Enemy from "../src/Enemy.js";
import FightMod from "../src/FightMod.js";
import Pattern from "../src/Pattern.js";
import { time, timeRepeating } from "../src/Time.js";
import { bfCenterX, bfCenterY, enemyX, enemyY } from "../src/Variable.js";
import { dreadWyrmSingle_2, dreadWyrmSingle_3, dreadWyrmSingle_4, dreadWyrmSingle_5, dreadWyrmSingle_6, dreadWyrmSingle_7 } from "./DreadwyrmSinglePatterns.js";
import { dreadWyrmMulti_2, dreadWyrmMulti_3, dreadWyrmMulti_4, dreadWyrmMulti_5, dreadWyrmMulti_6, dreadWyrmMulti_7 } from "./DreadwyrmMultiPatterns.js";
import { bp } from "../src/BasePattern.js";

const mod = new FightMod("example dreadwyrm", () => {
    const testEnemy = new Enemy({
        key: "en_dreadwyrm_heir",
        animationKey: "anim_dreadwyrm_heir",
        animationKeyTransform: "anim_dreadwyrm_heir",
        color: new Color(0xFB, 0xF3, 0x98),
        colorSaturated: new Color(0xFB, 0xF3, 0x98),
        radius: 300,
        drawScale: 0.45,
        focusScale: 1,
        isSpawn: false,
        spawnDrawType: 0
    });

    const testEnc = new Encounter("enc_dreadwyrm_heir");

    const dreadwyrmSingle2 = new Pattern("mbp_dreadwyrm0_s_pt2", dreadWyrmSingle_2);
    const dreadwyrmSingle3 = new Pattern("mbp_dreadwyrm0_s_pt3", dreadWyrmSingle_3);
    const dreadwyrmSingle4 = new Pattern("mbp_dreadwyrm0_s_pt4", dreadWyrmSingle_4);
    const dreadwyrmSingle5 = new Pattern("mbp_dreadwyrm0_s_pt5", dreadWyrmSingle_5);
    const dreadwyrmSingle6 = new Pattern("mbp_dreadwyrm0_s_pt6", dreadWyrmSingle_6);
    const dreadwyrmSingle7 = new Pattern("mbp_dreadwyrm0_s_pt7", dreadWyrmSingle_7);

    const dreadwyrmMulti2 = new Pattern("mbp_dreadwyrm0_pt2", dreadWyrmMulti_2);
    const dreadwyrmMulti3 = new Pattern("mbp_dreadwyrm0_pt3", dreadWyrmMulti_3);
    const dreadwyrmMulti4 = new Pattern("mbp_dreadwyrm0_pt4", dreadWyrmMulti_4);
    const dreadwyrmMulti5 = new Pattern("mbp_dreadwyrm0_pt5", dreadWyrmMulti_5);
    const dreadwyrmMulti6 = new Pattern("mbp_dreadwyrm0_pt6", dreadWyrmMulti_6);
    const dreadwyrmMulti7 = new Pattern("mbp_dreadwyrm0_pt7", dreadWyrmMulti_7);

    const dreadwyrmEnrage = new Pattern("mbp_dreadwyrm0_enrage", () => {
        time(0, () => {
            moveResetAnim(bfCenterX, bfCenterY, 1500);
        });
        time(2000, () => {
            dialog(4000, "You're finished!");

            bp.enrage({
                warningDelay: 0,
                spawnDelay: 6000,
                timeBetween: 1500
            });
            
            bp.bulletEnlarge({
                warningDelay: 0,
                spawnDelay: 3000,
                timeBetween: 1500,
                scale: 2,
                scaleInc: 1,
                num: 9,
                posX: [enemyX],
                posY: [enemyY.subtract(200)]
            });
        });
    });

    const setup = () => {
        time(0, () => {
            zoom(0.9);
            setExpMult(3, 1.2);
            move(bfCenterX.add(700), bfCenterY, 1400);
        });
    };
    const dreadwyrmSingle = new Pattern("mbp_dreadwyrm0_s", () => {
        setup();

        time(3000, () => dreadwyrmSingle2.run());
        time(23000, () => dreadwyrmSingle3.run());
        timeRepeating(43000, 80000, () => dreadwyrmSingle4.run());
        timeRepeating(63000, 80000, () => dreadwyrmSingle5.run());
        timeRepeating(83000, 80000, () => dreadwyrmSingle6.run());
        timeRepeating(103000, 80000, () => dreadwyrmSingle7.run());
        time(142000, () => {
            condDifficultyCheck({ hard: true }, () => {
                dreadwyrmEnrage.run();
                endPattern();
            });
        });
        time(122000, () => {
            condDifficultyCheck({ lunar: true }, () => {
                dreadwyrmEnrage.run();
                endPattern();
            });
        });
    });

    const dreadwyrmMulti = new Pattern("mbp_dreadwyrm0", () => {
        setup();

        time(3000, () => dreadwyrmMulti2.run());
        time(23000, () => dreadwyrmMulti3.run());
        timeRepeating(43000, 80000, () => dreadwyrmMulti4.run());
        timeRepeating(63000, 80000, () => dreadwyrmMulti5.run());
        timeRepeating(83000, 80000, () => dreadwyrmMulti6.run());
        timeRepeating(103000, 80000, () => dreadwyrmMulti7.run());
        time(142000, () => {
            condDifficultyCheck({ hard: true }, () => {
                dreadwyrmEnrage.run();
                endPattern();
            });
        });
        time(122000, () => {
            condDifficultyCheck({ lunar: true }, () => {
                dreadwyrmEnrage.run();
                endPattern();
            });
        });
    });

    testEnc.addEnemy(testEnemy, {
        single: {
            normal: dreadwyrmSingle,
            hard: dreadwyrmSingle,
            lunar: dreadwyrmSingle
        },
        multi: {
            normal: dreadwyrmMulti,
            hard: dreadwyrmMulti,
            lunar: dreadwyrmMulti
        }
    }, 400, 0, 12000);
});

mod.generate();

console.log("Generation complete!");
while (true);
export default mod;