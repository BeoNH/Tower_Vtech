// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bullet from "./Bullet";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tower extends cc.Component {
  public static Ins: Tower;

  @property(cc.Prefab)
  bullet: cc.Prefab = null;

  @property(cc.Integer)
  range: number = 1;

  @property(cc.Integer)
  speedShoot: number = 1; //toc do dan ban ra

  @property(cc.Integer)
  dameTower: number = 40;


  // public taget: cc.Node = null;
  public targetAray: cc.Node[] = [];
  public numberOfBullet: number = 2; //so luong ban trong
  private fireCountDown: number = 0; 

  onLoad() {
    Tower.Ins = this;
  }

  update(dt): void {
    // this.undateTarget();

    if (this.fireCountDown <= 0) {
      this.Shoot();
      this.fireCountDown = this.speedShoot;
    }
    this.fireCountDown -= dt;
  }

  onCollisionEnter(other, self): void {
    if (!this.targetAray.includes(other.node)) {
      this.targetAray.push(other.node);
    }
  }

  onCollisionExit(other, self): void {
    this.targetAray = this.targetAray.filter(
      (obj) => obj.uuid != other.node.uuid
    );
  }

  Shoot(): void {
    const listTarget = this.targetAray.slice(0, this.range);
    for (const target of listTarget) {
      if (!target) return;
      if (this.numberOfBullet >= 0) {
        let newBullet = cc.instantiate(this.bullet);
        newBullet.getComponent(Bullet).target = target;
        newBullet.getComponent(Bullet).parentTower = this;
        newBullet.parent = this.node;

        this.numberOfBullet--;
      }
    }
  }
}
