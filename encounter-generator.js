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
  

var baseClasses = [
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

var difficultyTemplates = [
    ['grunt', 0.25, 6],
    ['basic', 1, 3], // no template
    ['elite', 1, 2],
    ['ultra', 4, 1]
];

function generateNPC(tier) {
    let npcClass = baseClasses.random();
    let [difficulty, pointsCost, maxAmount] = difficultyTemplates.random();

    let outString = ('tier ' + tier + ' ' + difficulty + ' ' + npcClass).toUpperCase();

    let amount = randomInt(1, maxAmount);

    pointsCost = pointsCost * amount;

    let output = [amount, outString];
    
    return [pointsCost, output];
}

function generateEncounter(playerCount, partyLevel) {
    // Set tier based on player level: 1 for levels 0-4, 2 for levels 5-8, 3 for levels 9-12
    var tier = partyLevel < 5 ? 1 : partyLevel < 9 ? 2 : 3;

    var npcs = [];

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