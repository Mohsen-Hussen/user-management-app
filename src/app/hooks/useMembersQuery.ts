import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/app/api/members.client";
import { memberKeys } from "@/app/api/members.keys";

const useMembersQuery = () => {
  return useQuery({
    queryKey: memberKeys.list(),
    queryFn: ({ signal }) => getMembers(signal),
  });
};

export default useMembersQuery;
