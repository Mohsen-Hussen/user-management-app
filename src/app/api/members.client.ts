import { http } from "./http/http";
import { MemberSchema, MemberDetailsSchema } from "./members.schemas";
import { z } from "zod";
import { Member, MemberDetails, MemberStatus } from "@/app/types";

type ListResponse = Member[];

export const getMembers = async (signal?: AbortSignal): Promise<Member[]> => {
  const data = await http<ListResponse>("/users", signal ? { signal } : {});
  return z.array(MemberSchema).parse(data) as Member[];
};

export const getMemberDetails = async (
  id: string,
  signal?: AbortSignal,
): Promise<MemberDetails> => {
  const data = await http<MemberDetails>(`/users/${id}`, signal ? { signal } : {});
  return MemberDetailsSchema.parse(data) as MemberDetails;
};

export const updateMemberStatus = async (id: string, status: MemberStatus): Promise<Member> => {
  const data = await http<Member>(`/users/${id}`, { method: "PATCH", body: { status } });
  return MemberSchema.parse(data) as Member;
};

export const updateMember = async (
  id: string,
  updates: Partial<Omit<Member, "id">>,
): Promise<Member> => {
  const data = await http<Member>(`/users/${id}`, { method: "PUT", body: updates });
  return MemberSchema.parse(data) as Member;
};

export const deleteMember = async (id: string): Promise<void> => {
  await http<void>(`/users/${id}`, { method: "DELETE" });
};
