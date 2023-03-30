// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bullet from "./Bullet";
import EnemyMove from "./EnemyMove";
import Tower from "./Tower";
import gameControl from "./gameControl";
import targetFire from "./tagetFire";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
  public static Ins: Enemy;

  @property(cc.Integer)
  maxHP: number = 100;

  @property(cc.Integer)
  speed: number = 50;

  public hp: number =100;
  public startSpeed: number;

  public isTower: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      Enemy.Ins = this;
      this.node.children[0].active = false;
    }

    start () {
      this.hp = this.maxHP;
      this.startSpeed = this.speed;
    }

    update (dt) {
      if(this.hp <=0){
        this.onDestroyTarget();
        this.node.destroy();
        gameControl.Ins.wood += 5;
        let wood = cc.find("Canvas/fwood-sheet0/woodText").getComponent(cc.RichText);
        wood.string = "<color=#0>" + gameControl.Ins.wood.toString() +"</C>";
      }
    }

    
    takeDame(dame: number): void{
      this.node.children[0].active = true;
      this.hp -= dame;
      this.node.getChildByName("HPBar").getChildByName("HP").getComponent(cc.Sprite).fillRange = this.hp/this.maxHP;
      this.schedule(()=> {this.node.children[0].active = false;},5)
    }
        
    onDestroyTarget(): void{
      if(this.node.isValid){
        if(this.isTower){
          Tower.Ins.targetAray = Tower.Ins.targetAray.filter(target=>target.uuid!==this.node.uuid);
        }else{
          targetFire.Ins.enemyAray = targetFire.Ins.enemyAray.filter(target => target.uuid!=this.node.uuid);
        }
      }
    }

    isSlow(): void{
      this.speed *= 0.5;
      this.node.getComponent(EnemyMove).moveToNextPoint();
      this.scheduleOnce(() => {this.speed = this.startSpeed; console.log("Run")},2);
      console.log("Slowwwwwww");
    }

    isPoison(): void{
      this.scheduleOnce(() => {this.hp -=5},1);
      this.scheduleOnce(() => {this.hp -=5},2);
      this.scheduleOnce(() => {this.hp -=5},3);
      console.log("doc nay");
    }
}
