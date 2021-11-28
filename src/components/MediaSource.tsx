import { useState } from 'react'
import {
  Card,
  IconButton,
  TextInput,
  TickIcon,
} from 'evergreen-ui'
import { useStoreActions } from '../store/hooks'

const isUrl = (toCheck: string) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

  return !!pattern.test(toCheck)
}

interface EnterSourceProps {
  id: string
  children: JSX.Element
  src?: string
}

const EnterSource = ({
  id,
  children,
  src,
}: EnterSourceProps) => {
  const [tempSrc, setTempSrc] = useState('')
  const {
    updateElement,
  } = useStoreActions(store => store.board)

  return (
    <Card
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={16}
      elevation={2}
      background="white"
    >
      {
        src ? (
          children
        ) : (
          <>
            <TextInput
              placeholder="Enter Source"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTempSrc(evt.target.value)}
              value={tempSrc}
            />
            <IconButton
              icon={TickIcon}
              intent="success"
              marginLeft={8}
              disabled={!isUrl(tempSrc)}
              onClick={() => updateElement({
                id,
                update: { src: tempSrc },
              })}
            />
          </>
        )
      }
    </Card>
  )
}

export default EnterSource