
Vue.component('ExampleTemplate', {template: `<div class="box"><p> a good trick won't be revealed by the wizard.</p></div>`});

new Vue({
    el: '#app',
    data: {
        characterName: '',
        characterData: {
            level: 1,
            Uebungsbonus: 2,
            Ruestung: 10,
            Initiative: 10,
            Bewegung: 8,
            Leben: 5,
            Mana: 5,
            Ausdauer: 5,
            attributes: {
                Staerke: 1,
                Geschick: 1,
                Konstitution: 1,
                Willskraft: 1,
                Charisma: 1,
                Intelligenz: 1,
                Vitalitaet: 1
            }
        },
        attributeInputs: {
            Staerke: 1,
            Geschick: 1,
            Konstitution: 1,
            Willskraft: 1,
            Charisma: 1,
            Intelligenz: 1,
            Vitalitaet: 1
        },
        abilities: [
            { name: "Akrobatik", baseAttribute: "Staerke", checked: false },
            { name: "Analyse", baseAttribute: "Intelligenz", checked: false },
            { name: "Arkane Kunde", baseAttribute: "Intelligenz", checked: false },
            { name: "Athletik", baseAttribute: "Geschick", checked: false },
            { name: "Einschuechtern", baseAttribute: "Charisma", checked: false },
            { name: "Fingerfaehrtigkeit", baseAttribute: "Geschick", checked: false },
            { name: "Geschichte", baseAttribute: "Intelligenz", checked: false },
            { name: "Greifen", baseAttribute: "Staerke", checked: false },
            { name: "Heilkunde", baseAttribute: "Vitalitaet", checked: false },
            { name: "Heimlichkeit", baseAttribute: "Geschick", checked: false },
            { name: "Naturkunde", baseAttribute: "Intelligenz", checked: false },
            { name: "Religion", baseAttribute: "Intelligenz", checked: false },
            { name: "Taeuschen", baseAttribute: "Charisma", checked: false },
            { name: "Ueberlebenskunst", baseAttribute: "Staerke", checked: false },
            { name: "Ueberzeugen", baseAttribute: "Charisma", checked: false },
            { name: "Wahrnehmen", baseAttribute: "Geschick", checked: false },
            { name: "Werfen", baseAttribute: "Staerke", checked: false }
        ],
        attacks: [
            { name: "attack1", attribute: "Staerke", dice: "d6", itemBonus: 0 },
            { name: "attack2", attribute: "Staerke", dice: "d6", itemBonus: 0 },
            { name: "attack3", attribute: "Staerke", dice: "d6", itemBonus: 0 },
            { name: "attack4", attribute: "Staerke", dice: "d6", itemBonus: 0 }
        ]
    },
    methods: {
        compute() {
            this.computeAllAttributeModifiers();
            this.computeAllBasicValues();
            this.computeAllAbilityModifiers();
            this.computeAllAttacks();
        },
        updateAttribute(attribute) {
            this.characterData.attributes[attribute] = this.getComputedAttribute(attribute);
            this.compute();
        },
        getComputedAttribute(attribute) {
            return Math.floor(this.attributeInputs[attribute] / 10);
        },
        computeAllAttributeModifiers() {
            // No need to update attributes directly, as we are using attributeInputs for raw values
        },
        computeAllBasicValues() {
            this.computeUebungsbonus();
            this.computeRuestung();
            this.computeGeschwindigkeit();
            this.computeBewegungsrate();
            this.computeLeben();
            this.computeMana();
            this.computeAusdauer();
        },
        computeUebungsbonus() {
            this.characterData.Uebungsbonus = 1 + Math.floor(this.characterData.level / 3);
        },
        computeRuestung() {
            this.characterData.Ruestung = 8 + this.characterData.attributes.Konstitution + Math.floor(this.characterData.attributes.Vitalitaet / 2);
        },
        computeGeschwindigkeit() {
            this.characterData.Initiative = 8 + this.characterData.attributes.Geschick + Math.floor(this.characterData.attributes.Vitalitaet / 2);
        },
        computeBewegungsrate() {
            this.characterData.Bewegung = 8;
        },
        computeLeben() {
            this.characterData.Leben = (4 + this.characterData.attributes.Konstitution + Math.floor(this.characterData.attributes.Vitalitaet / 2)) * this.characterData.level;
        },
        computeMana() {
            this.characterData.Mana = (4 + this.characterData.attributes.Intelligenz + Math.floor(this.characterData.attributes.Vitalitaet / 2)) * this.characterData.level;
        },
        computeAusdauer() {
            this.characterData.Ausdauer = (4 + this.characterData.attributes.Geschick + Math.floor(this.characterData.attributes.Vitalitaet / 2)) * this.characterData.level;
        },
        computeAllAbilityModifiers() {
            this.abilities.forEach(ability => {
                this.computeAbilityModifiers(ability);
            });
        },
        computeAbilityModifiers(ability) {
            let attributeVal = this.characterData.attributes[ability.baseAttribute];
            if (ability.checked) {
                attributeVal += this.characterData.Uebungsbonus;
            }
            ability.value = attributeVal;
        },
        computeAllAttacks() {
            this.attacks.forEach(attack => {
                this.computeAttack(attack);
            });
        },
        computeAttack(attack) {
            let attribute = attack.attribute;
            let itemBonus = parseInt(attack.itemBonus);
            attack.hit = this.characterData.Uebungsbonus + itemBonus + this.characterData.attributes[attribute];
            attack.damage = this.characterData.Uebungsbonus + itemBonus + this.characterData.attributes[attribute];
        },
        getAbilityModifier(name, baseAttribute) {
            const ability = this.abilities.find(ability => ability.name === name);
            return ability ? ability.value : 0;
        },
        getAttackHit(attack) {
            return `${attack.hit} + d20`;
        },
        getAttackDamage(attack) {
            return `${attack.damage} + ${attack.dice}`;
        }
    },
    mounted() {
        this.compute();
    }
});
