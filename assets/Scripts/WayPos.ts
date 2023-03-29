// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class WayPos extends cc.Component {
  @property(cc.Prefab)
  enemy: cc.Prefab = null;

  @property(cc.Integer)
  wave: number = 4;

  protected WayCount: number = 0;

  protected timeBetweenWaves: number = 20;
  protected numberOfEnemy: number = 3;
  protected countDown: number = 2;

  protected start(): void {
    let waveMax = cc.find("Canvas/fwave-sheet0/wave").getComponent(cc.RichText);
    waveMax.string = "/" + this.wave.toString();
  }

  update(dt) {
    if (this.countDown <= 0) {
      this.waySpawn();
      this.countDown = this.timeBetweenWaves;
      //console.log(this.numberOfEnemy);
    }
    this.countDown -= dt;
  }

  waySpawn(): void {
    if (this.wave > 0) {
      this.Spanwer();
      this.numberOfEnemy++;
      this.wave--;
      this.WayCount++;
      let waveCout = cc.find("Canvas/fwave-sheet0/waveText").getComponent(cc.RichText);
      waveCout.string = this.WayCount.toString();
    }else{
        //console.log("het wave")
        return;
    }
  }

  Spanwer(): void {
    for (let i = 0; i < this.numberOfEnemy; i++) {
      let newEnemy = cc.instantiate(this.enemy);
      cc.Canvas.instance.node.addChild(newEnemy);

      newEnemy.setPosition(this.node.children[0].position);
      //console.log(newEnemy.position, i);
    }
  }
}
