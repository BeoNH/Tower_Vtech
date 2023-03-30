// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class targetFire extends cc.Component {
    public static Ins: targetFire

    public enemyAray: cc.Node[] = [];

    protected onLoad(): void {
        targetFire.Ins = this;
    }

    onCollisionEnter(other, self): void {
        if (!this.enemyAray.includes(other.node)) {
          this.enemyAray.push(other.node);
          console.log(this.enemyAray)
        }
      }
    
      onCollisionExit(other, self): void {
        this.enemyAray = this.enemyAray.filter(
          (obj) => obj.uuid != other.node.uuid
        );
        console.log(this.enemyAray,"bbbbbbbbb")
      }
      
}
