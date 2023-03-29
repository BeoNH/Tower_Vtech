// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import timeBar from "./TimeBar";
import gameControl from "./gameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Flag extends cc.Component {
  @property(cc.Prefab)
  tower: cc.Prefab[] = [];

  @property(cc.Prefab)
  build: cc.Prefab = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.schedule(()=>{this.node.children[0].active = false; },6)
  }

  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart(event: cc.Event.EventTouch): void {}

  onTouchEnd(event: cc.Event.EventTouch): void {
    this.node.children[0].active = true;
  }

  chooseTower(towerIndex: number) {
    this.node.active = false;
    const newBuld = cc.instantiate(this.build);
    newBuld.setPosition(this.node.position);
    cc.Canvas.instance.node.addChild(newBuld);

    setTimeout(() => {
        const newTower = cc.instantiate(this.tower[towerIndex - 1]);
        newTower.setPosition(this.node.position);
        cc.Canvas.instance.node.addChild(newTower);
    }, 6350);

    let money = cc.find(`Canvas/flag/selectionCircle/btnTower${towerIndex}/buyBar/buyWood`).getComponent(cc.RichText);
    gameControl.Ins.wood -= parseInt(money.string);
    let wood = cc.find("Canvas/fwood-sheet0/woodText").getComponent(cc.RichText);
    wood.string = "<color=#0>" + gameControl.Ins.wood.toString() +"</c>";
    
    console.log(`Tower${towerIndex}`);
  }

  Tower1(): void {
    this.chooseTower(1)
  }
  Tower2(): void {
    this.chooseTower(2)
  }
  Tower3(): void {
    this.chooseTower(3)
  }
  Tower4(): void {
    this.chooseTower(4)
  }

}
