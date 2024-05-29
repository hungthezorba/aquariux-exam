import { weatherAxios } from "@/lib/weather-axios"
import { generateParams } from "@/utils/generate-params"

export interface IGetCoordinatesByNameParams {
  q: string
}

export const getCoordinatesByName = (params: IGetCoordinatesByNameParams) => {
  return weatherAxios.get<IGetCoordinatesByNameResponse[]>('/geo/1.0/direct', { params: generateParams(params) }).then(res => res.data)
}

interface IGetCoordinatesByNameResponse {
  country: string
  name: string
  state: string
  lat: number
  lon: number
}