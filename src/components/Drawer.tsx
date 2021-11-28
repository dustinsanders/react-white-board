import { useState } from 'react'
import { Interaction } from '../types/Element'
import {
  useStoreState,
  useStoreActions,
} from '../store/hooks'
import {
  Card,
  Dialog,
  EraserIcon,
  HandUpIcon,
  IconButton,
  ImageRotateRightIcon,
  LabelIcon,
  Pane,
  Tooltip,
  TrashIcon,
  UndoIcon,
  VideoIcon,
 } from 'evergreen-ui'

interface ButtonInterface {
  tooltip: string
  Icon: any
  interaction: Interaction
}

const buttons: ButtonInterface[] = [
  {
    tooltip: 'Pointer',
    Icon: HandUpIcon,
    interaction: 'pointer',
  },
  {
    tooltip: 'Sticky Note',
    Icon: LabelIcon,
    interaction: 'sticky-note',
  },
  {
    tooltip: 'Image',
    Icon: ImageRotateRightIcon,
    interaction: 'image',
  },
  {
    tooltip: 'Video',
    Icon: VideoIcon,
    interaction: 'video',
  },
  {
    tooltip: 'Eraser',
    Icon: EraserIcon,
    interaction: 'eraser',
  },
  {
    tooltip: 'Reset Board',
    Icon: TrashIcon,
    interaction: 'trash',
  },
  {
    tooltip: 'Undo',
    Icon: UndoIcon,
    interaction: 'undo',
  }
]

const Drawer = () => {
  const [isShown, setIsShown] = useState(false)
  const { interaction } = useStoreState(state => state.board)
  const {
    setInteraction,
    undo,
    trash,
  } = useStoreActions(store => store.board)

  return (
    <Pane
      width="100%"
      position="absolute"
      bottom={24}
      display="flex"
      justifyContent="center"
      zIndex={10}
    >
      <Dialog
        isShown={isShown}
        title="Reset Board"
        intent="danger"
        onCloseComplete={() => setIsShown(false)}
        onConfirm={() => {
          trash()
          setIsShown(false)
        }}
        confirmLabel="Reset"
      >
        Are you sure you want to reset your board?
      </Dialog>
      <Card
        background="white"
        display="flex"
        elevation={3}
        height={50}
        alignItems="center"
        padding={16}
      >
        {
          buttons.map(button => {
            const isActive = interaction === button.interaction

            return (
              <Tooltip key={button.tooltip} content={button.tooltip}>
                <IconButton
                  appearance={isActive ? 'primary' : 'default'}
                  icon={<button.Icon color={isActive ? 'white' : 'default'} />}
                  marginX={16}
                  intent="none"
                  onClick={() => {
                    if (button.interaction === 'undo') {
                      return undo()
                    }

                    if (button.interaction === 'trash') {
                      return setIsShown(true)
                    }

                    setInteraction(button.interaction)
                  }}
                />
              </Tooltip>
            )
          })
        }
      </Card>
    </Pane>
  )
}

export default Drawer