import { bp } from "../src/BasePattern.js";
import { animation, moveResetAnim } from "../src/Command.js";
import { playerXPos, playerYPos, pointFrom, random, randomTargetId } from "../src/Expression.js";
import { time, timeRepeatingTimes } from "../src/Time.js";
import { allTargets, bfHeight, bfMaxX, bfMinY, enemyX, enemyY, randomSign, setVar, type Variable } from "../src/Variable.js";

export const dreadWyrmSingle_2 = () => {
    time(0, () => {
        animation(0, 2000, 9000);
        bp.fireAoe({
            warningDelay: 0,
            spawnDelay: 2000,
            eraseDelay: 10000,
            scale: 4,
            type: 0,
            posX: [enemyX],
            posY: [enemyY]
        });
        bp.fire2LineRepeating({
            warningDelay: 0,
            spawnDelay: 4000,
            x: bfMaxX.add(300),
            y: bfMinY.subtract(500),
            lineLength: bfHeight.add(1000),
            lineAngle: 90,
            angle: 180,
            num: 20,
            spd: 18,
            numLines: 9,
            timeBetween: 800,
            showWarning: true
        });
    });

    timeRepeatingTimes(2000, 2000, 4, () => {
        const targetP = setVar(randomTargetId(allTargets));
        bp.raySingle({
            warningDelay: 0,
            spawnDelay: 1500,
            eraseDelay: 2500,
            width: 200,
            angle: pointFrom(enemyX, enemyY, playerXPos(targetP), playerYPos(targetP))
        });
    });

    time(9000, () => {
        const targetP = setVar(randomTargetId(allTargets));
        moveResetAnim(playerXPos(targetP), playerYPos(targetP), 1400);
    });

    let randAngle: Variable | null = null;
    time(11000, () => {
        animation(0, 2000, 10000);
        bp.fireAoe({
            warningDelay: 0,
            spawnDelay: 2500,
            eraseDelay: 10000,
            scale: 4,
            type: 0,
            posX: [enemyX],
            posY: [enemyY]
        });

        bp.knockbackCircle({
            warningDelay: 0,
            spawnDelay: 2700,
            x: enemyX,
            y: enemyY,
            radius: 200,
            warnMsg: 2,
            kbAmount: 500
        });

        randAngle = setVar(random(360));
    });
    const randAngle2 = randAngle!.add(180 / 30);

    timeRepeatingTimes(11000, 4000, 2, () => {
        bp.fire2Blast({
            warningDelay: 0, 
            spawnDelay: 2000,
            showWarning: true,
            ringNum: 2,
            spd: [20, 16],
            num: 30,
            angle: randAngle!,
            x: enemyX,
            y: enemyY
        });
        bp.fire2Blast({
            warningDelay: 2000,
            spawnDelay: 4000,
            showWarning: true,
            ringNum: 2,
            spd: [20, 16],
            num: 30,
            angle: randAngle2,
            x: enemyX,
            y: enemyY
        });
    });

    timeRepeatingTimes(13000, 4000, 2, () => {
        animation(0, 2000, 10000);
        const targetP = setVar(randomTargetId(allTargets));

        bp.raySpinfast({
            rot: pointFrom(enemyX, enemyY, playerXPos(targetP), playerYPos(targetP)),
            num: 1,
            angle: randomSign.multiply(100),
            spawnDelay: 2000,
            eraseDelay: 3000,
            width: 250
        });
    });
};

export const dreadWyrmSingle_3 = () => {

};

export const dreadWyrmSingle_4 = () => {

};

export const dreadWyrmSingle_5 = () => {

};

export const dreadWyrmSingle_6 = () => {

};

export const dreadWyrmSingle_7 = () => {

};