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
        gewaehlteklasse: "Held",
        heroClasses: [
            { id: 0, name: "Held", minimumlevel: 0, Staerke: 0, Geschick: 0, Vitalitaet: 0, Konstitution: 0, Intelligenz: 0, Willskraft: 0, Charisma: 0, free: 5 },
            { id: 1, name: "Krieger", minimumlevel: 2, Staerke: 1, Geschick: 0, Vitalitaet: 1, Konstitution: 1, Intelligenz: 0, Willskraft: 1, Charisma: 0, free: 2 },
            { id: 2, name: "Ranger", minimumlevel: 2, Staerke: 0, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 0, Willskraft: 1, Charisma: 0, free: 2 },
            { id: 3, name: "Magier", minimumlevel: 2, Staerke: 1, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 1, Willskraft: 1, Charisma: 1, free: 2 },
            { id: 4, name: "Supporter", minimumlevel: 2, Staerke: 1, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 1, Willskraft: 1, Charisma: 1, free: 2 },
            { id: 5, name: "Ritter ", minimumlevel: 8, Staerke: 1, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 1, Willskraft: 1, Charisma: 1, free: 5 },
            { id: 6, name: "Waldlaufer", minimumlevel: 8, Staerke: 1, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 1, Willskraft: 1, Charisma: 1, free: 5 },
            { id: 7, name: "Erzmagier", minimumlevel: 8, Staerke: 1, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 1, Willskraft: 1, Charisma: 1, free: 5 },
            { id: 8, name: "Barde", minimumlevel: 8, Staerke: 1, Geschick: 1, Vitalitaet: 1, Konstitution: 1, Intelligenz: 1, Willskraft: 1, Charisma: 1, free: 5 },
        ],
        attributes: [
            { name: "Staerke", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
            { name: "Geschick", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
            { name: "Vitalitaet", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
            { name: "Konstitution", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
            { name: "Intelligenz", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
            { name: "Willskraft", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
            { name: "Charisma", inputValue: 0, istGeuebt: false, baseValue: 0, savingThrow: 0 },
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
            { id: 1, name: "attack1", attribute: "Staerke", dice: "d6", itemBonus: 0, Uebungsbonus: true },
            { id: 2, name: "attack2", attribute: "Staerke", dice: "d6", itemBonus: 0, Uebungsbonus: true }
        ],
        /*death savingthrows*/
        successes: [false, false, false],
        failures: [false, false, false],
        /*item logic*/
        numberOfItems: 2,
        items: [
            { id: 1, name: "Normale Kleidung", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 2, name: "Barfuss", bonusDimension: "Bewegung", itemBonus: -1 },
        ],
        numberOfItemsInShop: 6,
        itemsShop: [
            { id: 1, name: "Normale Kleidung", bonusDimension: "Ruestung", itemBonus: 0 },
            { id: 2, name: "Stoffruestung", bonusDimension: "Ruestung", itemBonus: 1 },
            { id: 3, name: "Lederruestung", bonusDimension: "Ruestung", itemBonus: 2 },
            { id: 4, name: "Kettenhemd", bonusDimension: "Ruestung", itemBonus: 3 },
            { id: 5, name: "Plattenruestung", bonusDimension: "Ruestung", itemBonus: 4 },            
            { id: 6, name: "Barfuss", bonusDimension: "Bewegung", itemBonus: -1 },
            { id: 8, name: "LederSchuhe", bonusDimension: "Bewegung", itemBonus: 1 },
        ],
        itemDimensions: [
            { name: "Ruestung" },
            { name: "Bewegung" }
        ],
        selectedShopItemId: null
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
        getRemainingAttributePoints() {
            let usedPoints = 0;
            for (let key in this.attributes) {
                let attribute = this.attributes[key];
                // Ensure that attribute.inputValue is a number
                let inputValue = parseFloat(attribute.inputValue) || 0;
                usedPoints += inputValue;
            }
            usedPoints = this.computeMaximumPoints() - usedPoints;
            return usedPoints;
        },
        computeMaximumPoints() {
            return 40 + this.characterData.level * 5;
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
            let bonusBewegungTemp = 0;
            for (let item of this.items) {
                if (item.bonusDimension === "Bewegung") {
                    bonusBewegungTemp += Number(item.itemBonus);
                }
            }
            this.characterData.Bewegung = 8 + this.getAttributeFromName("Geschick").baseValue + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue / 2) + bonusBewegungTemp;
        },
        computeLeben() {
            this.characterData.Leben = (10 + this.getAttributeFromName("Vitalitaet").inputValue * 3 + Math.floor(this.getAttributeFromName("Vitalitaet").baseValue * 4));
        },
        computeMana() {
            this.characterData.Mana = (10 + this.getAttributeFromName("Willskraft").inputValue * 3 + Math.floor(this.getAttributeFromName("Willskraft").baseValue * 4));
        },
        computeAusdauer() {
            this.characterData.Ausdauer = (10 + this.getAttributeFromName("Konstitution").inputValue * 3 + this.getAttributeFromName("Konstitution").baseValue * 4);
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
            if (attack.Uebungsbonus == true) {
                itemBonus = itemBonus + this.characterData.Uebungsbonus;
            }
            attack.hit = this.getAttributeFromName(attribute).baseValue + itemBonus;
            attack.damage = this.getAttributeFromName(attribute).baseValue + itemBonus;
        },
        getAbilityModifier(name, baseAttribute) {
            const ability = this.abilities.find(ability => ability.name === name);
            return ability ? ability.value : 0;
        },
        getAttackHit(attack) {
            return `d20 + ${attack.hit}`;
        },
        getAttackDamage(attack) {
            return `${attack.dice} + ${attack.damage}`;
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

        addItemFromShop() {
            this.numberOfItems = this.numberOfItems + 1;
            const shopItem = this.itemsShop.find(item => item.id === this.selectedShopItemId);
            if (shopItem) {
                const newItem = { ...shopItem };
                this.items.push(newItem);
            }
            this.selectedShopItemId = null; // Reset the dropdown selection
            this.compute()
        },
        removeItem(itemId) {
            this.numberOfItems = this.numberOfItems - 1;
            this.items = this.items.filter(items => items.id !== itemId);
            this.compute()
        },
        /*ITEM SHOP*/
        
        addItemToShop() {
            this.numberOfItemsInShop = this.numberOfItemsInShop + 1;
            newId = this.numberOfItemsInShop;
            this.itemsShop.push({ id: newId, name: `Item ${newId}`, bonusDimension: "Staerke", itemBonus: 0, count: 0 });
        },
        removeItemFromShop(itemId) {
            this.numberOfItemsInShop = this.numberOfItemsInShop - 1;
            this.itemsShop = this.itemsShop.filter(items => items.id !== itemId);
        }
    },
    mounted() {
        this.compute();
    }
});
/*end of Logic.js*/