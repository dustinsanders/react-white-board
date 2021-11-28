import ReactPlayer from 'react-player'
import MediaSource from './MediaSource'
import { VideoInterface } from '../types/Element'


const Video = ({
  id,
  src,
}: VideoInterface) => (
  <MediaSource id={id} src={src}>
    <ReactPlayer
      url={src}
      controls
    />
  </MediaSource>
)

export default Video