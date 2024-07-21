/* Logic.js */

Vue.component('ExampleTemplate', { template: `<div class="box"><p> a good trick won't be revealed by the wizard.</p></div>` });

new Vue({
    el: '#app',
    data: {
        currentPage: 'playPage',  // Default page
        characterName: '',
        characterData: {
            level: 1,
            xp: 1,
            inspiration: 0,
            Uebungsbonus: 2,
            Ruestung: 10,
            Initiative: 10,
            Bewegung: 8,
            Leben: 5,
            Mana: 5,
            Ausdauer: 5
        },
        attributes: [
            { name: "Staerke", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 },
            { name: "Geschick", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 },
            { name: "Konstitution", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 },
            { name: "Willskraft", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 },
            { name: "Charisma", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 },
            { name: "Intelligenz", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 },
            { name: "Vitalitaet", inputValue: 0, istGeuebt: false, baseValue: 1, savingThrow: 1 }
        ],
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
        numberOfAttacks: 2,
        attacks: [
            { id: 1, name: "attack1", attribute: "Staerke", dice: "d6", itemBonus: 0 },
            { id: 2, name: "attack2", attribute: "Staerke", dice: "d6", itemBonus: 0 }
        ],
        /*death savingthrows*/
        successes: [false, false, false],
        failures: [false, false, false],
        numberOfItems: 6,
        items: [
            { id: 1, name: "Helm", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 2, name: "Brust", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 3, name: "Schild", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 4, name: "Arme", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 5, name: "Beine", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 6, name: "Schuhe", bonusDimension: "Ruestung", itemBonus: 0 }
        ]
    },
    methods: {
        async fetchData(file, key) {
            try {
                const response = await fetch(`/${file}`);
                const data = await response.json();
                this[key] = data;
            } catch (error) {
                console.error(`Failed to load ${file}:`, error);
            }
        },
        compute() {
            /*changes in the attribute trigger the updateAttribute function. Therefore this "this.computeAllAttributes();" is not necessary.*/
            this.computeAllBasicValues();
            this.computeAllAbilityModifiers();
            this.computeAllAttacks();
        },
        /*ATTRIBUTES*/
        computeAllAttributes() {
            for (let attribute in this.attributes) {
                this.updateAttribute(attribute);
            }
        },
        updateAttribute(attribute) {
            attribute.baseValue = this.computeAttributeBaseValue(attribute);
            attribute.savingThrow = this.computeAttributeSavingThrow(attribute);
            this.compute();
        },
        computeAttributeBaseValue(attribute) {
            return Math.floor(attribute.inputValue / 10);
        },
        computeAttributeSavingThrow(attribute) {
            if (attribute.istGeuebt) {
                return attribute.baseValue + this.characterData.Uebungsbonus;
            } else {
                return attribute.baseValue;
            }
        },
        getAttributeFromName(name) {
            return this.attributes.find(attr => attr.name === name);
        },
        /*BASIC VALUES*/
        computeAllBasicValues() {
            this.computeLevel();
            this.computeUebungsbonus();
            this.computeRuestung();
            this.computeGeschwindigkeit();
            this.computeBewegungsrate();
            this.computeLeben();
            this.computeMana();
            this.computeAusdauer();
        },
        computeLevel() {
            this.characterData.level = Math.floor((3250 + Math.sqrt(Math.max(1150 * this.characterData.xp - 785000, 0))) / 1150);
        },
        computeUebungsbonus() {
            this.characterData.Uebungsbonus = 1 + Math.floor(this.characterData.level / 3);
        },
        computeRuestung() {
            let bonusRuestungTemp = 0;
            for (let item of this.items) {
                if (item.bonusDimension === "Ruestung") {
                    bonusRuestungTemp += Number(item.itemBonus);
                }
            }
            this.characterData.Ruestung = 8 + this.getAttributeFromName("Konstitution").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2) + bonusRuestungTemp;
        },
        computeGeschwindigkeit() {
            this.characterData.Initiative = 8 + this.getAttributeFromName("Geschick").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2);
        },
        computeBewegungsrate() {
            this.characterData.Bewegung = 8 + this.getAttributeFromName("Geschick").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2);
        },
        computeLeben() {
            this.characterData.Leben = (4 + this.getAttributeFromName("Konstitution").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2)) * this.characterData.level;
        },
        computeMana() {
            this.characterData.Mana = (4 + this.getAttributeFromName("Intelligenz").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2)) * this.characterData.level;
        },
        computeAusdauer() {
            this.characterData.Ausdauer = (4 + this.getAttributeFromName("Geschick").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2)) * this.characterData.level;
        },
        /*ABILITLIES*/
        computeAllAbilityModifiers() {
            this.abilities.forEach(ability => {
                this.computeAbilityModifiers(ability);
            });
        },
        computeAbilityModifiers(ability) {
            let attributeVal = this.getAttributeFromName(ability.baseAttribute).baseValue;
            if (ability.checked) {
                attributeVal += this.characterData.Uebungsbonus;
            }
            ability.value = attributeVal;
        },
        /*ATTACKS*/
        computeAllAttacks() {
            this.attacks.forEach(attack => {
                this.computeAttack(attack);
            });
        },
        computeAttack(attack) {
            let attribute = attack.attribute;
            let itemBonus = parseInt(attack.itemBonus);
            attack.hit = this.characterData.Uebungsbonus + itemBonus + this.getAttributeFromName(attribute).baseValue;
            attack.damage = this.characterData.Uebungsbonus + itemBonus + this.getAttributeFromName(attribute).baseValue;
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
        },
        addAttack() {
            this.numberOfAttacks = this.numberOfAttacks + 1;
            newId = this.numberOfAttacks;
            this.attacks.push({ id: newId, name: `Attack ${newId}`, attribute: "Staerke", dice: "d6", itemBonus: 0, count: 0 });
        },
        removeAttack(attackId) {
            this.attacks = this.attacks.filter(attack => attack.id !== attackId);
        },
        /*ITEMS*/
        addItem() {
            this.numberOfItems = this.numberOfItems + 1;
            newId = this.numberOfItems;
            this.items.push({ id: newId, name: `Item ${newId}`, bonusDimension: "Staerke", itemBonus: 0, count: 0 });
        },
        removeItem(itemId) {
            this.items = this.items.filter(items => items.id !== itemId);
        }

    },
    mounted() {
        this.compute();
    }
});
/*end of Logic.js*/