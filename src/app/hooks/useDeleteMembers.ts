import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "@/app/api/members.client";
import { memberKeys } from "@/app/api/members.keys";
import { Member } from "@/app/types";

const useDeleteMembers = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => deleteMember(id)));
      return ids;
    },
    onSuccess: (deletedIds) => {
      qc.setQueryData(memberKeys.list(), (prev: Member[] | undefined) => {
        if (!prev) return prev;
        const set = new Set(deletedIds);
        return prev.filter((m) => !set.has(m.id));
      });
      deletedIds.forEach((id) => qc.removeQueries({ queryKey: memberKeys.details(id) }));
    },
  });
};

export default useDeleteMembers;
