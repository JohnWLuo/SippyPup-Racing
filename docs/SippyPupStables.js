import SippyPup from './SippyPup.js';

class SippyPupStables {
    constructor() {
        const hankyPanky = new SippyPup("hanky panky Head Shot.png", "Hanky Panky", false);
        const lyn = new SippyPup("Lyn_Mame_Test.jpg", "Lyn Mametchi", false);
        const palmesan = new SippyPup("Palmesan.png", "Palmesan", false);
        const lily = new SippyPup("Lily.png", "Lily", false);
        const lynko = new SippyPup("Lynko.png", "Lynko", true);
        const yan = new SippyPup("FF14 Yan.png", "Yan", false);

        this.SippyPupList = [hankyPanky, lyn, palmesan, lily, lynko, yan];
    }
}

export const SippyPupList = new SippyPupStables().SippyPupList;
export default SippyPupStables;
