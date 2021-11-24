import Draggable from 'react-draggable'
import {
  Card,
  Textarea,
} from 'evergreen-ui'

const background = '#FFEFD2'

export interface StickyNoteInterface {
  kind: 'sticky-note'
  id: string
  text?: string
  x: number
  y: number
}

const StickyNote = ({
  x,
  y,
}: StickyNoteInterface) => {
  return (
    <Draggable>
      <Card
        height={200}
        width={200}
        elevation={2}
        padding={8}
        background={background}
        position="absolute"
        top={y}
        left={x}
      >
        <Textarea
          resize="none"
          border="none"
          width="100%"
          height="100%"
          backgroundColor={background}
          autoFocus
        />
      </Card>
    </Draggable>
  )
}

export default StickyNote