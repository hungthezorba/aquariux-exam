import { IWeatherData } from "@/interfaces/weather"
import { weatherAxios } from "@/lib/weather-axios"
import { generateParams } from "@/utils/generate-params"

export interface IGetCurrentForecast {
  lat: string
  lon: string
  units: 'metric' | 'imperial'
}

export const getCurrentForecast = (params: IGetCurrentForecast) => {
  return weatherAxios.get<IGetCurrentForecastResponse>('/data/2.5/forecast', { params: generateParams(params) }).then(res => res.data)
}

interface IGetCurrentForecastResponse {
  list: IWeatherData[]
}