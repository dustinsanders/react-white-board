import Drawer from './components/Drawer'
import ElementWrapper from './components/ElementWrapper'
import { Pane } from 'evergreen-ui'
import {
  useStoreState,
  useStoreActions,
} from './store/hooks'

function App() {
  const {
    elements,
  } = useStoreState(state => state.board)
  const {
    addElement,
  } = useStoreActions(store => store.board)

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
        onClick={(evt: React.MouseEvent<HTMLElement>) => {
          addElement({
            x: evt.clientX,
            y: evt.clientY,
          })
        }}
      />
      {
        elements.map(element => (
          <ElementWrapper key={element.id} {...element} />
        ))
      }
      <Drawer  />
    </Pane>
  )
}

export default App
