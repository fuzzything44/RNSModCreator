import _CONTEXT from "./InternalContext.js";
import type { PatternVars, Value } from "./PatternVars.js";

enum Element {
    Purple = 2,
    Blue = 3,
    Red = 4,
    Yellow = 5,
    Green = 6
}

const addBasePattern = (patName: string, patArgs: PatternVars) => {
    if (_CONTEXT.timeBlock === null) {
        throw new Error("You must call base patterns inside a time block");
    }
    if (Object.keys(patArgs).length == 0) {
        _CONTEXT.timeBlock.addContent(`pattAdd,${patName}\n`);
    } else {
        const content =
            `pattVars,` + Object.keys(patArgs).map(key => {
                const value: Value | Value[] | undefined = patArgs[key as keyof PatternVars];
                // Some values are sent in as arrays, we need to handle that
                if (Array.isArray(value)) {
                    // t_xpos and t_ypos have no _, everything else does
                    const separator = key.startsWith("t_") ? "" : "_";
                    return value.map((val, index) => `${key}${separator}${index};${val}`).join(",");
                } else {
                    return `${key};${patArgs[key as keyof PatternVars]}`;
                }
            }).join(",") + "\n" +
            `pattAdd,${patName}\n` +
            `pattVarReset\n`;
        _CONTEXT.timeBlock.addContent(content);
    }
}

type DELAYS = "warningDelay" | "spawnDelay";

const bp = {

    /** Applies a HBS (buff) */
    applyHbsSynced: (args: Pick<PatternVars, "hbsIndex" | "hbsDuration" | "hbsStrength" | "delay" | "hbsHitDelay">) => addBasePattern("bp_apply_hbs_synced", args),

    /** Azel chain binds, horizontal */
    bindH: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "trgBinary">) => addBasePattern("bp_bind_h", args),

    /** Azel chain binds, vertical */
    bindV: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "trgBinary">) => addBasePattern("bp_bind_v", args),

    /** Kuu enlarging exploding spheres */
    bulletEnlarge: (args: Pick<PatternVars, DELAYS | "timeBetween" | "scale" | "scaleInc" | "num" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_bullet_enlarge", args),

    /** Illie cardinal 4-way lasers
     *  They only have a rotation of 0 in the base game, but they support any angle */
    cardinalR: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "warningDelay2" | "x" | "y" | "rot" | "width" | "displayNumber">) => addBasePattern("bp_cardinal_r", args),

    /** Unused in the base game, but creates a 1-frame circular hitbox similar to a spread */
    circlePosition: (args: Pick<PatternVars, DELAYS | "radius" | "trgBinary" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_circle_position", args),

    /** These are the circle spreads!
     *  The ones that are used everywhere.
     *  You can use circleRadiusDef(1) for radius to automatically adjust the size of the speads based off the number of people playing */
    circleSpreads: (args: Pick<PatternVars, DELAYS | "radius" | "trgBinary" | "warnMsg">) => addBasePattern("bp_circle_spreads", args),

    /** Merran/Tassha half-room cleaves.
     * These are the ones that target players.
     */
    cleave: (args: Pick<PatternVars, DELAYS | "warnMsg" | "orderBin"> & { rot?: number[] }) => addBasePattern("bp_cleave", args),

    /** Merran/Tassha half-room cleaves.
     * This one follows an enemy. */
    cleaveEnemy: (args: Pick<PatternVars, DELAYS | "warnMsg"> & { rot?: number} ) => addBasePattern("bp_cleave_enemy", args),
    /**
     * Merran/Tassha half-room cleaves.
     * This one is placed on a fixed point.
     */
    cleaveFixed: (args: Pick<PatternVars, DELAYS | "warnMsg" | "numPoints" | "posX" | "posY"> & { rot?: number[] }) => addBasePattern("bp_cleave_fixed", args),

    /** Cone spreads from a set point (sometimes used by Dragons/Wolves)
     */
    clockspot: (args: Pick<PatternVars, DELAYS | "warningDelay2" | "radius" | "fanAngle" | "trgBinary" | "warnMsg" | "displayNumber">) => addBasePattern("bp_clockspot", args),

    /** Color matching where each player gets a circle, and they must all stack together.
     */
    colormatch: (args: Pick<PatternVars, DELAYS | "hasFixed" | "x" | "y" | "element" | "radius" | "trgBinary" | "warnMsg" | "displayNumber">) => addBasePattern("bp_colormatch", args),

    /** Color matching where each player gets a symbol, and has to stand in a particular circle
     *  The circle's spawn timing can be changed with warningDelay
     *  The symbols over players' heads is changed with warningDelay2
     */
    colormatch2: (args: Pick<PatternVars, DELAYS | "warningDelay2" | "x" | "y" | "element" | "radius" | "ringNum" | "trgBinary" | "warnMsg" | "displayNumber">) => addBasePattern("bp_colormatch2", args),
    
    /** Avy OSU-style color matches; will go in the order of points
     */
    colormatch3: (args: Pick<PatternVars, DELAYS | "timeBetween" | "timeExtra" | "element" | "radius" | "trgBinary" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_colormatch3", args),
    
    /** Unused in the base game, but sends a cone spread-shaped AoE in a direction
     */
    coneDirection: (args: Pick<PatternVars, DELAYS | "fanAngle" | "trgBinary" | "x" | "y" | "numCones"> & { rot?: number[]}) => addBasePattern("bp_cone_direction", args),
    
    /** These are the cone spreads!
     *  The ones that are used everywhere. 
     *  You can use coneRadiusDef(1) for radius to automatically adjust the size of the speads based off the number of people playing"
     */
    coneSpreads: (args: Pick<PatternVars, DELAYS | "fanAngle" | "trgBinary" | "x" | "y" | "warnMsg">) => addBasePattern("bp_cone_spreads", args),
    
    /** A circular blast of bullets, centered on a point.
     *  Type 0 is small bullets, type 1 is large bullets
     */
    dark2Blast: (args: Pick<PatternVars, "spawnDelay" | "x" | "y" | "angle" | "offset" | "num"> & { spd?: number, type?: 0 | 1 }) => addBasePattern("bp_dark2_blast", args),
    
    /** A line of bullets, starting at (x,y)
     *  Type 0 is small bullets, type 1 is large bullets
     */
    dark2Line: (args: Pick<PatternVars, DELAYS | "spawnDelayTotal" | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "num" | "lineLength"> & { spd?: number, type?: 0 | 1 }) => addBasePattern("bp_dark2_line", args),
    
    /** A line of bullets, but their speed is randomized
     *  Type 0 is small bullets, type 1 is large bullets
     */
    dark2LineRandomized: (args: Pick<PatternVars, DELAYS | "spawnDelayTotal" | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "num" | "lineLength" | "spdMax" | "spdMin" | "rand"> & {type?: 0 | 1}) => addBasePattern("bp_dark2_line_randomized", args),

    /** A single moon summon
        You should probably use ""bp_dark_moon_summon_mult"" instead"
     */
    darkMoonSummon: (args: Pick<PatternVars, DELAYS | "x" | "y" | "scale" | "dir"> & { spd?: Value }) => addBasePattern("bp_dark_moon_summon", args),

    /** Multiple moon summons, as used by the Crows/Shira
     */
    darkMoonSummonMult: (args: Pick<PatternVars, DELAYS | "scale" | "dir" | "numPoints" | "posX" | "posY"> & { spd?: Value[]}) => addBasePattern("bp_dark_moon_summon_mult", args),

    /** A targeted AoE, used by Crows
     */
    darkTargeted: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "scale" | "type" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_dark_targeted", args),

    /** Not used in the base game, but will damage all players
     */
    damagePlayers: (args: Pick<PatternVars, "delay" | "trgBinary">) => addBasePattern("bp_damage_players", args),

    /** A "delayed" chain-bind, for use during Timestop
     */
    delayedBind: (args: Pick<PatternVars, "spawnDelay" | "duration" | "trgBinary" | "horizontal">) => addBasePattern("bp_delayed_bind", args),

    /** A "delayed" circle spread, for use during Timestop
     */
    delayedCircleSpreads: (args: Pick<PatternVars, DELAYS | "radius" | "trgBinary">) => addBasePattern("bp_delayed_circle_spreads", args),

    /** A "delayed" color match, for use during Timestop
     */
    delayedColormatch: (args: Pick<PatternVars, DELAYS | "radius" | "element" | "trgBinary">) => addBasePattern("bp_delayed_colormatch", args),

    /** A "delayed" cone spread, for use during Timestop
     */
    delayedConeSpreads: (args: Pick<PatternVars, DELAYS | "fanAngle" | "trgBinary">) => addBasePattern("bp_delayed_cone_spreads", args),

    /** A "delayed" moon summon, for use during Timestop
     */
    delayedDarkMoonMult: (args: Pick<PatternVars, DELAYS | "scale" | "dir" | "numPoints" | "posX" | "posY"> & { spd?: Value[] }) => addBasePattern("bp_delayed_dark_moon_mult", args),

    /** "Delayed" line spreads, for use during Timestop (horizontal)
     */
    delayedLineSpreadsH: (args: Pick<PatternVars, DELAYS | "width" | "trgBinary">) => addBasePattern("bp_delayed_line_spreads_h", args),

    /** "Delayed" line spreads, for use during Timestop (vertical)
     */
    delayedLineSpreadsV: (args: Pick<PatternVars, DELAYS | "width" | "trgBinary">) => addBasePattern("bp_delayed_line_spreads_v", args),

    /** "Delayed" stack circle, for use during Timestop
        This one will spawn at a specified x and y
     */
    delayedPrsCircle: (args: Pick<PatternVars, DELAYS | "x" | "y" | "radius" | "angle" | "number" | "element" | "doubled"> & { spd?: Value}) => addBasePattern("bp_delayed_prscircle", args),

    /** "Delayed" stack circle, for use during Timestop
        This one will follow a specified targetId
     */
    delayedPrsCircleFollow: (args: Pick<PatternVars, DELAYS | "x" | "y" | "radius" | "angle" | "number" | "element" | "doubled" | "targetId"> & { spd?: Value }) => addBasePattern("bp_delayed_prscircle_follow", args),

    /** "Delayed" stack line, for use during Timestop
     */
    delayedPrsLine: (args: Pick<PatternVars, DELAYS | "x" | "y" | "element" | "doubled" | "width" | "horizontal"> & { spd?: Value }) => addBasePattern("bp_delayed_prsline", args),

    /** "Delayed" stack line, for use during Timestop
        This one will follow a specified targetId
     */
    delayedPrsLineFollow: (args: Pick<PatternVars, DELAYS | "targetId" | "element" | "doubled" | "width" | "horizontal"> & { spd?: Value }) => addBasePattern("bp_delayed_prsline_follow", args),

    /**  "Delayed" spinning ray, for use during Timestop
     */
    delayedRayspin: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "radius" | "num" | "x" | "y" | "width" | "angle"> & { rot?: Value }) => addBasePattern("bp_delayed_rayspin", args),

    /** "Delayed" targeted AoE (dark element) for use during Timestop
     */
    delayedTargetCircle: (args: Pick<PatternVars, DELAYS | "scale" | "type" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_delayed_target_circle", args),

    /** "Delayed" teleport for use during Timestop.
     */
    delayedTeleport: (args: Pick<PatternVars, DELAYS> & { offX?: Value[], offY?: Value[]}) => addBasePattern("bp_delayed_teleport", args),

    /** "Delayed"" thorns for use during Timestop
        I don't use this in the base game, and don't know if it actually works correctly or not
     */
    delayedThorns_EXPERIMENTAL: (args: Pick<PatternVars, DELAYS | "trgBinary" | "radius">) => addBasePattern("bp_delayed_thorns", args),

    /** Displays numbers with timers at specified positions.
        Will start with "displayNumber" and increment by 1 for each position, with the timers lasting "timeBetween" longer each time.
     */
    displayNumbers: (args: Pick<PatternVars, DELAYS | "timeBetween" | "displayNumber" | "warnMsg" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_displaynumbers", args),

    /** The usual "enrage", only needs to get called once
    */
    enrage: (args: Pick<PatternVars, DELAYS | "timeBetween" | "resetAnim">) => addBasePattern("bp_enrage", args),

    /** Calls just one enrage circle, without a timer
     */
    enrageActivate: (args: Pick<PatternVars, "x" | "y">) => addBasePattern("bp_enrage_activate", args),

    /** Makes the enrage "decoration" (the circles that appear behind the enemy) and the timers, without actually having any enrage happen
     */
    enrageDeco: (args: Pick<PatternVars, DELAYS | "resetAnim">) => addBasePattern("bp_enrage_deco", args),

    /** Calls just one enrage circle, with a timer
     */
    enrageSingle: (args: Pick<PatternVars, DELAYS>) => addBasePattern("bp_enrage_single", args),

    /** Calls just one enrage circle, with a timer, at a specified position
     */
    enrageSinglePos: (args: Pick<PatternVars, DELAYS | "x" | "y">) => addBasePattern("bp_enrage_single_pos", args),

    /** Will erase ALL bullets in a radius
     */
    eraseBullets: (args: Pick<PatternVars, "x" | "y" | "delay" | "radius">) => addBasePattern("bp_erase_bullets", args),

    /** Will erase smaller bullets in a radius (that are normally erased by player abilities)
     */
    eraseBulletsSmall: (args: Pick<PatternVars, "x" | "y" | "delay" | "radius">) => addBasePattern("bp_erase_bullets_small", args),

    /** Fieldlimit, as used by Ran and Xin
        Traps specified players in a rectangle, colored by element, until the end of the fight
     */
    fieldlimitRectangle: (args: Pick<PatternVars, "spawnDelay" | "trgBinary" | "element" | "x" | "y" | "width" | "height">) => addBasePattern("bp_fieldlimit_rectangle", args),

    /** Fieldlimit, as used by Ran and Xin
        Traps specified players in a rectangle, colored by element, for a specified period of time
     */
    fieldlimitRectangleTemporary: (args: Pick<PatternVars, "spawnDelay" | "eraseDelay" | "trgBinary" | "element" | "x" | "y" | "width" | "height">) => addBasePattern("bp_fieldlimit_rectangle_temporary", args),

    /** A circular blast of fire, as used by Sohko
        Dreadwyrm wide
     */
    fire2Blast: (args: Pick<PatternVars, DELAYS | "showWarning" | "ringNum" | "x" | "y" | "angle" | "offset" | "num" | "faded" | "type"> & { spd?: Value[] }) => addBasePattern("bp_fire2_blast", args),

    /** A fan of bullets, I can't remember if Sohko still uses this at all but she used to
     */
    fire2Fan: (args: Pick<PatternVars, "spawnDelay" | "ringNum" | "x" | "y" | "angle" | "fanAngle" | "offset" | "num">) => addBasePattern("bp_fire2_fan", args),

    /** A line of bullets
     */
    fire2Line: (args: Pick<PatternVars, DELAYS | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "lineLength" | "num"> & { spd?: Value}) => addBasePattern("bp_fire2_line", args),

    /** A line of bullets that repeats the specified number of times
     */
    fire2LineRepeating: (args: Pick<PatternVars, DELAYS | "timeBetween" | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "lineLength" | "numLines" | "num"> & { spd?: Value }) => addBasePattern("bp_fire2_line_repeating", args),

    /** A fire-aspected targetted AoE
     */
    fireAoe: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "trgBinary" | "scale" | "type" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_fire_aoe", args),

    /** A fire-aspected targetted AoE that will stay on the battlefield until the end of the fight
     */
    fireAoePerm: (args: Pick<PatternVars, DELAYS | "trgBinary" | "scale" | "type" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_fire_aoe_perm", args),

    /** Gravity field that pulls you down, as used by Menna
        "mult" is 1 by default, higher is stronger
     */
    gravityFall: (args: Pick<PatternVars, "mult">) => addBasePattern("bp_gravity_fall", args),

    /** Gravity field that pulls you down, as used by Menna (but temporary)
        "mult" is 1 by default, higher is stronger
     */
    gravityFallTemporary: (args: Pick<PatternVars, "spawnDelay" | "eraseDelay" | "trgBinary" | "mult">) => addBasePattern("bp_gravity_fall_temporary", args),

    /** Gravity field that pulls you towards an x/y position, as used by Menna
        "mult" is 1 by default, higher is stronger
     */
    gravityPull: (args: Pick<PatternVars, "x" | "y" | "mult">) => addBasePattern("bp_gravity_pull", args),

    /** Gravity field that pulls you towards an x/y position, as used by Menna (but temporary)
        "mult" is 1 by default, higher is stronger
     */
    gravityPullTemporary: (args: Pick<PatternVars, "spawnDelay" | "eraseDelay" | "x" | "y" | "mult">) => addBasePattern("bp_gravity_pull_temporary", args),

    /** "Heavy" status effect that makes you slower, as used by Orn
     */
    heavy: (args: Pick<PatternVars, "trgBinary">) => addBasePattern("bp_heavy", args),

    /** "Heavy" status effect that makes you slower, as used by Orn (but temporary)
     */
    heavyTemporary: (args: Pick<PatternVars, "spawnDelay" | "hbsDuration" | "trgBinary">) => addBasePattern("bp_heavy_temporary", args),

    /** "Very Heavy" status effect that makes you slower, as used by Orn
     */
    heavyExtra: (args: Pick<PatternVars, "trgBinary">) => addBasePattern("bp_heavyextra", args),

    /** "Very Heavy" status effect that makes you slower, as used by Orn (but temporary)
     */
    heavyExtraTemporary: (args: Pick<PatternVars, "spawnDelay" | "hbsDuration" | "trgBinary">) => addBasePattern("bp_heavyextra_temporary", args),

    /** Removes invulnerability from specified players (used by Merran Phase 2)
     */
    invulnCancel: (args: Pick<PatternVars, "delay" | "trgBinary">) => addBasePattern("bp_invulncancel", args),

    /** A knockback from a point
        "lifespan" is how long you will be pushed for, usually 300-500ms
        "kbAmount" is how far you get pushed
     */
    knockbackCircle: (args: Pick<PatternVars, DELAYS | "trgBinary" | "x" | "y" | "radius" | "warnMsg" | "lifespan" | "kbAmount">) => addBasePattern("bp_knockback_circle", args),

    /** A knockback from a specified line
        "lifespan" is how long you will be pushed for, usually 300-500ms
        "kbAmount" is how far you get pushed
     */
    knockbackLine: (args: Pick<PatternVars, DELAYS | "trgBinary" | "x" | "y" | "radius" | "horizontal" | "warnMsg" | "lifespan" | "kbAmount">) => addBasePattern("bp_knockback_line", args),

    /** Two lasers that cross at a point
     */
    lightCross: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "x" | "y" | "width">) => addBasePattern("bp_light_cross", args),

    /** A single line of bullets, fired in a direction
     *  I'm not sure I use this one anywhere in the base game, since it's very bullet hell
     */
    lightLine: (args: Pick<PatternVars, DELAYS | "showWarning" | "x" | "y" | "angle" | "lineAngle" | "lineLength" | "num" | "type"> & { spd?: Value}) => addBasePattern("bp_light_line", args),

    /** Light-aspected targetted AoE
     */
    lightTargeted: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "scale" | "type" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_light_targeted", args),

    /** Line spreads that are used everywhere, horizontal
     */
    lineSpreadsH: (args: Pick<PatternVars, DELAYS | "width" | "trgBinary" | "warnMsg">) => addBasePattern("bp_line_spreads_h", args),

    /** Line spreads that are used everywhere, vertical
     */
    lineSpreadsV: (args: Pick<PatternVars, DELAYS | "width" | "trgBinary" | "warnMsg">) => addBasePattern("bp_line_spreads_v", args),

    /** Line spreads, followed by lasers in those same positions (once used by Azel I think)
     *  Horizontal
     */
    lineSpreadsRaysH: (args: Pick<PatternVars, DELAYS | "width" | "trgBinary" | "warnMsg" | "laserSpawnDelay" | "laserEraseDelay">) => addBasePattern("bp_line_spreads_rays_h", args),

    /** Line spreads, followed by lasers in those same positions (once used by Azel I think)
     *  Vertical
     */
    lineSpreadsRaysV: (args: Pick<PatternVars, DELAYS | "width" | "trgBinary" | "warnMsg" | "laserSpawnDelay" | "laserEraseDelay">) => addBasePattern("bp_line_spreads_rays_v", args),

    /** A bullet that moves along a path, as used by Varo and Matti
     *  This one will end at the end of its path
     */
    marchingBullet: (args: Pick<PatternVars, DELAYS | "timeBetween" | "scale" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_marching_bullet", args),

    /** A bullet that moves along a path, as used by Varo and Matti
     *  This one will repeat the same path over and over for "number" points total
     */
    marchingBulletRepeating: (args: Pick<PatternVars, DELAYS | "timeBetween" | "scale" | "number" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_marching_bullet_repeating", args),

    /** Special movement funciton for Avy Phase 2 that syncs her animation with her movement
     */
    movePositionFrogIdol: (args: Pick<PatternVars, "x" | "y" | "duration" | "spawnDelay">) => addBasePattern("bp_move_position_frog_idol", args),

    /** Moves an enemy (the "move" command in "random things" just calls this pattern)
     *  If "resetAnim" is true, then the enemy will stop their current animation before moving
     */
    movePositionSynced: (args: Pick<PatternVars, "x" | "y" | "duration" | "resetAnim" | "spawnDelay">) => addBasePattern("bp_move_position_synced", args),

    /** This moves a "spawn" (additional enemies that appear during the fight, like Tassha clones or Matti P2 mice)
     */
    movePositionSyncedSpawn: (args: Pick<PatternVars, "duration" | "number" | "spawnDelay" | "playerId" | "posX" | "posY">) => addBasePattern("bp_move_position_synced_spawn", args),

    /** Special movement funciton for Merran Phase 2 that syncs her animation with her movement
     */
    movePositionWolfSteeltooth: (args: Pick<PatternVars, "spawnDelay" | "eraseDelay" | "x" | "y" | "duration">) => addBasePattern("bp_move_position_wolf_steeltooth", args),

    /** Shows an arrow warning players of immenent movement
     */
    moveWarning: (args: Pick<PatternVars, DELAYS | "warnMsg" | "x" | "y">) => addBasePattern("bp_move_warning", args),

    /** Lette and Jay's "keep moving" and "stop moving"
     */
    movementCheck: (args: Pick<PatternVars, DELAYS | "warnMsg" | "trgBinary" | "shouldMove" | "radius">) => addBasePattern("bp_movementcheck", args),

    /** A stack circle
     *  "element" will determine the kind of bullets that the circle uses (did you notice they use different bullets depending on the race?)
     *  "doubled" will make a second, offset ring that launches out faster, making it more difficult to dodge through
     *  "displayNum" will make a large displayed number in the middle, in case you want to specify order to the player"
     */
    prsCircle: (args: Pick<PatternVars, DELAYS | "x" | "y" | "radius" | "angle" | "number" | "element" | "doubled" | "displayNumber" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prscircle", args),

    /** A stack circle that follows the specified target ID
     */
    prsCircleFollow: (args: Pick<PatternVars, DELAYS | "targetId" | "radius" | "angle" | "number" | "element" | "doubled" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prscircle_follow", args),

    /** A stack circle that will spawn on and follow the specified trgBinary players
     */
    prsCircleFollowBin: (args: Pick<PatternVars, DELAYS | "trgBinary" | "radius" | "number" | "element" | "doubled" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prscircle_follow_bin", args),

    /** A stack circle that will follow the enemy that uses it, even if they move
     */
    prsCircleFollowEnemy: (args: Pick<PatternVars, DELAYS | "radius" | "number" | "element" | "doubled" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prscircle_follow_enemy", args),

    /** A stack line, horizontal
     */
    prsLineH: (args: Pick<PatternVars, DELAYS | "y" | "width" | "offset" | "doubled" | "displayNumber" | "element" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prsline_h", args),

    /** A stack line that follows a specified target ID, horizontal
     */
    prsLineHFollow: (args: Pick<PatternVars, DELAYS | "targetId" | "width" | "offset" | "doubled" | "element" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prsline_h_follow", args),

    /** A stack line that follows the enemy that places it, horizontal
     */
    prsLineHFollowEnemy: (args: Pick<PatternVars, DELAYS | "width" | "offset" | "doubled" | "element" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prsline_h_follow_enemy", args),

    /** This will fire a criss-crossing line of bullets horizontally
     */
    prsLineHSingle: (args: Pick<PatternVars, "spawnDelay" | "y" | "offset" | "element" | "num" | "dir"> & { spd?: Value}) => addBasePattern("bp_prsline_h_single", args),

    /** A stack line, vertical
    */
    prsLineV: (args: Pick<PatternVars, DELAYS | "x" | "width" | "offset" | "doubled" | "displayNumber" | "element" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prsline_v", args),

    /** A stack line that follows a specified target ID, horizontal
     */
    prsLineVFollow: (args: Pick<PatternVars, DELAYS | "targetId" | "width" | "offset" | "doubled" | "element" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prsline_v_follow", args),

    /** A stack line that follows the enemy that places it, horizontal
     */
    prsLineVFollowEnemy: (args: Pick<PatternVars, DELAYS | "width" | "offset" | "doubled" | "element" | "warnMsg"> & { spd?: Value }) => addBasePattern("bp_prsline_v_follow_enemy", args),

    /** This will fire a criss-crossing line of bullets horizontally
     */
    prsLineVSingle: (args: Pick<PatternVars, "spawnDelay" | "x" | "offset" | "element" | "num" | "dir"> & { spd?: Value }) => addBasePattern("bp_prsline_v_single", args),

    /** An expanding ray, as used by Pi and other dragons
     */
    rayEnlargeSingle: (args: Pick<PatternVars, DELAYS | "timeBetween" | "x" | "y" | "angle" | "width" | "widthInc" | "num">) => addBasePattern("bp_ray_enlarge_single", args),

    /** Fires a number of rays out from a central point, with specified rotations
     */
    rayMultiDir: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "width" | "x" | "y" | "numPoints"> & { rot?: Value[] }) => addBasePattern("bp_ray_multi_dir", args),

    /** Fires a number of rays horizontally across the screen
     */
    rayMultiH: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "width" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_ray_multi_h", args),

    /** Fires a number of rays vertically across the screen
     */
    rayMultiV: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "width" | "numPoints" | "posX" | "posY">) => addBasePattern("bp_ray_multi_v", args),

    /** Fires a ray that "slices" through the screen, going through the specified points at the specified rotation
     */
    rayMultiSlice: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "timeBetween" | "width" | "numPoints" | "posX" | "posY"> & { rot?: Value[]}) => addBasePattern("bp_ray_multi_slice", args),

    /** Fires a single ray
     */
    raySingle: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "x" | "y" | "angle" | "width">) => addBasePattern("bp_ray_single", args),

    /** Fires a spinning ray, as used by Karsi and other Dragons
     *  This one stands still while it is in the "warning" state, spins by the specified angle between spawnDelay and eraseDelay, then disappears
     */
    raySpinfast: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "x" | "y" | "angle" | "num" | "radius" | "width"> & {rot?: Value}) => addBasePattern("bp_ray_spinfast", args),

    /** Fires a spinning ray, as used by Karsi and other Dragons
     *  This one is spinning during the "warning" state, and instead of specifiying an angle it should move by, it has a "speedMult" that determines how fast it spins
     *  If "shouldMove" is set to true, then the laser will follow the enemy even if it moves.  Otherwise, it will stay in place.
     */
    raySpinning: (args: Pick<PatternVars, DELAYS | "eraseDelay" | "x" | "y" | "radius" | "num" | "speedMult" | "width" | "shouldMove"> & { rot?: Value}) => addBasePattern("bp_ray_spinning", args),

    /** Same as bp_ray_spinning, but permanent until the enemy is KO'd.
     */
    raySpinningPermanent: (args: Pick<PatternVars, DELAYS | "x" | "y" | "radius" | "num" | "speedMult" | "width" | "shouldMove"> & { rot?: Value }) => addBasePattern("bp_ray_spinning_permanent", args),

    /** Places a status effect on the enemy using the attack.
     *  Use hbs(hbsKeyHere) to get the index to pass in.
     */
    selfHbs: (args: Pick<PatternVars, "spawnDelay" | "hbsIndex" | "hbsDuration" | "hbsStrength">) => addBasePattern("bp_self_hbs", args),

    /** Adds "Group 1" "Group 2" etc. status effect to specified players.
     */
    showGroups: (args: Pick<PatternVars, "spawnDelay" | "eraseDelay" | "orderBin">) => addBasePattern("bp_showgroups", args),

    /** Adds "First" "Second" "Third" etc. status effect to specified players.
     */
    showOrder: (args: Pick<PatternVars, "spawnDelay" | "eraseDelay" | "timeBetween" | "orderBin">) => addBasePattern("bp_showorder", args),

    /** 
     */
    patNameHere: (args: Pick<PatternVars, DELAYS>) => addBasePattern("NAME_HERE", args),

}

export default addBasePattern;
export { bp, Element }