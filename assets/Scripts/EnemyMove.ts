// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Enemy from "./Enemy";
import WayPos from "./WayPos";
import gameControl from "./gameControl";
import gameManager from "./gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyMove extends cc.Component {
  public static Ins: EnemyMove;

  protected tagetMove: cc.Vec3;
  protected tagetCount: number = 1;

  private wayPoss: cc.Vec3[] = [];

  private enemy: Enemy;

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    EnemyMove.Ins = this;

    this.enemy = this.getComponent(Enemy);

    this.movePos(); //Lay vi tri ca diem can di qua
  }

  update(dt: number): void {
    this.move();
  }

  movePos(): void{
    let way = cc.find("Canvas/wayPos").getComponent(WayPos);
    for (let i = 0; i < way.node.childrenCount; i++) {
      this.wayPoss[i] = way.node.children[i].position;
    }
    this.tagetMove = this.wayPoss[this.tagetCount];
  }

  moveToNextPoint() {
        // kiem tra di qua diem cuoi chua
        if (this.tagetCount >= this.wayPoss.length -1) {
          this.node.destroy();
          let myLife = cc.find("Canvas/flife-sheet0/headText").getComponent(cc.RichText);
          gameControl.Ins.heart -= 1;
          myLife.string = "<color=#0>" + gameControl.Ins.heart.toString() +"</c>";
          if(gameControl.Ins.heart == 0){
            gameManager.Ins.onRestart();
          }
          return;
        }
        
        this.tagetCount++;
        this.tagetMove = this.wayPoss[this.tagetCount];
  }

  move(): void{
    let speedMove = this.node.position.sub(this.tagetMove).mag() / this.enemy.speed;
    cc.tween(this.node)
      .to(speedMove, { position: this.tagetMove.clone()})
      .call(() => {})
      .start();

    if(this.tagetMove.clone().sub(this.node.position).mag() <= 0.1){
      this.moveToNextPoint();
    }
  }


}
