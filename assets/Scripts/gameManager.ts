// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameManager extends cc.Component {
    private count: number = 0;

    public static timeScale: number = 1;

    // LIFE-CYCLE CALLBACKS:

    // update (dt) {}

    onSetting(): void{
        cc.director.pause();
        cc.find("Canvas/foption-sheet0").active = true;
    }

    onContinue(): void{
        cc.director.resume()
        cc.find("Canvas/foption-sheet0").active = false;
    }

    public static onRestart(): void{
        const sceneName = cc.director.getScene();
        sceneName.stopAllActions()
        cc.director.resume();
        cc.director.getScheduler().setTimeScale(1);
        gameManager.timeScale = 1;
        cc.director.loadScene(sceneName.name);
    }

    onGoHome(): void {
        cc.director.loadScene("Home");
    }

    onPlay(): void{
        cc.director.loadScene("Level_1");
        cc.director.resume()
    }

    onGoToLevel(): void{
        cc.director.loadScene("Level");
    }

    onSpeedUp(): void {

        const buttonClick = cc.find("Canvas/btnSpeedUp").getComponent(cc.Button);
        buttonClick.transition = cc.Button.Transition.SPRITE;

        if (buttonClick) {
        this.count++;
        //console.log(this.count)
            if (buttonClick.normalSprite) {
                    const saveSprite = buttonClick.normalSprite;
                    buttonClick.normalSprite = buttonClick.pressedSprite;
                    buttonClick.pressedSprite = saveSprite;
                if (this.count % 2) {
                    cc.director.getScheduler().setTimeScale(3);
                    gameManager.timeScale = 3;
                } else {
                    cc.director.getScheduler().setTimeScale(1);
                    gameManager.timeScale = 1;
                }
            }
        }
    }
}
