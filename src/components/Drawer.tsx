import {
  Card,
  IconButton,
  Pane,
  Tooltip,
 } from 'evergreen-ui'

interface DrawerProps {
  activeKind: string
  setActiveKind: React.Dispatch<React.SetStateAction<any>>
  buttons: {
    tooltip: string
    Icon: any
    kind: string
  }[]
}

const Drawer = ({
  activeKind,
  setActiveKind,
  buttons,
}: DrawerProps) => {
  return (
    <Pane
      width="100%"
      position="absolute"
      bottom={24}
      display="flex"
      justifyContent="center"
    >
      <Card
        display="flex"
        elevation={3}
        height={50}
        alignItems="center"
        padding={16}
      >
        {
          buttons.map(button => {
            const isActive = activeKind === button.kind

            return (
              <Tooltip key={button.tooltip} content={button.tooltip}>
                <IconButton
                  appearance={isActive ? 'primary' : 'default'}
                  icon={<button.Icon color={isActive ? 'white' : 'default'} />}
                  marginX={16}
                  intent="none"
                  onClick={() => setActiveKind(button.kind)}
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