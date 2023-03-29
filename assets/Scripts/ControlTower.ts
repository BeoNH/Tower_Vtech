// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import gameControl from "./gameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    flag: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.schedule(()=>{this.node.children[0].active = false; },10)
      }
    
      start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      }

    // update (dt) {}
    onTouchStart(event: cc.Event.EventTouch): void {}

    onTouchEnd(event: cc.Event.EventTouch): void {
        if(this.node.children[0].active == false){
            this.node.children[0].active = true;
        }else{
            this.node.children[0].active = false;
        }
    }

    sellTower(): void{

        const newFlag = cc.instantiate(this.flag);
        newFlag.setPosition(this.node.position);
        cc.Canvas.instance.node.addChild(newFlag);


        let money = this.node.children[0].children[0].children[1].children[0].getComponent(cc.RichText);
        gameControl.Ins.wood += parseInt(money.string);
        let wood = cc.find("Canvas/fwood-sheet0/woodText").getComponent(cc.RichText);
        wood.string = gameControl.Ins.wood.toString();

        this.node.active = false;

    }


}
