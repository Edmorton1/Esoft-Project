export interface dataChanelMessages {
  enablingVideo: boolean,
}

export type dataChannelTypes = {
  [K in keyof dataChanelMessages]: dataChanelMessages[K] extends undefined ? {type: K} : {type: K, data: dataChanelMessages[K]}
}[keyof dataChanelMessages]