import { ImageInterface } from '../types/Element'
import MediaSource from './MediaSource'

const Image = ({
  id,
  src,
}: ImageInterface) => {
  return (
    <MediaSource id={id} src={src}>
      <img
        alt={src}
        width={200}
        src={src}
        draggable={false}
      />
    </MediaSource>
  )
}

export default Image