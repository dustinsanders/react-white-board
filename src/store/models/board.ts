import {
  Action,
  Computed,
  Thunk,
  action,
  computed,
  thunk,
} from 'easy-peasy'
import Element, {
  Interaction,
  CoordinateInterface,
} from '../../types/Element'
import { nanoid } from 'nanoid'

export interface BoardModel {
  elements: Computed<BoardModel, Element[]>,
  history: Element[][],
  interaction: Interaction,
  setInteraction: Action<BoardModel, Interaction>,
  setElements: Thunk<BoardModel, Element[]>,
  setHistory: Action<BoardModel, Element[][]>,
  addElement: Thunk<BoardModel, CoordinateInterface>,
  deleteElement: Thunk<BoardModel, Element>,
  updateElement: Thunk<BoardModel, { id: string, update: {}, tempUpdate?: boolean }>,
  undo: Thunk<BoardModel>,
  trash: Action<BoardModel>,
}

const elementsCacheKey = 'elements-history'

const getHistoryCache = (): Element[][] => {
  const ls = localStorage.getItem(elementsCacheKey)

  if (ls) {
    return JSON.parse(ls)
  }

  return []
}

const setHistoryCache = (payload: Element[][]) =>
  localStorage.setItem(elementsCacheKey, JSON.stringify(payload))

const boardModel: BoardModel = {
  elements: computed(state => state.history[state.history.length - 1] || []),
  history: getHistoryCache(),
  interaction: 'pointer',
  setHistory: action((state, payload) => {
      state.interaction = 'pointer'
      state.history = payload
      setHistoryCache(payload)
  }),
  setElements: thunk((actions, payload, { getState }) => {
    const nextHistory = [
      ...getState().history,
      payload,
    ]

    actions.setHistory(nextHistory)
  }),
  addElement: thunk((actions, { x, y }, { getState }) => {
    const state = getState()

    if (
      state.interaction === 'sticky-note' ||
      state.interaction === 'image' ||
      state.interaction === 'video'
    ) {
      const newElements = [
        ...state.elements,
        {
          id: nanoid(),
          x,
          y,
          kind: state.interaction,
        }
      ]

      actions.setElements(newElements)
    }
  }),
  deleteElement: thunk((actions, elementToDelete, { getState }) => {
    const state = getState()
    const newElements = state.elements.filter(element =>
      elementToDelete.id !== element.id
    )
    actions.setElements(newElements)
  }),
  updateElement: thunk((actions, { id, update, tempUpdate = false }, { getState }) => {
    const state = getState()
    const newElements = state.elements.map(element =>
      element.id === id
        ? {
          ...element,
          ...update,
        }
        : element
    )

    if (tempUpdate) {
      return actions.setHistory([
        ...state.history.slice(0, state.history.length - 1),
        newElements,
      ])
    }

    actions.setElements(newElements)
  }),
  setInteraction: action((state, payload) => {
    state.interaction = payload
  }),
  undo: thunk((actions, _payload, { getState }) => {
    const state = getState()

    if (state.history.length > 0 ) {
      const previousHistory = state.history.slice(0, state.history.length - 1)

      actions.setHistory(previousHistory)
    }
  }),
  trash: action(state => {
    state.history = []
    setHistoryCache([])
  }),
}

export default boardModel