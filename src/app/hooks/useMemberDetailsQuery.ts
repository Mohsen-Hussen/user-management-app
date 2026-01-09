import { useQuery } from "@tanstack/react-query";
import { getMemberDetails } from "@/app/api/members.client";
import { memberKeys } from "@/app/api/members.keys";

const useMemberDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: memberKeys.details(id),
    queryFn: ({ signal }) => getMemberDetails(id, signal),
    enabled,
  });
};

export default useMemberDetailsQuery;
