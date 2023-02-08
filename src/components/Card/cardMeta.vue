<script lang="tsx">
import { getPropsSlot } from '@/utils/props-util'
import { MetaProps } from './props'

export default defineComponent({
  props: MetaProps,
  setup(props, { slots }) {
    const textSize = `text-${props.titleSize}`
    const fontWeight = props.titleSize === 'sm' ? '' : 'font-bold'

    return () => {
      const { titleStyle, descStyle } = props
      const avatar = slots['avatar']
      const title = getPropsSlot(slots, props, 'title')
      const description = getPropsSlot(slots, props, 'description')

      const avatarDom = avatar ? <div class="meta-avatar">{avatar()}</div> : null

      const titleDom = title ? (
        <div class={`meta-title ${textSize} ${fontWeight} padding-bottom5`} style={titleStyle}>
          {title}
        </div>
      ) : null

      const descriptionDom = description ? (
        <div class="meta-description text-sm text-gray-500" style={descStyle}>
          {description}
        </div>
      ) : null

      const MetaDetail =
        titleDom || descriptionDom ? (
          <div class={`meta-detail ${props.direction === 'horizontal' ? 'pl-4' : 'pt-2 pl-1'}`}>
            {titleDom}
            {descriptionDom}
          </div>
        ) : null

      return (
        <div class={`meta flex ${props.direction === 'horizontal' ? 'items-center' : 'flex-col'}`}>
          {avatarDom}
          {MetaDetail}
        </div>
      )
    }
  }
})
</script>