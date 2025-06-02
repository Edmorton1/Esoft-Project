import { load } from "@2gis/mapgl"
import { Clusterer } from "@2gis/mapgl-clusterer"
import { Map } from "@2gis/mapgl/types"

type MapglModule = Awaited<ReturnType<typeof load>>

export type mapDTO = [MapglModule | null, Map | null]

export type ClustererDTO = Clusterer | null

export type sexType = 'all' | 'man' | 'woman'