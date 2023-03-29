// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Tower from "./Tower";
import gameControl from "./gameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
  public static Ins: Enemy;

  
  public hp: number = 100;
  public maxHP: number =100;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      Enemy.Ins = this;
      this.node.children[0].active = false;
    }

    //start () {}

    // update (dt) {}

    
    takeDame(): void{
      this.node.children[0].active = true;
      this.hp -= Tower.Ins.dameTower;
      this.node.getChildByName("HPBar").getChildByName("HP").getComponent(cc.Sprite).fillRange = this.hp/this.maxHP;
      if(this.hp <=0){
        this.onDestroyEnemy();
        gameControl.Ins.wood += 5;
        let wood = cc.find("Canvas/fwood-sheet0/woodText").getComponent(cc.RichText);
        wood.string = "<color=#0>" + gameControl.Ins.wood.toString() +"</C>";
      }
      this.schedule(()=> {this.node.children[0].active = false;},5)
    }
        
    onDestroyEnemy(): void{
      if(this.node.isValid){
        Tower.Ins.targetAray = Tower.Ins.targetAray.filter(target=>target.uuid!==this.node.uuid)
        // const objLeaveIndex = Tower.Ins.targetAray.findIndex(
        //   (obj) => obj.uuid === this.node.uuid
        // );
        // if (objLeaveIndex !== -1) {
        //   Tower.Ins.targetAray.splice(objLeaveIndex, 1);
        //   console.log(objLeaveIndex);
        //}
        this.node.destroy();
      }
    }
}
