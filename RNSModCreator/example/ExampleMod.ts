import { bp, Element } from "../src/BasePattern.js";
import Color from "../src/Color.js";
import { condDifficultyCheck, condPlayerCount } from "../src/Condition.js";
import Encounter from "../src/Encounter.js";
import Enemy from "../src/Enemy.js";
import FightMod from "../src/FightMod.js";
import Pattern from "../src/Pattern.js";
import { time, timeRepeating, timeRepeatingTimes } from "../src/Time.js";

const mod = new FightMod(() => {
    const testEnemy = new Enemy({
        key: "test_enemy",
        animationKey: "some animation",
        color: Color.RED
    });

    const testEnc = new Encounter("test_encounter");

    const testPattern = new Pattern("test_pattern", () => {
        time(0, () => {
            bp.bindH({
                warningDelay: 1000,
                trgBinary: 0b0011,
            });
        });
        timeRepeating(1000, 5000, () => {
            bp.bulletEnlarge({
                numPoints: 3,
                posX: [0, 5, 10],
                posY: [69, 420, 0]
            })
        });
    });

    
    const pattern2 = new Pattern("test_pattern_2", () => {
        timeRepeating(1000, 5000, () => {
            testPattern.run();
        });

        timeRepeatingTimes(4000, 1000, 6, () => {
            condPlayerCount({ twoPlayer: true, threePlayer: true, fourPlayer: true }, () => {
                bp.cleave({
                    orderBin: [1, 1 << 1, 1 << 2, 1 << 3],
                    rot: [0, 90, 180, 270],
                    warningDelay: 1000,
                    spawnDelay: 3000
                });
                condDifficultyCheck({ lunar: true }, () => {
                    bp.cleaveFixed({ posX: [500], posY: [500], numPoints: 1 });
                });

                bp.circleSpreads({trgBinary: 0b11, radius: 100});
            });

            condPlayerCount({ singlePlayer: true }, () => {
                bp.bulletEnlarge({posX: [100], posY: [200], numPoints: 1});
            });
            bp.colormatch({
                x: 300,
                y: 400,
                element: Element.Blue
            })
        });
    });

    testEnc.addEnemy(testEnemy, {
        single: {
            normal: testPattern,
            hard: testPattern,
            lunar: testPattern
        },
        multi: {
            normal: testPattern,
            hard: testPattern,
            lunar: testPattern
        }
    });

    testEnc.addEnemy("en_bird_sophomore", {
        single: {
            normal: pattern2,
            hard: pattern2,
            lunar: pattern2
        },
        multi: {
            normal: pattern2,
            hard: pattern2,
            lunar: pattern2
        }
    });
});

const outputs = mod.generate();
outputs.forEach(file => {
    console.log(`<${file.fileName}>\n${file.content}\n\n`);
});

while (true);
export default mod;