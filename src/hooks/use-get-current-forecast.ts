import { getCurrentForecast, IGetCurrentForecast } from "@/apis/get-current-forecast";
import { IGetCurrentWeatherParams } from "@/apis/get-current-weather";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getCurrentForecast;

export const useGetCurrentForecast = (params: IGetCurrentForecast, config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetCurrentForecast.keys(params),
    queryFn: () => getCurrentForecast(params)
  })
}

useGetCurrentForecast.keys = (params: IGetCurrentWeatherParams) => ['current-forecast', params]