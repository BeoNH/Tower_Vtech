// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Enemy from "./Enemy";
import WayPos from "./WayPos";
import gameControl from "./gameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyMove extends cc.Component {

  protected tagetMove: cc.Vec3;
  protected tagetCount: number = 1;

  private wayPoss: cc.Vec3[] = [];

  @property
  speed: number = 50;


  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.movePos(); //Lay vi tri ca diem can di qua
    this.moveToNextPoint(); //Di chuyen den diem tiep theo

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
        if (this.tagetCount >= this.wayPoss.length) {
          this.node.destroy();
          let myLife = cc.find("Canvas/flife-sheet0/headText").getComponent(cc.RichText);
          gameControl.Ins.heart -= 1;
          myLife.string = gameControl.Ins.heart.toString();
          return;
        }
        //neu chua di qua diem cuoi tiep tuc di chuyen
        let speedMove = this.tagetMove.clone().sub(this.node.position).mag() / this.speed;
        let rand = Math.random() * 2 + speedMove -1;
        //console.log(speedMove);
        cc.tween(this.node)
          .to(rand, { position: this.tagetMove.clone() })
          .call(() => {
            this.tagetCount++;
            this.tagetMove = this.wayPoss[this.tagetCount];
            this.moveToNextPoint();
          })
          .start();
    }

}
