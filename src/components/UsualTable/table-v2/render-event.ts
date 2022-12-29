import { hasClass, getStyle } from '@/utils/domUtils'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { computePosition, offset, arrow, flip, shift } from '@floating-ui/dom'

let zIndex = 2022

// @popperjs/core写法 参考element-plus
let removePopper: any
function createTablePopper(
  parent: HTMLElement,
  target: HTMLElement,
  popperContent: string
) {
  const renderContent = () => {
    const content = document.createElement('div')
    content.innerHTML = popperContent
    content.className = 'cell-popper is-dark'
    content.style.zIndex = String(++zIndex)
    parent.appendChild(content)
    return content
  }
  const renderArrow = () => {
    const arrow = document.createElement('div')
    arrow.className = 'cell-popper_arrow'
    return arrow
  }
  const showPopper = () => {
    popperInstance && popperInstance.update()
  }
  removePopper?.()
  removePopper = () => {
    try {
      popperInstance && popperInstance.destroy()
      content && parent?.removeChild(content)
      target.removeEventListener('mouseenter', showPopper)
      target.removeEventListener('mouseleave', removePopper)
      removePopper = undefined
    } catch {}
  }
  const content = renderContent()
  const arrow = renderArrow()
  content.appendChild(arrow)
  let popperInstance: Nullable<Instance> = null
  popperInstance = createPopper(target, content, {
    placement: 'top',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      },
      {
        name: 'arrow',
        options: {
          element: arrow
        }
      }
    ]
  })

  target.addEventListener('mouseenter', showPopper)
  target.addEventListener('mouseleave', removePopper)
}

// @floating-ui/dom写法
// function createTablePopper(
//   parent: HTMLElement,
//   target: HTMLElement,
//   popperContent: string
// ) {
//   const renderContent = () => {
//     const content = document.createElement('div')
//     content.innerHTML = popperContent
//     content.className = 'cell-popper is-dark'
//     content.style.zIndex = String(++zIndex)
//     parent.appendChild(content)
//     return content
//   }
//   const renderArrow = () => {
//     const arrow = document.createElement('div')
//     arrow.className = 'cell-popper_arrow'
//     return arrow
//   }
//   const content = renderContent()
//   const arrowEL = renderArrow()
//   content.appendChild(arrowEL)

//   const update = async () => {
//     const result = await computePosition(target, content, {
//       placement: 'top',
//       middleware: [offset(8), arrow({element: arrowEL}), flip(), shift({padding: 10})]
//     })
//     Object.assign(content.style, {
//       left: `${result.x}px`,
//       top: `${result.y}px`,
//     })
//   }
//   const showPopper = () => {
//     update()
//   }
//   const removePopper = () => {
//     content && parent?.removeChild(content)
//     target.removeEventListener('mouseenter', showPopper)
//     target.removeEventListener('mouseleave', removePopper)
//   }

//   target.addEventListener('mouseenter', showPopper)
//   target.addEventListener('mouseleave', removePopper)
// }

export function useEvents() {
  const handleCellMouseEnter = (
    event: MouseEvent,
    row: Recordable,
    parent: HTMLElement) => {
    if (!parent) return
    const cell = event.target as HTMLElement
    const cellParent = cell.parentElement
    if (!(hasClass(cell, 'cell-tooltip') && cell.childNodes.length && cellParent)) return
    const range = document.createRange()
    range.setStart(cell, 0)
    range.setEnd(cell, cell.childNodes.length)
    const rangeWidth = Math.round(range.getBoundingClientRect().width)
    const padding =
      (Number.parseInt(getStyle(cellParent, 'paddingLeft'), 10) || 0) +
      (Number.parseInt(getStyle(cellParent, 'paddingRight'), 10) || 0)
    if (
      rangeWidth + padding > cellParent.offsetWidth ||
      cell.scrollWidth > cellParent.offsetWidth
    ) {
      createTablePopper(
        parent,
        cell,
        cell.innerHTML || cell.innerText
      )
    }
  }
  const handleCellMouseLeave = () => {
    console.log('leave')
  }

  return {
    handleCellMouseEnter,
    handleCellMouseLeave
  }
}
