import SippyPup from './SippyPup.js';

class SippyPupStables {
    constructor() {
        const hankyPanky = new SippyPup("hanky panky Head Shot.png", "Hanky Panky", false);
        const lyn = new SippyPup("Lyn_Mame_Test.jpg", "Lyn Mametchi", false);
        const palmesan = new SippyPup("Palmesan.png", "Palmesan", false);
        const lily = new SippyPup("Lily.png", "Lily", false);
        const lynko = new SippyPup("Lynko.png", "Lynko", true);

        const airMail = new SippyPup("Air Mail.png", "Air Mail", false);
        const aviation = new SippyPup("Aviation.png", "Aviation", false);
        const bleedBlue = new SippyPup("Bleed Blue.png", "Bleed Blue", false);
        const corpseReviver = new SippyPup("Corpse Reviver.png", "Corpse Reviver", false);
        const dragonFruitSangria = new SippyPup("Dragon Fruit Sangria.png", "Dragon Fruit Sangria", false);
        const mermaidWaterSangria = new SippyPup("Mermaid Water Sangria.png", "Mermaid Water Sangria", false);
        const miamiVice = new SippyPup("Miami Vice.png", "Miami Vice", false);
        const nakedFamous = new SippyPup("Naked & Famous.png", "Naked & Famous", false);
        const pancakeMild = new SippyPup("Pancake Milk.png", "Pancake Milk", false);
        const pimmsCup = new SippyPup("Pimm's Cup.png", "Pimm's Cup", false);
        const rootBeer = new SippyPup("Root Beer.png", "Root Beer", false);
        const thickWater = new SippyPup("Thick Water.png", "Thick Water", false);
        const tiPunch = new SippyPup("Ti Punch.png", "Ti Punch", false);
        const watermelonDaiquri = new SippyPup("Watermelon Daiquri.png", "Watermelon Daiquri", false);

        this.SippyPupList = [
            hankyPanky,
            lyn,
            palmesan,
            lily,
            lynko,
            airMail,
            aviation,
            bleedBlue,
            corpseReviver,
            dragonFruitSangria,
            mermaidWaterSangria,
            miamiVice,
            nakedFamous,
            pancakeMild,
            pimmsCup,
            rootBeer,
            thickWater,
            tiPunch,
            watermelonDaiquri
        ];
    }
}

export const SippyPupList = new SippyPupStables().SippyPupList;
export default SippyPupStables;
