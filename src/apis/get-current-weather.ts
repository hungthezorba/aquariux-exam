import { IWeatherData } from "@/interfaces/weather"
import { weatherAxios } from "@/lib/weather-axios"
import { generateParams } from "@/utils/generate-params"

export interface IGetCurrentWeatherParams {
  lat: string
  lon: string
  units: 'metric' | 'imperial'
}

export const getCurrentWeather = (params: IGetCurrentWeatherParams) => {
  return weatherAxios.get<IGetCurrentWeatherResponse>('/data/2.5/weather', { params: generateParams(params) }).then(res => res.data)
}

interface IGetCurrentWeatherResponse extends IWeatherData {}