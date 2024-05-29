import { getCurrentWeather, IGetCurrentWeatherParams } from "@/apis/get-current-weather";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getCurrentWeather;

export const useGetCurrentWeather = (params: IGetCurrentWeatherParams, config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetCurrentWeather.keys(params),
    queryFn: () => getCurrentWeather(params)
  })
}

useGetCurrentWeather.keys = (params: IGetCurrentWeatherParams) => ['current-weather', params]