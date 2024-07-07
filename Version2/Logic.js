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
    Staerke: 1,
    Geschick: 1,
    Konstitution: 1,
    Willskraft: 1,
    Charisma: 1,
    Intelligenz: 1,
    Weissheit: 1,
    Vitalitaet: 1
};

//Generate the html:
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
        <label for="characterName">Character Level:</label>
        <input onchange="Compute()" type="number" id="level-input" name="level" value="1">
        <output type="text" id="level-out" readonly></output>
    </div>`;
}
function createBody() {
    return `
    <div class="box">
        <div class="row">`
        + createAllAttributes()
        + createAllAbilities()
        + createAllBasicValues()
        + `
        </div>
    </div>`;
}
function createAllAttributes() {
    return `
    <div class="box">
        <div class="column">`
        + createSingleAttributeBox(`Staerke`)
        + createSingleAttributeBox(`Geschick`)
        + createSingleAttributeBox(`Konstitution`)
        + createSingleAttributeBox(`Willskraft`)
        + createSingleAttributeBox(`Charisma`)
        + createSingleAttributeBox(`Intelligenz`)
        + createSingleAttributeBox(`Weissheit`)
        + createSingleAttributeBox(`Vitalitaet`)
        + `
        </div>
    </div>`;
}
function createSingleAttributeBox(attribute) {
    return `
    <div class="box">
        <div class="column">
            <label for="characterName">${attribute}:</label>
            <output class="styled-output" type="text" id="${attribute}-out" readonly></output>
            <input onchange="Compute()" type="number" id="${attribute}-input" name="level" value="1">
        </div>
    </div>
    `;
}
function createAllAbilities() {
    return `
    <div class="box">
        <div class="column">`
         + createSingleAbility("Akrobatik", "Staerke")
         + createSingleAbility("Analyse", "Intelligenz")
         + createSingleAbility("Arkane Kunde", "Intelligenz")
         + createSingleAbility("Athletik", "Geschick")
         + createSingleAbility("Einschuechtern", "Charisma")
         + createSingleAbility("Fingerfaehrtigkeit", "Geschick")
         + createSingleAbility("Geschichte", "Intelligenz")
         + createSingleAbility("Greifen", "Staerke")
         + createSingleAbility("Heilkunde", "Vitalitaet")
         + createSingleAbility("Heimlichkeit", "Geschick")
         + createSingleAbility("Naturkunde", "Intelligenz")
         + createSingleAbility("Religion", "Intelligenz")
         + createSingleAbility("Taeuschen", "Charisma")
         + createSingleAbility("Ueberlebenskunst", "Staerke")
         + createSingleAbility("Ueberzeugen", "Charisma")
         + createSingleAbility("Wahrnehmen", "Geschick")
         + createSingleAbility("Werfen", "Staerke")
        + `
        </div>
    </div >`;
}
function createSingleAbility(ability, baseAttribute) {
    return `
    <div class="box">
        <div class="row">
            <input type="checkbox" onchange="Compute()" id="checkbox${ability}" name="option1">
            <label>${ability}:  </label>
            <output class="styled-output" type="text" id="${ability}-out" readonly></output>
        </div >
    </div>`;
}
function createAllBasicValues() {
    return `
    <div class="box">
        <div class="row">`
        + createSingleBasicValue(`Uebungsbonus`)
        + createSingleBasicValue(`Ruestung`)
        + createSingleBasicValue(`Geschwindigkeit`)
        + `
        </div>
        <div class="row">`
        + createSingleBasicValue(`Leben`)
        + createSingleBasicValue(`Mana`)
        + createSingleBasicValue(`Ausdauer`)
        + `
        </div>
    </div >`;
}
function createSingleBasicValue(basicValue) {
    return `
    <div class="box">
        <div class="column">
            <label for="characterName">${basicValue}:</label>
            <output class="styled-output" type="text" id="${basicValue}-out" readonly></output>
        </div>
    </div>`;
}
//logic
function Compute() {
    let level = parseInt(document.getElementById("level-input").value);
    document.getElementById("level-out").value = level; // Correct assignment for value property
    characterData.level = level; // put into global data
    ComputeAllAttributeModifiers();
    ComputeAllBasicValues();
    ComputeAllAbilityModifiers();
}
function ComputeAllAttributeModifiers() {
    ComputeAttributeModifiers(`Staerke`);
    ComputeAttributeModifiers(`Geschick`);
    ComputeAttributeModifiers(`Konstitution`);
    ComputeAttributeModifiers(`Willskraft`);
    ComputeAttributeModifiers(`Charisma`);
    ComputeAttributeModifiers(`Intelligenz`);
    ComputeAttributeModifiers(`Weissheit`);
    ComputeAttributeModifiers(`Vitalitaet`);
}
function ComputeAttributeModifiers(attribute) {
    let attributeVal = parseInt(document.getElementById(`${attribute}-input`).value);
    document.getElementById(`${attribute}-out`).value = Math.floor(attributeVal / 10); // Correct assignment for value property    
    characterData[attribute] = Math.floor(attributeVal / 10);
}
function ComputeAllBasicValues() {
    ComputeUebungsbonus();
    ComputeRuestung();
    ComputeGeschwingigkeit();
    ComputeLeben();
    ComputeMana();
    ComputeAusdauer();
}
function ComputeUebungsbonus() {
    let attributeVal = 0;
    attributeVal = 1 + Math.floor(characterData[`level`] / 4);
    characterData["Uebungsbonus"] = attributeVal;
    document.getElementById(`Uebungsbonus-out`).value = attributeVal;
}
function ComputeRuestung() {
    let attributeVal = 0;
    attributeVal = 8 + characterData[`Konstitution`] + Math.floor(characterData[`Vitalitaet`] / 2);
    characterData["Ruestung"] = attributeVal;
    document.getElementById(`Ruestung-out`).value = attributeVal;
}
function ComputeGeschwingigkeit() {
    let attributeVal = 0;
    attributeVal = 8 + characterData[`Geschick`] + Math.floor(characterData[`Vitalitaet`] / 2);
    characterData["Geschwindigkeit"] = attributeVal;
    document.getElementById(`Geschwindigkeit-out`).value = attributeVal;
}
function ComputeLeben() {
    let attributeVal = 0;
    attributeVal = (4 + characterData[`Konstitution`] + Math.floor(characterData[`Vitalitaet`] / 2)) * characterData[`level`];
    characterData["Leben"] = attributeVal;
    document.getElementById(`Leben-out`).value = attributeVal;
}
function ComputeMana() {
    let attributeVal = 0;
    attributeVal = (4 + characterData[`Intelligenz`] + Math.floor(characterData[`Weissheit`] / 2)) * characterData[`level`];
    characterData["Mana"] = attributeVal;
    document.getElementById(`Mana-out`).value = attributeVal;
}
function ComputeAusdauer() {
    let attributeVal = 0;
    attributeVal = (4 + characterData[`Geschick`] + Math.floor(characterData[`Vitalitaet`] / 2)) * characterData[`level`];
    characterData["Ausdauer"] = attributeVal;
    document.getElementById(`Ausdauer-out`).value = attributeVal;
}

function ComputeAllAbilityModifiers() {
    ComputeAbilityModifiers("Akrobatik", "Staerke");
    ComputeAbilityModifiers("Analyse", "Intelligenz");    
    ComputeAbilityModifiers("Arkane Kunde", "Intelligenz");
    ComputeAbilityModifiers("Athletik", "Geschick");   
    ComputeAbilityModifiers("Einschuechtern", "Charisma");
    ComputeAbilityModifiers("Fingerfaehrtigkeit", "Geschick");
    ComputeAbilityModifiers("Geschichte", "Intelligenz");
    ComputeAbilityModifiers("Greifen", "Staerke");
    ComputeAbilityModifiers("Heilkunde", "Vitalitaet");
    ComputeAbilityModifiers("Heimlichkeit", "Geschick");
    ComputeAbilityModifiers("Naturkunde", "Intelligenz");
    ComputeAbilityModifiers("Religion", "Intelligenz");
    ComputeAbilityModifiers("Taeuschen", "Charisma");
    ComputeAbilityModifiers("Ueberlebenskunst", "Staerke");
    ComputeAbilityModifiers("Ueberzeugen", "Charisma");
    ComputeAbilityModifiers("Wahrnehmen", "Geschick");
    ComputeAbilityModifiers("Werfen", "Staerke");  
}
function ComputeAbilityModifiers(ability, attribute) {
    let attributeVal = characterData[attribute];
    let checkbox = document.getElementById(`checkbox${ability}`);
    if (checkbox.checked) {
        attributeVal += characterData["Uebungsbonus"];
    }
    document.getElementById(`${ability}-out`).value = attributeVal; // Correct assignment for value property    
}
//linking between the html and java script for initial call
function insertCharacterSheet() {
    const container = document.getElementById('CharacterPage');
    container.innerHTML = createPage();
}
// Call the function to insert the CharacterSheet box when the page loads
document.addEventListener('DOMContentLoaded', insertCharacterSheet);
