// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameControl extends cc.Component {
  public static Ins: gameControl;

  public heart: number = 10;
  public wood: number = 300;
  
  private collisionManager: cc.CollisionManager;
  onLoad() {
    gameControl.Ins = this;

    this.collisionManager = cc.director.getCollisionManager();

    this.collisionManager.enabled = true;
    this.collisionManager.enabledDebugDraw = true;
  }

  protected start(): void {
    this.heart = 10;
    this.wood = 300;
  }

}
