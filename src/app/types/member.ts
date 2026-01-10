export type Member = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | "";
  title: string;
  since?: string;
  project: MemberProject;
  document?: MemberDocument;
  status: MemberStatus;
};

export type MemberDetails = Member & {
  phone?: string;
  location?: string;
  bio?: string;
};

export type MemberStatus = "active" | "absent";

export type MemberProject = {
  name: string;
  subtitle?: string;
  iconKey?: string;
};

export type MemberDocument = {
  filename: string;
  sizeMb: number;
};

export type EditMemberForm = {
  name: string;
  email: string;
  title: string;
  avatarUrl?: string | "";
  status: MemberStatus;
  project: MemberProject;
};

export type MemberUpdate = Partial<EditMemberForm> & {
  since?: string;
  document?: { filename: string; sizeMb: number };
  phone?: string;
  location?: string;
  bio?: string;
};

export interface UseEditMemberFormDialogProps {
  open: boolean;
  member: Member;
  onOpenChange: (open: boolean) => void;
}