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
    this.cehck();
  }

  // update (dt) {}
  onTouchStart(event: cc.Event.EventTouch): void {}

  onTouchEnd(event: cc.Event.EventTouch): void {
    this.node.getComponentInChildren(cc.ProgressBar).progress = 0.5;
 
  }

  cehck(): void{
    let startTime = cc.sys.now();

setTimeout(function() {
    let endTime = cc.sys.now();
    let timeElapsed = endTime - startTime;
    console.log(`Hàm setTimeout được gọi sau ${timeElapsed}ms`);
}, 5000);

this.scheduleOnce(function() {
    let endTime = cc.sys.now();
    let timeElapsed = endTime - startTime;
    console.log(`Hàm schedule được gọi sau ${timeElapsed}ms`);
}, 5/cc.director.getScheduler().getTimeScale());
  }

}

