import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateMember from "./useUpdateMember";
import type {
  EditMemberForm,
  MemberDetails,
  MemberProject,
  MemberUpdate,
  UseEditMemberFormDialogProps,
} from "@/app/types";
import { EditMemberSchema } from "@/app/api/members.schemas";

export const useEditMemberFormDialog = ({
  open,
  member,
  onOpenChange,
}: UseEditMemberFormDialogProps) => {
  const updateMember = useUpdateMember();

  const form = useForm<EditMemberForm>({
    resolver: zodResolver(EditMemberSchema),
    defaultValues: {
      name: member.name,
      email: member.email,
      title: member.title,
      avatarUrl: member.avatarUrl || "",
      status: member.status,
      project: {
        name: member.project.name,
        subtitle: member.project.subtitle || "",
        iconKey: member.project.iconKey || "",
      },
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: member.name,
        email: member.email,
        title: member.title,
        avatarUrl: member.avatarUrl || "",
        status: member.status,
        project: {
          name: member.project.name,
          subtitle: member.project.subtitle || "",
          iconKey: member.project.iconKey || "",
        },
      });
    }
  }, [open, member, form]);

  const onSubmit = (data: EditMemberForm) => {
    const projectUpdate: MemberProject = {
      name: data.project.name,
    };
    if (data.project.subtitle !== undefined && data.project.subtitle !== "") {
      projectUpdate.subtitle = data.project.subtitle;
    }
    if (data.project.iconKey !== undefined && data.project.iconKey !== "") {
      projectUpdate.iconKey = data.project.iconKey;
    }

    const updates: MemberUpdate = {
      name: data.name,
      email: data.email,
      title: data.title,
      status: data.status,
      project: projectUpdate,
    };

    if (data.avatarUrl !== undefined && data.avatarUrl !== "") {
      updates.avatarUrl = data.avatarUrl;
    }

    if (member.since) updates.since = member.since;
    if (member.document) updates.document = member.document;
    const memberDetails = member as MemberDetails;
    if (memberDetails.phone) updates.phone = memberDetails.phone;
    if (memberDetails.location) updates.location = memberDetails.location;
    if (memberDetails.bio) updates.bio = memberDetails.bio;

    updateMember.mutate(
      { id: member.id, updates },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      },
    );
  };

  const handleClose = () => {
    if (!updateMember.isPending) {
      onOpenChange(false);
      form.reset();
    }
  };

  return {
    form,
    onSubmit,
    handleClose,
    isPending: updateMember.isPending,
  };
};
