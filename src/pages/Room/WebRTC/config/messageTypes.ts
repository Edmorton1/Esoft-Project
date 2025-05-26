export interface dataChanelMessages {
  hangUp: undefined,
}

export type dataChannelTypes = {
  [K in keyof dataChanelMessages]: {type: K, data: dataChanelMessages[K]}
}[keyof dataChanelMessages]