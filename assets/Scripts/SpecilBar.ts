import Special from "./Special";

const {ccclass, property} = cc._decorator;

@ccclass
export default class specialBar extends cc.Component {
    public static Ins: specialBar;

    public timeCout: number = 20;
    public startTimeCout: number;
    public currentFillRange: number = 0; // giá trị fillRange hiện tại

    onLoad() {
        specialBar.Ins = this;

        this.startTimeCout = this.timeCout;
        this.timeCout = this.timeCout/100;
    }

    start() {
        // bắt đầu tăng dần fillRange
        this.schedule(this.updateFillRange.bind(this), this.timeCout);
    }

    reset(): void{
        this.timeCout = this.startTimeCout;
        this.currentFillRange = 0;
        this.node.parent.getComponent(cc.Button).enabled = false;
        this.node.parent.getComponent(Special).enabled = false;
    }

    updateFillRange() {
        if (this.currentFillRange < 1) {
            this.currentFillRange += 1/100;
            // cập nhật giá trị fillRange của sprite
            this.node.getComponent(cc.Sprite).fillRange = this.currentFillRange;
        } else {
            // dừng tăng dần fillRange nếu đã đạt giá trị tối đa
            this.unschedule(this.updateFillRange.bind(this));    
            this.node.parent.getComponent(cc.Button).enabled = true;
            this.node.parent.getComponent(Special).enabled = true;
            // hoi chieu cuoi
        }
    }


}