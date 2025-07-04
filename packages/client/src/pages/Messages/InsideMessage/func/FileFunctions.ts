export type resolutionTypes = 'ogg' | 'webp' | 'mp4'
type elementTypes = 'img' | 'audio' | 'video'

export function guesType(type: resolutionTypes): elementTypes {
  if (type === 'ogg') return 'audio'
  if (type === 'mp4') return 'video'
  return 'img'
}

export function convertToResolution(link: string): resolutionTypes {
  return link.split(".").splice(-1)[0] as resolutionTypes;
}