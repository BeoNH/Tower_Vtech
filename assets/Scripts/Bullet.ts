// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Enemy from "./Enemy";
import Tower from "./Tower";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property(cc.Boolean)
    explosionBullet: boolean = false;

    public target: cc.Node = null
    public parentTower: Tower = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.onMoveToTaget();
    }

    update (dt) {}

    onMoveToTaget(): void{
        let targetEnemy = this.node.convertToNodeSpaceAR(cc.Canvas.instance.node.convertToWorldSpaceAR(this.target.position));
        let dir = this.target.position.clone().sub(this.node.position);
        let angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;
        
        cc.tween(this.node)
          .to(0, { angle: 90 })
          .to(0.1, { position: cc.v3(0, 50) })
          .to(0, { angle: angle })
          .to(0.3, { position: targetEnemy })
          .call(() => {
            this.node.destroy();
            this.dameEnemy();

            this.parentTower.numberOfBullet++;
          })
          .start();
    }

    dameEnemy(): void{
        if(this.explosionBullet){
            let listTarget = this.parentTower.targetAray.slice(0,3);
            for (const taget of listTarget) {
                if(!taget) return;
                this.hitTarget(taget);
            }
        }else{
            this.hitTarget(this.target);
        }

    }

    hitTarget(dame: cc.Node): void{
        let a = dame.getComponent(Enemy);
        if(a != null)
        {
            a.takeDame();
            
        }
    }


}
