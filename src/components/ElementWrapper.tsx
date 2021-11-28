import { useState } from 'react'
import type Element from '../types/Element'
import Image from './Image'
import StickyNote from './StickyNote'
import Video from './Video'
import { Pane } from 'evergreen-ui'
import {
  useStoreActions,
  useStoreState,
} from '../store/hooks'
import { DraggableCore } from 'react-draggable'

const ElementChild = (props: Element) => {
  switch (props.kind) {
    case 'sticky-note':
      return <StickyNote {...props} />
    case 'image':
      return <Image {...props} />
    case 'video':
      return <Video {...props} />
    default: {
      const exhaustiveCheck: never = props

      return exhaustiveCheck
    }
  }
}

const ElementWrapper = (props: Element) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const {
    interaction,
  } = useStoreState(store => store.board)
  const {
    deleteElement,
    updateElement,
  } = useStoreActions(store => store.board)

  console.log('interaction', interaction)

  return (
    <DraggableCore
      onStart={(evt: any) => {
        if (interaction === 'eraser') {
          return deleteElement(props)
        }

        const el = document.getElementById(props.id)

        if (el) {
          const { top, left } = el.getBoundingClientRect()
          const newOffset = {
            x: evt.clientX - left,
            y: evt.clientY - top
          }

          setOffset(newOffset)

          updateElement({
            id: props.id,
            update: {
              x: evt.clientX - newOffset.x,
              y: evt.clientY - newOffset.y,
            },
          })
        }
      }}
      onStop={() => setOffset({x: 0, y: 0 })}
      onDrag={(evt: any) => {
        if (interaction === 'pointer') {
          updateElement({
            id: props.id,
            update: {
              x: evt.clientX - offset.x,
              y: evt.clientY - offset.y,
            },
            tempUpdate: true,
          })
        }
      }}
    >
      <Pane
        position="absolute"
        top={props.y}
        left={props.x}
        id={props.id}
      >
        <ElementChild {...props} />
      </Pane>
    </DraggableCore>
  )
}

export default ElementWrapper