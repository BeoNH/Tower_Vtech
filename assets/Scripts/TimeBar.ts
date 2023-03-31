import Special from "./Special";

const {ccclass, property} = cc._decorator;

@ccclass
export default class timeBar extends cc.Component {
    public static Ins: timeBar;

    @property(cc.Integer)
    timeCout: number = 5;

    public startTime: number;

    public currentFillRange: number = 0; // giá trị fillRange hiện tại

    onLoad() {
        this.startTime = this.timeCout;
        this.timeCout = this.timeCout/100;
    }

    start() {
        // bắt đầu tăng dần fillRange
        this.schedule(this.updateFillRange.bind(this), this.timeCout);
    }

    update(dt):void{
    }

    updateFillRange() {
        if (this.currentFillRange < 1) {
            this.currentFillRange += 1/100;
            // cập nhật giá trị fillRange của sprite
            this.node.getComponent(cc.Sprite).fillRange = this.currentFillRange;
        } else {
            // dừng tăng dần fillRange nếu đã đạt giá trị tối đa
            this.unschedule(this.updateFillRange.bind(this));
            this.node.parent.parent.active = false;
        }
    }


}