// JavaScript source code


// Global data structure
const characterData = {
    level: 1,
    //basic values
    Uebungsbonus: 2,
    Ruestung: 10,
    Geschwindigkeit: 10,
    Leben: 5,
    Mana: 5,
    Ausdauer: 5,
    //Attributes:
    attributes: {
        Staerke: 1,
        Geschick: 1,
        Konstitution: 1,
        Willskraft: 1,
        Charisma: 1,
        Intelligenz: 1,
        Vitalitaet: 1
    },
};
const abilities = [
    { name: "Akrobatik", baseAttribute: "Staerke" },
    { name: "Analyse", baseAttribute: "Intelligenz" },
    { name: "Arkane Kunde", baseAttribute: "Intelligenz" },
    { name: "Athletik", baseAttribute: "Geschick" },
    { name: "Einschuechtern", baseAttribute: "Charisma" },
    { name: "Fingerfaehrtigkeit", baseAttribute: "Geschick" },
    { name: "Geschichte", baseAttribute: "Intelligenz" },
    { name: "Greifen", baseAttribute: "Staerke" },
    { name: "Heilkunde", baseAttribute: "Vitalitaet" },
    { name: "Heimlichkeit", baseAttribute: "Geschick" },
    { name: "Naturkunde", baseAttribute: "Intelligenz" },
    { name: "Religion", baseAttribute: "Intelligenz" },
    { name: "Taeuschen", baseAttribute: "Charisma" },
    { name: "Ueberlebenskunst", baseAttribute: "Staerke" },
    { name: "Ueberzeugen", baseAttribute: "Charisma" },
    { name: "Wahrnehmen", baseAttribute: "Geschick" },
    { name: "Werfen", baseAttribute: "Staerke" },
];

//HTML
//HTML: Structure
function createPage() {
    return `
    <div class="character-sheet">
        <div class="box">
            <div class="column">`
            + createHeader()
            + createBody()        
            + `
            </div>
        </div>
    </div>`;
}
function createHeader(){
    return `
    <div class="box">
        <div class="row">`
        + createCharacterName()
        + createCharacterLevel()
        + `
        </div>
    </div>`;
}
function createCharacterName() {
    return `<div class="box">
        <label for="characterName">Character Name:</label>
        <input type="text" id="characterName" name="characterName">
    </div>`;
}
function createCharacterLevel() {
    return `<div class="box">
        <label for="characterName">Character Level:</label>`
        + createInput("level")
        +`<output style="font-size: 1px;" id="level-out">
    </div>`;
}
function createBody() {
    return `
    <div class="box">
        <div class="row">`
        + createAllAttributes()
        + createAllAbilities()
        + `<div class="box">`
            + createAllBasicValues()
            + createAllAttacks()
        + `</div>`
        + `
        </div>
    </div>`;
}

//HTML: Attributes
function createAllAttributes() {
    const attributesList = Object.keys(characterData.attributes);
    return `
    <div class="box">
        <div class="column">`
        + attributesList.map(attribute => createSingleAttributeBox(attribute)).join('')
        + `
        </div>
    </div>`;
}
function createSingleAttributeBox(attribute) {
    return `
    <div class="box attribute">
        <div class="column">
            <label for="characterName">${attribute}:</label>`
            + createOutput(attribute)
            + createInput(attribute)
            +`
        </div>
    </div>
    `;
}

//HTML: Abilities
function createAllAbilities() {
    return `
    <div class="box">
        <div class="column">`
        + abilities.map(abilities => createSingleAbility(abilities.name, abilities.baseAttribute)).join('')
        + `
        </div>
    </div >`;
}
function createSingleAbility(ability, baseAttribute) {
    return `
    <div class="box basicValue">
        <div class="row">
            <input maxlength="5" type="checkbox" onchange="Compute()" id="checkbox${ability}" name="option1">
            <label>${ability} (${baseAttribute}):  </label>`
        + createOutput(ability)
            +`
        </div >
    </div>`;
}

//HTML: BasicValues
function createAllBasicValues() {
    return `
    <div class="box">
        <div class="row">`
        + createConstantBasicValue(`Uebungsbonus`)
        + createConstantBasicValue(`Ruestung`)
        + createConstantBasicValue(`Geschwindigkeit`)
        + `
        </div>
        <div class="row">`
        + createDynamicBasicValue(`Leben`)
        + createDynamicBasicValue(`Mana`)
        + createDynamicBasicValue(`Ausdauer`)
        + `
        </div>
    </div >`;
}
function createConstantBasicValue(basicValue) {
    return `
    <div class="box basicValue">
        <div class="column">
            <label for="characterName">${basicValue}:</label>`
            + createOutput(basicValue)
            +`
        </div>
    </div>`;
}
function createDynamicBasicValue(basicValue) {
    return `
    <div class="box basicValue">
        <div class="column">
            <label for="characterName">${basicValue}:</label>`
            + createOutput(basicValue)
            +`<output class="output" readonly>_____</output>
        </div>
    </div>`;
}

//HTML: Attacks
function createAllAttacks() {
    return createSingleAttack("attack1")
        + createSingleAttack("attack2")
    + createSingleAttack("attack3")
    + createSingleAttack("attack4");
}
function createSingleAttack(name) {
    return `
        <div class="box">
        
    <div class="row">
            <div class="row">
                ${createAttributeDropdown(name)}
            </div>
            <div class="row">
                ${createDiceDropdown(name)}
            </div>
            <div class="row">`
            + createInput(name + "-itemBonus")
            +`</div>
            <div class="column">
                <label>HIT:</label>
                `+ createOutput(name + "-bonus") +`
            </div>
            <div class="column">
                <label>DMG:</label>
                `+ createOutput(name + "-damage") +`
            </div>
        </div>
    </div>`;
}

//HTML: single elements
function createInput(name) {
    return `<input class="input" onchange="Compute()" type="number" id="${name}-input" value="1"></input>`;
}
function createOutput(name) {
    return `<output class="output" type="text" id="${name}-out"></output>`;
}
function createDiceDropdown(name) {
    const diceOptions = ["d4", "d6", "d8", "d10", "d12", "d20"];
    return `
    <select id="${name}-dice-dropdown" onchange="Compute()">
        ${diceOptions.map(dice => `<option value="${dice}">${dice}</option>`).join('')}
    </select>`;
}
function createAttributeDropdown(name) {
    const attributesList = Object.keys(characterData.attributes);
    return `
    <select id="${name}-attribute-dropdown" onchange="Compute()">
        ${attributesList.map(attribute => `<option value="${attribute}">${attribute}</option>`).join('')}
    </select>`;
}

//logic
function Compute() {
    let level = parseInt(document.getElementById("level-input").value);
    document.getElementById("level-out").value = level; // Correct assignment for value property
    characterData.level = level; // put into global data
    ComputeAllAttributeModifiers();
    ComputeAllBasicValues();
    ComputeAllAbilityModifiers();
    ComputeAllAttacks();
}

//logic: attributes
function ComputeAllAttributeModifiers() {
    const attributesList = Object.keys(characterData.attributes);
    attributesList.forEach(attribute => ComputeAttributeModifiers(attribute));
}
function ComputeAttributeModifiers(attribute) {
    let attributeVal = parseInt(document.getElementById(`${attribute}-input`).value);
    document.getElementById(`${attribute}-out`).value = Math.floor(attributeVal / 10); // Correct assignment for value property    
    characterData.attributes[attribute] = Math.floor(attributeVal / 10);
}

//logic: basic values
function ComputeAllBasicValues() {
    ComputeUebungsbonus();
    ComputeRuestung();
    ComputeGeschwingigkeit();
    ComputeLeben();
    ComputeMana();
    ComputeAusdauer();
}
function ComputeUebungsbonus() {
    let attributeVal = 1 + Math.floor(characterData[`level`] / 3);
    characterData["Uebungsbonus"] = attributeVal;
    document.getElementById(`Uebungsbonus-out`).value = attributeVal;
}
function ComputeRuestung() {
    let attributeVal = 0;
    attributeVal = 8 + characterData.attributes[`Konstitution`] + Math.floor(characterData.attributes[`Vitalitaet`] / 2);
    characterData["Ruestung"] = attributeVal;
    document.getElementById(`Ruestung-out`).value = attributeVal;
}
function ComputeGeschwingigkeit() {
    let attributeVal = 0;
    attributeVal = 8 + characterData.attributes[`Geschick`] + Math.floor(characterData.attributes[`Vitalitaet`] / 2);
    characterData["Geschwindigkeit"] = attributeVal;
    document.getElementById(`Geschwindigkeit-out`).value = attributeVal;
}
function ComputeLeben() {
    let attributeVal = 0;
    attributeVal = (4 + characterData.attributes[`Konstitution`] + Math.floor(characterData.attributes[`Vitalitaet`] / 2)) * characterData[`level`];
    characterData["Leben"] = attributeVal;
    document.getElementById(`Leben-out`).value = attributeVal;
}
function ComputeMana() {
    let attributeVal = 0;
    attributeVal = (4 + characterData.attributes[`Intelligenz`] + Math.floor(characterData.attributes[`Vitalitaet`] / 2)) * characterData[`level`];
    characterData["Mana"] = attributeVal;
    document.getElementById(`Mana-out`).value = attributeVal;
}
function ComputeAusdauer() {
    let attributeVal = 0;
    attributeVal = (4 + characterData.attributes[`Geschick`] + Math.floor(characterData.attributes[`Vitalitaet`] / 2)) * characterData[`level`];
    characterData["Ausdauer"] = attributeVal;
    document.getElementById(`Ausdauer-out`).value = attributeVal;
}

//logic: abilities
function ComputeAllAbilityModifiers() {
        abilities.forEach(ability => ComputeAbilityModifiers(ability.name, ability.baseAttribute));
}
function ComputeAbilityModifiers(ability, attribute) {
    let attributeVal = characterData.attributes[attribute];
    let checkbox = document.getElementById(`checkbox${ability}`);
    if (checkbox.checked) {
        attributeVal += characterData["Uebungsbonus"];
    }
    document.getElementById(`${ability}-out`).value = attributeVal; // Correct assignment for value property    
}

//logic: attacks
function ComputeAllAttacks() {
    ComputeAttack("attack1");
    ComputeAttack("attack2");
    ComputeAttack("attack3");
    ComputeAttack("attack4");
}
function ComputeAttack(name) {
    let attribute = document.getElementById(`${name}-attribute-dropdown`).value;
    let dice = document.getElementById(`${name}-dice-dropdown`).value;
    let itemBonus = parseInt(document.getElementById(`${name}-itemBonus-input`).value);
    let hit = characterData.Uebungsbonus + itemBonus + characterData.attributes[attribute];
    let dmg = characterData.Uebungsbonus + itemBonus + characterData.attributes[attribute];
    document.getElementById(`${name}-bonus-out`).value = " " + hit + " + d20";
    document.getElementById(`${name}-damage-out`).value = " " + dmg + " + " + dice;    
}

//linking between the html and java script for initial call
function insertCharacterSheet() {
    const container = document.getElementById('CharacterPage');
    container.innerHTML = createPage();
}


// Call the function to insert the CharacterSheet box when the page loads
document.addEventListener('DOMContentLoaded', insertCharacterSheet);
