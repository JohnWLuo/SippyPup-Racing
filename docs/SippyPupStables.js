import SippyPup from './SippyPup.js';

class SippyPupStables {
    constructor() {
        const hankyPanky = new SippyPup("hanky panky Head Shot.png", "Hanky Panky", false);
        const lyn = new SippyPup("Lyn_Mame_Test.jpg", "Lyn Mametchi", false);
        const palmesan = new SippyPup("Palmesan.png", "Palmesan", false);
        const lily = new SippyPup("Lily.jpg", "Lily", false);
        const lynko = new SippyPup("Lynko.jpg", "Lynko", true);
        const yan = new SippyPup("FF14 Yan.jpg", "Yan", false);

        this.SippyPupList = [hankyPanky, lyn, palmesan, lily, lynko, yan];
    }
}

export const SippyPupList = new SippyPupStables().SippyPupList;
export default SippyPupStables;
