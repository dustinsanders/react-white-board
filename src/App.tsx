import { useCallback, useState } from 'react'
import Drawer from './components/Drawer'
import Image, { ImageInterface } from './components/Image'
import StickyNote, { StickyNoteInterface } from './components/StickyNote'
import {
  ArrowUpIcon,
  Pane,
  LabelIcon,
  ImageRotateRightIcon,
} from 'evergreen-ui'
import uniqueId from 'lodash/uniqueId'

type Element = StickyNoteInterface | ImageInterface

function App() {
  const [elements, setElements] = useState<Element[]>([])
  const [activeKind, setActiveKind] = useState<'' | 'sticky-note' | 'image'>('')

  const updateElement = useCallback(
    (id: string, update: {}) => {
      setElements(
        elements.map(element =>
          element.id === id
            ? {
              ...element,
              ...update,
            }
            : element
        )
      )
    },
    [elements],
  )

  // const deleteElement = (id: string) =>

  return (
    <Pane
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
    >
      <Pane
        width="100%"
        height="100%"
        zIndex={-1}
        onClick={(evt: any) => {
          if (activeKind !== '') {
            setElements([
              ...elements,
              {
                id: uniqueId(),
                kind: activeKind,
                x: evt.clientX,
                y: evt.clientY,
              }
            ])
            setActiveKind('')
          }
        }}
      />
      <Drawer
        activeKind={activeKind}
        setActiveKind={setActiveKind}
        buttons={[
          {
            tooltip: 'Pointer',
            Icon: ArrowUpIcon,
            kind: '',
          },
          {
            tooltip: 'Sticky Note',
            Icon: LabelIcon,
            kind: 'sticky-note',
          },
          {
            tooltip: 'Image',
            Icon: ImageRotateRightIcon,
            kind: 'image'
          }
        ]}
      />
      {
        elements.map(element => {
          switch (element.kind) {
            case 'sticky-note':
              return <StickyNote key={element.id} {...element} />
            case 'image':
              return <Image key={element.id} {...element} updateElement={updateElement} />
            default: {
              const exhaustiveCheck: never = element

              return exhaustiveCheck
            }
          }
        })
      }
    </Pane>
  )
}

export default App
