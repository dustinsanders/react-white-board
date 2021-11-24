import { useState } from 'react'
import {
  Card,
  IconButton,
  TextInput,
  TickIcon,
} from 'evergreen-ui'

export interface ImageInterface {
  kind: 'image'
  x: number
  y: number
  id: string
  src?: string
}

interface ImageProps extends ImageInterface {
  updateElement: (id: string, update: {}) => void
}

const isUrl = (toCheck: string) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locator

  return !!pattern.test(toCheck)
}

const Image = ({
  id,
  x,
  y,
  src,
  updateElement,
}: ImageProps) => {
  const [tempSrc, setTempSrc] = useState('')

  return (
    <Card
      position="absolute"
      top={y}
      left={x}
      padding={8}
      elevation={2}
    >
      {
        src ? (
          <img
            alt={src}
            width={200}
            src={src}
          />
        ) : (
          <>
            <TextInput
              placeholder="Enter Image Source"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTempSrc(evt.target.value)}
              value={tempSrc}
            />
            <IconButton
              icon={TickIcon}
              intent="success"
              marginLeft={8}
              disabled={!isUrl(tempSrc)}
              onClick={() => updateElement(id, { src: tempSrc })}
            />
          </>
        )
      }
    </Card>
  )
}

export default Image