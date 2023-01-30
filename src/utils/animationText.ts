import { isString } from './is'

interface AnimationOpts {
  source: HTMLElement
  output: HTMLElement
  delay?: number
}
type TarList = (string | TarItem)[]
interface Target {
  parent: null | Target
  dom: HTMLElement
  val: TarList
}
type TarItem = {
  dom: HTMLElement
  val: TarList
}

class AnimationText {
  source: HTMLElement
  output: HTMLElement
  delay: number
  target: Target
  timer: Nullable<TimeoutHandle>

  constructor(opts: AnimationOpts) {
    this.source = opts.source
    this.output = opts.output
    this.delay = opts.delay || 30
    this.target = {
      parent: null,
      dom: this.output,
      val: []
    }
    this.timer = null
  }

  init() {
    this.target.val = this.convart(this.source, [])
  }

  convart(dom: HTMLElement, tarArr: TarList) {
    const nodes = Array.from(dom.childNodes)
    for (let i = 0; i < nodes.length; i++) {
      const child = nodes[i]
      if (child.nodeType === 3) {
        tarArr = (tarArr as string[]).concat(child.nodeValue!.split(''))
      } else if (child.nodeType === 1) {
        ;(tarArr as TarItem[]).push({
          dom: child as HTMLElement,
          val: this.convart(child as HTMLElement, [])
        })
      }
    }
    return tarArr
  }

  print(dom: HTMLElement, text: string, callback?: Fn) {
    this.timer = setTimeout(() => {
      dom.appendChild(document.createTextNode(text))
      callback && callback()
    }, this.delay)
  }

  play(ele: Target) {
    if (!ele.val.length) {
      ele.parent && this.play(ele.parent)
      return
    }
    const value = ele.val.shift()!
    if (!value) {
      this.stop()
    } else if (isString(value)) {
      this.print(ele.dom, value, () => this.play(ele))
    } else {
      const child = value.dom.cloneNode()
      ele.dom.appendChild(child)
      this.play({
        parent: ele,
        dom: child as HTMLElement,
        val: value.val
      })
    }
  }

  start() {
    this.init()
    this.play(this.target)
  }

  stop() {
    clearTimeout(this.timer!)
  }
}

export default AnimationText
