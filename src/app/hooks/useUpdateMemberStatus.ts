import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberStatus } from "@/app/api/members.client";
import { memberKeys } from "@/app/api/members.keys";
import type { Member, MemberStatus } from "@/app/api/members.schemas";

const useUpdateMemberStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: { id: string; status: MemberStatus }) =>
      updateMemberStatus(input.id, input.status),
    onSuccess: (updated: Member) => {
      qc.setQueryData(memberKeys.list(), (prev: Member[] | undefined) => {
        if (!prev) return prev;
        return prev.map((m) => (m.id === updated.id ? updated : m));
      });
      qc.setQueryData(memberKeys.details(updated.id), (prev: Member | undefined) => {
        if (!prev) return prev;
        return { ...prev, status: updated.status };
      });
    },
  });
};

export default useUpdateMemberStatus;
