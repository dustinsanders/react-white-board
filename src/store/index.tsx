import { createStore } from 'easy-peasy'
import boardModel, { BoardModel } from './models/board'

export interface StoreModel {
  board: BoardModel
}

const storeModel: StoreModel = {
  board: boardModel,
}

export default createStore<StoreModel>(storeModel)