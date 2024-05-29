import { ipInfoAxios } from "@/lib/ip-info-axios"

export const getCurrentInfo = () => {
  return ipInfoAxios.get<IGetCurrentWeatherResponse>('').then(res => res.data)
}

interface IGetCurrentWeatherResponse {
  country: string
  city: string
  loc: string
}