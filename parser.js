// Level Generator for Solo-Mini-Game 
// Color-Code to be added
// For now, the colors are numbered below
// And are in order of the row of colors 
// at the bottom of the second_level.png

var Jimp = require('jimp');
const fs = require('fs');
const { Console } = require('console');
const { set } = require('image-pixels/lib/cache');

const PLAYER_COLOR = 3869839615; // 1
let players = [];
players.unshift("players: [");

const FROG_BLUE_COLOR = 278193919; // 2
const FROG_GREEN_COLOR = 635834623; // 3
const FROG_PURPLE_COLOR = 2836457215; // 4
let frogs = [];
frogs.unshift("frogs: [");

const CAT_COLOR = 3872657663; // 5
let cats = [];
cats.unshift("cats: [");

const PILL_COLOR = 1159594239; // 6
let pills = [];
pills.unshift("pills: [");

const GROUND_COLOR = 138739967; // 7
let ground = [];
ground.unshift("ground: [");

const DIRT_PLAIN_COLOR = 2187002111; // 8
const DIRT_MID_COLOR = 3381461247; // 9
let dirt = [];
dirt.unshift("dirt: [");

const BRICK_COLOR = 3338666239; // 10
let bricks = [];
bricks.unshift("bricks: [");

const EDGE_RIGHT_TOP_COLOR = 3758138879; // 11
const EDGE_RIGHT_MID_COLOR = 3513366527; // 12
const EDGE_RIGHT_BOT_COLOR = 3898264063; // 13
const EDGE_LEFT_TOP_COLOR = 57087;       // 14
const EDGE_LEFT_MID_COLOR = 1769918463;  // 15
const EDGE_LEFT_BOT_COLOR = 1517545215;  // 16
let edges = [];
edges.unshift("edges: [");

const PLATFORM_SINGLE_COLOR = 1633105663; // 17
const PLATFORM_DOUBLE_COLOR = 690030591;  // 18
let platforms = [];
platforms.unshift("platforms: [");

const BEAM_COLOR = 4040123903; // 19
let beams = [];
beams.unshift("beams: [");
 
const TRUNK_COLOR = 1546522879; // 20
let trunks = [];
trunks.unshift("trunks: [");

const BRANCH_COLOR = 1799959807; // 21
let branches = [];
branches.unshift("branches: [");

const LEAVES_PURPLE_COLOR = 1462532863;  // 22 
const LEAVES_ORANGE_COLOR = 4070052351;  // 23
const LEAVES_BROWN_COLOR = 4076470527;   // 24
let leaves = [];
leaves.unshift("leaves: [");

const IMAGE_NAME = './second_level.png';
const LEVEL_FUNCTION_NAME = 'level2';

// Converted level
let levelcommands = [];
// Keep track of how many distinct colors we have (How many types of objects)
let colors = new Set();
//Load in your image
Jimp.read(IMAGE_NAME, (err, level) => {
    if (err) throw err;
    console.log('Loaded image...');
    // Get the dimensions of the image
    let height = level.bitmap.height;
    let width = level.bitmap.width;
    // Itterate through every pixel in the image
    for (let xCoord = 0; xCoord < width; xCoord++) {
        for (let yCoord = 0; yCoord < height; yCoord++) {
            const color = level.getPixelColor(xCoord, yCoord);
            console.log(`Pixel color at (${xCoord}, ${yCoord}): ${color}`);
            colors.add(level.getPixelColor(xCoord, yCoord));
            // When we come accross a pixel with a color value from our defined colors
            // We call a function that creates the line of code to add it to the game
            switch (level.getPixelColor(xCoord, yCoord)) {
                case PLAYER_COLOR:
                    generatePlayer(level, xCoord, yCoord);
                    break;
                case FROG_BLUE_COLOR:
                    generateFrog(level, xCoord, yCoord, 3, "blue_blue");
                    break;
                case FROG_GREEN_COLOR:
                    generateFrog(level, xCoord, yCoord, 3, "green_brown");
                    break;
                case FROG_PURPLE_COLOR:
                    generateFrog(level, xCoord, yCoord, 3, "purple_white");
                    break;
                case CAT_COLOR:
                    generateCat(level, xCoord, yCoord, 5, true);
                    break;
                case PILL_COLOR:
                    generatePill(level, xCoord, yCoord, 4);
                    break;
                case GROUND_COLOR:
                    generateGround(level, xCoord, yCoord, 1);
                    break;
                case DIRT_PLAIN_COLOR:
                    generateDirt(level, xCoord, yCoord, 1, "Plain");
                    break;
                case DIRT_MID_COLOR:
                    generateDirt(level, xCoord, yCoord, 1, "Mid");
                    break;
                case BRICK_COLOR:
                    generateBrick(level, xCoord, yCoord, 1);
                    break;
                case EDGE_RIGHT_TOP_COLOR:
                    generateEdge(level, xCoord, yCoord, "RightTop");
                    break;
                case EDGE_RIGHT_MID_COLOR:
                    generateEdge(level, xCoord, yCoord, "RightMid");
                    break;
                case EDGE_RIGHT_BOT_COLOR:
                    generateEdge(level, xCoord, yCoord, "RightBot");
                    break;
                case EDGE_LEFT_TOP_COLOR:
                    generateEdge(level, xCoord, yCoord, "LeftTop");
                    break;
                case EDGE_LEFT_MID_COLOR:
                    generateEdge(level, xCoord, yCoord, "LeftMid");
                    break;
                case EDGE_LEFT_BOT_COLOR:
                    generateEdge(level, xCoord, yCoord, "LeftBot");
                    break;
                case PLATFORM_SINGLE_COLOR:
                    generatePlatform(level, xCoord, yCoord, 1, 1, "Single", false, 1, 50);
                    break;
                case PLATFORM_DOUBLE_COLOR:
                    generatePlatform(level, xCoord, yCoord, 1, 2, "Double", false, 0, 0);
                    break;
                case BEAM_COLOR:
                    generateBeam(level, xCoord, yCoord, 1, 2, "Long");
                    break;
                case TRUNK_COLOR:
                    generateTrunk(level, xCoord, yCoord, 2);
                    break;
                case BRANCH_COLOR:
                    generateBranch(level, xCoord, yCoord, 2);
                    break;
                case LEAVES_PURPLE_COLOR:
                    generateLeaves(level, xCoord, yCoord, 4, "Purple");
                    break;
                case LEAVES_ORANGE_COLOR:
                    generateLeaves(level, xCoord, yCoord, 4, "Orange");
                    break;
                case LEAVES_BROWN_COLOR:
                    generateLeaves(level, xCoord, yCoord, 4, "OrangeBrown");
                    break;
                default:
                    break;
            }
        }
    }
    // This will show us which pixels we picked up and changed
    level.write('updated_level_image.png');
    // See how many entities we added!
    console.log('Done! Used', levelcommands.length, 'entities!');
    // Show the colors of entities used in the image
    console.log(colors);

    // add closing ] to every entity array
    players.push("],");
    ground.push("],");
    dirt.push("],");
    bricks.push("],");
    edges.push("],");
    platforms.push("],");
    beams.push("],");
    trunks.push("],");
    branches.push("],");
    leaves.push("],");
    frogs.push("],");
    cats.push("],");
    pills.push("],");

    // Add each entity array to the levelcommands array
    levelcommands = levelcommands.concat(players, ground, dirt, bricks, edges, platforms, beams, trunks, branches, leaves, frogs, cats, pills);

    // Add level name to start
    levelcommands.unshift(`var ${LEVEL_FUNCTION_NAME} = {`);
    // Add closing bracket
    levelcommands.push('};');

    // Combine all the commands into one line to export
    let commands = levelcommands.join('\n');
    
    // Write it to a text file so we can move it to our game!
    fs.writeFile('./level.txt', commands, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
});

/** Code for generating the entity add code */
const generatePlayer = (level, col, row) => {
    console.log('Generating Player.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    players.push(
        `{ x: ${col}, y: ${row} },`
    );
};

/** Code for generating the entity add code */
const generateFrog = (level, col, row, scale, color) => {
    console.log('Generating Frog.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    frogs.push(
        `{ x: ${col}, y: ${row}, scale: ${scale}, color: "${color}" },`
    );
};

/** Code for generating the entity add code */
const generateCat = (level, col, row, scale, chosenOne) => {
    console.log('Generating Cat... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    cats.push(
        `{ x: ${col}, y: ${row}, scale: ${scale}, chosenOne: ${chosenOne} },`
    );
};

/** Code for generating the entity add code */
const generatePill = (level, col, row, scale) => {
    console.log('Generating Pill.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    pills.push(
        `{ x: ${col}, y: ${row}, scale: ${scale} },`
    );
};

/** Code for generating the entity add code */
const generateGround = (level, col, row, size) => {
    console.log('Generating Ground.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    ground.push(
        `{ x: ${col}, y: ${row}, size: ${size} },`
    );
};

/** Code for generating the entity add code */
const generateDirt = (level, col, row, size, type) => {
    console.log('Generating Dirt, Plain.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    dirt.push(
        `{ x: ${col}, y: ${row}, size: ${size}, type: "${type}" },`
    );
};

/** Code for generating the entity add code */
const generateBrick = (level, col, row, size) => {
    console.log('Generating Brick... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    bricks.push(
        `{ x: ${col}, y: ${row}, size: ${size} },`
    );
};

/** Code for generating the entity add code */
const generateEdge = (level, col, row, type) => {
    console.log('Generating Edge, `${Type}`.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    edges.push(
        `{ x: ${col}, y: ${row}, type: "${type}" },`
    );
};

/** Code for generating the entity add code */
const generatePlatform = (level, col, row, size, scale, type, moving, direction, speed) => {
    console.log('Generating Platform, `${Type}`.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    platforms.push(
        `{ x: ${col}, y: ${row}, size: ${size}, scale: ${scale}, type: "${type}", moving: ${moving}, direction: ${direction}, speed: ${speed} },`
    );
};

/** Code for generating the entity add code */
const generateBeam = (level, col, row, size, scale, type ) => {
    console.log('Generating Beam.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    beams.push(
        `{ x: ${col}, y: ${row}, size: ${size}, scale: ${scale}, type: "${type}" },`
    );
};

/** Code for generating the entity add code */
const generateTrunk = (level, col, row, size) => {
    console.log('Generating Trunk.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    trunks.push(
        `{ x: ${col}, y: ${row}, size: ${size} },`
    );
};

/** Code for generating the entity add code */
const generateBranch = (level, col, row, size) => {
    console.log('Generating Branch.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    branches.push(
        `{ x: ${col}, y: ${row}, size: ${size} },`
    );
};

/** Code for generating the entity add code */
const generateLeaves = (level, col, row, size, color) => {
    console.log('Generating Leaves.... at ', col, ' ', row);
    //fill pixel with white
    level.setPixelColor(0x000000, col, row);
    //add the player command to the command array
    leaves.push(
        `{ x: ${col}, y: ${row}, size: ${size}, color: "${color}"},`
    );
};