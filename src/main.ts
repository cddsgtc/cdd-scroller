import debounce from "../lib/lodash-master/debounce"
import throttle from "../lib/lodash-master/throttle"
import isNumber from "../lib/lodash-master/isNumber"

class Scroller {
  fElement: any//父元素
  cElement: any//子元素
  threshold: number//默认到达底部的为距离
  frequency: number//节流阀的频率单位毫秒
  modal: 'debounce'//节流阀的类型
  arrived: {//如果到达底部或者顶部触发的函数
    any?
      (params?: any): any
  }
  unarrived: {//如果从顶部或者底部重新进入正常时的回掉函数
    any?
      (params?: any): any
  }
  config: any//设置
  constructor({
    fElement = null,
    cElement = null,
    threshold = 20,
    arrived = () => {
      console.log(`需要有回调函数`)
    },
    unarrived = null,
    up = null,
    down = 0,
    // top = null,
    // bottom = 0,
    modal = "debounce",
    frequency = 250
}) {
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
    }

    this.init()
  }
  // 获取底部和顶部距离的信息
  getBottom() {
    let [f, c] = [
      this.config.fElement,
      this.config.cElement
    ]
    if (isNumber(f.scrollTop)) {
      let [fheight, fclientHeight, top] = [
        Math.max(f.scrollHeight, f.clientHeight),
        Math.min(f.scrollHeight, f.clientHeight),
        f.scrollTop
      ]

      this.config.bottom = fheight - fclientHeight - top
      this.config.top = top
      // console.log(`fheight`, fheight)
      // console.log(`top`, top)
      // console.log(`botton `, this.config.bottom)
    }
  }
  //初始化数据
  init() {
    let config = this.config
    if (config.up != null && config.down == 0) {
      config.down = null
    }
    // console.log(`this bottom`, config)
    this.addScroller(this.config.modal)
  }
  //根据不同的类型添加scroller
  addScroller(modal: string) {
    let self = this
    if (modal == 'throttle') {
      this.config.fElement.addEventListener('scroll', throttle(function () {
        self.getBottom()
        self.setCallback()
      }, self.config.frequency))
      // console.log(`throttle`)
    } else {
      // console.log(`debounce`)
      this.config.fElement.addEventListener('scroll', debounce(function () {
        self.getBottom()
        self.setCallback()
      }, self.config.frequency))
    }
  }

  // 设置触发回调函数的条件
  setCallback() {
    let config = this.config
    // 1.如果顶部和底部都可触发
    if (isNumber(config.up) && isNumber(config.down)) {
      if (config.top <= config.up || config.bottom <= config.down) {
        // console.log(`this is both`)
        config.arrived(config.fElement, config.cElement)
      } else {
        config.unarrived && (config.unarrived(config.fElement, config.cElement))
      }
      // 2.只是顶部触发
    } else if (isNumber(config.up)) {
      if (config.top <= config.up) {
        // console.log(`this is top`)
        config.arrived(config.fElement, config.cElement)
      } else {
        config.unarrived && (config.unarrived(config.fElement, config.cElement))
      }
      // 默认只是底部触发
    } else {
      if (config.bottom <= config.threshold) {
        // console.log(`this is bottom`)
        config.arrived(config.fElement, config.cElement)
      } else {
        config.unarrived && (config.unarrived(config.fElement, config.cElement))
      }
    }
  }

}

export interface $scroller {
  config: {
    fElement: any//父元素
    cElement: any//子元素
    threshold: number//默认到达底部的为距离
    frequency: number//节流阀的频率单位毫秒
    modal: string//节流阀的类型
    arrived: {//如果到达底部或者顶部触发的函数
      any?
        (params?: any): any
    }
    unarrived: {//如果从顶部或者底部重新进入正常时的回掉函数
      any?
        (params?: any): any
    }
  }
}

export default Scroller
