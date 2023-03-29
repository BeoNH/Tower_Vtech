// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class test extends cc.Component {
  

   start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  // update (dt) {}
  onTouchStart(event: cc.Event.EventTouch): void {}

  onTouchEnd(event: cc.Event.EventTouch): void {
    this.node.getComponentInChildren(cc.ProgressBar).progress = 0.5;
 
  }

}

