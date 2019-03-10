/* eslint-env browser */
/* eslint no-unused-vars: "off" */

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
  

let baseClasses = [
    'ace',
    'aegis',
    'assassin',
    'assault',
    'barricade',
    'bastion',
    'berserker',
    'bombard',
    'breacher',
    'cataphract',
    'demolisher',
    'engineer',
    'hive',
    'hornet',
    'marker',
    'operator',
    'pyro',
    'rainmaker',
    'ronin',
    'scourer',
    'seeder',
    'sentinel',
    'sniper',
    'spectre',
    'support',
    'technical'
];

let difficultyTemplates = [
    ['grunt', 0.25, 6, 1],
    ['basic', 1, 3, 2], // no template
    ['elite', 1, 2, 3],
    ['ultra', 4, 1, 4]
];


function parseCSV(text) {
	let lines = text.trim().split("\r\n");
	let tokenLines = lines.map(line => line.split(","));
	let colNames = tokenLines[0];
	let dataLines = tokenLines.slice(1);
	let objects = dataLines.map(tokens => {
		let result = {};
		for (let [i,value] of tokens.entries())
			result[colNames[i]] = value;
		return result;
	});
	let result = {};
	for (let object of objects)
		result[object["Class"].toLowerCase()] = object;
	return result;
}

async function loadCSV() {
	let response = await fetch("ClassSystems.csv");
	let text = await response.text();
	return text;
}

let classData;
$(async() => {
	classData = parseCSV(await loadCSV());
});

function generateNPC(tier) {
    let npcClass = baseClasses.random();
    let [difficulty, pointsCost, maxAmount, optSysCount] = difficultyTemplates.random();

    let nameString = ('tier ' + tier + ' ' + difficulty + ' ' + npcClass).toUpperCase();
	let data = classData[npcClass];
	let baseString = [data.Basic1, data.Basic2, data.Basic3].filter(s => s != "-").join(";\n");

    let amount = randomInt(1, maxAmount);

    pointsCost = pointsCost * amount;

    let output = [amount, nameString, baseString];
    
    return [pointsCost, output];
}

function generateEncounter(playerCount, partyLevel) {
    // Set tier based on player level: 1 for levels 0-4, 2 for levels 5-8, 3 for levels 9-12
    let tier = partyLevel < 5 ? 1 : partyLevel < 9 ? 2 : 3;

    let npcs = [];

    while (playerCount > 0) {

        let pointsCost, newNPC;

        while (!pointsCost || pointsCost > playerCount) {
            [pointsCost, newNPC] = generateNPC(tier);
        }
        playerCount -= pointsCost;
        npcs.push(newNPC);
    }

    return npcs;

}