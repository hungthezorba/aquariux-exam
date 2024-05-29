import { getCoordinatesByName, IGetCoordinatesByNameParams } from "@/apis/get-coordinates-by-name";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getCoordinatesByName;

export const useGetCoordinatesByName = (params: IGetCoordinatesByNameParams, config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetCoordinatesByName.keys(params),
    queryFn: () => getCoordinatesByName(params)
  })
}

useGetCoordinatesByName.keys = (params: IGetCoordinatesByNameParams) => ['coordinates', params]