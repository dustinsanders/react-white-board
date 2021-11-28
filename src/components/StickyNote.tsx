import { StickyNoteInterface } from '../types/Element'
import {
  Card,
  Textarea,
} from 'evergreen-ui'
import { useStoreActions } from '../store/hooks'

const background = '#FFEFD2'

const StickyNote = ({
  id,
  text,
}: StickyNoteInterface) => {
  const {
    updateElement,
  } = useStoreActions(store => store.board)

  return (
    <Card
      height={200}
      width={200}
      elevation={2}
      padding={8}
      background={background}
    >
      <Textarea
        resize="none"
        border="none"
        width="100%"
        height="100%"
        backgroundColor={background}
        autoFocus
        value={text}
        onChange={
          (evt: React.ChangeEvent<HTMLTextAreaElement>) => updateElement({
            id,
            update: {
              text: evt.target.value,
            }
          })
        }
      />
    </Card>
  )
}

export default StickyNote