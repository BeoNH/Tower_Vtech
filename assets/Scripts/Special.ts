// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Enemy from "./Enemy";
import specialBar from "./SpecilBar";
import targetFire from "./tagetFire";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Special extends cc.Component {
    @property(cc.Node)
    targetFire: cc.Node = null;

    @property(cc.Prefab)
    special: cc.Prefab = null;

    private ani: cc.Animation;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.getFireSpecial();
    }

    // update (dt) {}


    getFireSpecial():void{
        //Lay vi tri cua chuot va tha min
        
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    onMouseMove(event: cc.Event.EventMouse) {
        const mousePos = event.getLocation();
        const pos = this.targetFire.parent.convertToNodeSpaceAR(mousePos);
        this.targetFire.setPosition(pos);
      }
      
      onTouchEnd(event: cc.Event.EventMouse) {
        cc.Canvas.instance.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);

        if(this.targetFire.active == true){

            console.log(targetFire.Ins.enemyAray,"aaaaaa");
            let dameAray = targetFire.Ins.enemyAray;

            for (let index = 0; index < 5; index++) {
                setTimeout(() => {
                    let newBoom = cc.instantiate(this.special);
                    newBoom.angle = -90;
                    newBoom.parent = cc.Canvas.instance.node;
                    newBoom.setPosition(this.targetFire.position.x, this.targetFire.position.y + 500);

                    this.ani = newBoom.getComponent(cc.Animation);

                    let randX = Math.random() * 90 + this.targetFire.position.x -45;
                    let randY = Math.random() * 20 + this.targetFire.position.y -10;
                    cc.tween(newBoom)
                    .to(0.25, {position: cc.v3(randX, randY)})
                    .call(() => {
                        this.ani.stop();
                        this.ani.play("boomsDone");
                    })
                    .call(() => {
                        newBoom.destroy();
                        this.dameAllEnemy(dameAray);
                    })
                    .start();
                }, index * 400);
            }
        }
        //tha booms

        
        this.targetFire.active = false;
      }

      dameAllEnemy(dame: cc.Node[]): void{
        const listTarget = dame.slice(); 
        if(!listTarget) return;
        for (const target of listTarget) {
            if (!target || target.name == "") return;
            target.getComponent(Enemy).takeDame(30);
            target.getComponent(Enemy).isTower = false;
        };
      }

      onTouchStart(event: cc.Event.EventMouse) {
          this.targetFire.setPosition(this.node.parent.parent.position);
          this.targetFire.active = true;

        specialBar.Ins.reset();
        specialBar.Ins.start();

        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
      }
      
}
