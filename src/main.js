import debounce from "../lib/lodash-master/debounce";
import throttle from "../lib/lodash-master/throttle";
import isNumber from "../lib/lodash-master/isNumber";
class Scroller {
    constructor({ fElement = null, cElement = null, threshold = 20, arrived = () => {
            console.log(`需要有回调函数`);
        }, unarrived = null, up = null, down = 0, modal = "debounce", frequency = 250 }) {
        this.config = {
            fElement: fElement,
            cElement: cElement,
            threshold: threshold,
            arrived: arrived,
            unarrived: unarrived,
            up: up,
            down: down,
            top: '',
            modal: modal,
            bottom: '',
            frequency: frequency
        };
        this.init();
    }
    getBottom() {
        let [f, c] = [
            this.config.fElement,
            this.config.cElement
        ];
        if (isNumber(f.scrollTop)) {
            let [fheight, fclientHeight, top] = [
                Math.max(f.scrollHeight, f.clientHeight),
                Math.min(f.scrollHeight, f.clientHeight),
                f.scrollTop
            ];
            this.config.bottom = fheight - fclientHeight - top;
            this.config.top = top;
        }
    }
    init() {
        let config = this.config;
        if (config.up != null && config.down == 0) {
            config.down = null;
        }
        this.addScroller(this.config.modal);
    }
    addScroller(modal) {
        let self = this;
        if (modal == 'throttle') {
            this.config.fElement.addEventListener('scroll', throttle(function () {
                self.getBottom();
                self.setCallback();
            }, self.config.frequency));
        }
        else {
            this.config.fElement.addEventListener('scroll', debounce(function () {
                self.getBottom();
                self.setCallback();
            }, self.config.frequency));
        }
    }
    setCallback() {
        let config = this.config;
        if (isNumber(config.up) && isNumber(config.down)) {
            if (config.top <= config.up || config.bottom <= config.down) {
                config.arrived(config.fElement, config.cElement);
            }
            else {
                config.unarrived && (config.unarrived(config.fElement, config.cElement));
            }
        }
        else if (isNumber(config.up)) {
            if (config.top <= config.up) {
                config.arrived(config.fElement, config.cElement);
            }
            else {
                config.unarrived && (config.unarrived(config.fElement, config.cElement));
            }
        }
        else {
            if (config.bottom <= config.threshold) {
                config.arrived(config.fElement, config.cElement);
            }
            else {
                config.unarrived && (config.unarrived(config.fElement, config.cElement));
            }
        }
    }
}
export default Scroller;
