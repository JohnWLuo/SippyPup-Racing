import SippyPup from './SippyPup.js';

class SippyPupStables {
    constructor() {
        const hankyPanky = new SippyPup("hanky panky Head Shot.png", "Hanky Panky", false);
        const lyn = new SippyPup("Lyn_Mame_Test.jpg", "Lyn Mametchi", false);
        const palmesan = new SippyPup("Palmesan.png", "Palmesan", false);

        this.SippyPupList = [hankyPanky, lyn, palmesan];
    }
}

export const SippyPupList = new SippyPupStables().SippyPupList;
