import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "@/app/api/members.client";
import { memberKeys } from "@/app/api/members.keys";
import type { Member } from "@/app/types";

const useUpdateMember = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: { id: string; updates: Partial<Omit<Member, "id">> }) =>
      updateMember(input.id, input.updates),
    onSuccess: (updated: Member) => {
      qc.setQueryData(memberKeys.list(), (prev: Member[] | undefined) => {
        if (!prev) return prev;
        return prev.map((m) => (m.id === updated.id ? updated : m));
      });
      qc.setQueryData(memberKeys.details(updated.id), (prev: Member | undefined) => {
        if (!prev) return prev;
        return updated;
      });
    },
  });
};

export default useUpdateMember;
