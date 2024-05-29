import { getCurrentInfo } from "@/apis/get-current-info";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getCurrentInfo;

export const useGetCurrentInfo = (config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetCurrentInfo.keys(),
    queryFn: getCurrentInfo
  })
}

useGetCurrentInfo.keys = () => ['current-info']