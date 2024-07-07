// JavaScript source code

function doubleNumber() {
    // Get the input element
    let input = document.getElementById('numberInput');
    // Get the output element
    let output = document.getElementById('output');

    // Parse input value as a number
    let number = parseFloat(input.value);

    // Check if the input is a valid number
    if (!isNaN(number)) {
        // Double the number
        let doubledNumber = number * 2;

        // Display the doubled number in the output field
        output.value = doubledNumber;
    } else {
        // If input is not a valid number, display an error or handle as needed
        output.value = "Invalid input";
    }
}

function ComputeAttributeModifier(AttributeId) {
    // Get the input element
    let input = document.getElementById("Attribute" + AttributeId);
    // Get the output element
    let output = document.getElementById("AttributeModifier" + AttributeId);

    // Parse input value as a number
    let number = parseFloat(input.value);

    // Check if the input is a valid number
    if (!isNaN(number)) {

        // Display the doubled number in the output field
        output.value = Math.floor(number / 10);
    } else {
        // If input is not a valid number, display an error or handle as needed
        output.value = "Invalid input";
    }
}

function ComputeArmorClass(){
    
    //Collect values of all fields that impact AC
        
        //T.B.D.
    placeholderModifier = 2;
    //Do all characters have the same base value?
    baseValue = 12;

    output = document.getElementById('ArmorClass');

    output.value = baseValue + placeholderModifier;
}

function ComputeHealth(){
    //Get vitality
    let inputVitality = document.getElementById('Vitality');
    let vitality = parseFloat(inputVitality.value);

    let inputModifier = document.getElementById('VitalityModifier');
    let vitalityModifier = parseFloat(inputModifier.value);

    //do computation of health from vitality here

    let output = document.getElementById(MaxHealth)

    if (!isNaN(vitality) & !isNaN(vitalityModifier)) {

        // Display the doubled number in the output field
        output.value = 3*(vitality + vitalityModifier);
    } else {
        // If input is not a valid number, display an error or handle as needed
        output.value = "Invalid input";
    }
}


function ComputeInitiative(){
    
    let baseInitiative = 8;

    let inputDexterity = document.getElementById('DexterityModifier')
    let dexterityModifier = parseFloat(inputDexterity.value)

    let initiativeModifier
}


function ComputeMovement(){

    let baseMovement = 10;

    //Collect all fields that impact movement
    let placeholderModifier = 0;

    let output = document.getElementById('Movement')

    output.value = baseMovement + placeholderModifier;
}



//================================================= ABILITY MODIFIER STUFF =================================================

function ComputeAbilityModifier(AttributeId){

    switch(AttributeId){
        case 'Dexterity':
            let input = document.getElementById('AttributeModifier' + AttributeId)
            let outputAcrobatics = document.getElementById('AbilityModifierAcrobatics')
            outputAcrobatics.value = "+" + input.value
    }

}