export interface CoordinateInterface {
  x: number
  y: number
}

interface ElementBaseInterface extends CoordinateInterface {
  id: string
}

export interface StickyNoteInterface extends ElementBaseInterface {
  kind: 'sticky-note'
  text?: string
}

export interface ImageInterface extends ElementBaseInterface {
  kind: 'image'
  src?: string
}

export interface VideoInterface extends ElementBaseInterface {
  kind: 'video'
  src?: string
}

export type Kind = 'sticky-note' | 'image' | 'video'
export type Interaction = Kind | 'pointer' | 'eraser' | 'undo' | 'trash'

type Element = StickyNoteInterface | ImageInterface | VideoInterface

export default Element
