import { useEditMemberFormDialog } from "@/app/hooks/useEditMemberFormDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/shared/components/Dialog";
import Button from "@/app/shared/components/Button";
import type { Member } from "@/app/api/members.schemas";

interface EditMemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member;
}

const EditMemberFormDialog = ({ open, onOpenChange, member }: EditMemberFormDialogProps) => {
  const { form, onSubmit, handleClose, isPending } = useEditMemberFormDialog({
    open,
    member,
    onOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogDescription>Update the member's information below.</DialogDescription>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Name
            </label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              disabled={isPending}
            />
            {form.formState.errors.name && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Email
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              disabled={isPending}
            />
            {form.formState.errors.email && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Title
            </label>
            <input
              type="text"
              {...form.register("title")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              disabled={isPending}
            />
            {form.formState.errors.title && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Avatar URL (optional)
            </label>
            <input
              type="url"
              {...form.register("avatarUrl")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="https://example.com/avatar.jpg"
              disabled={isPending}
            />
            {form.formState.errors.avatarUrl && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.avatarUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Status
            </label>
            <select
              {...form.register("status")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              disabled={isPending}
            >
              <option value="active">Active</option>
              <option value="absent">Absent</option>
            </select>
            {form.formState.errors.status && (
              <p className="text-red-600 text-sm mt-1">{form.formState.errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Project Name
            </label>
            <input
              type="text"
              {...form.register("project.name")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              disabled={isPending}
            />
            {form.formState.errors.project?.name && (
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.project.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Project Subtitle (optional)
            </label>
            <input
              type="text"
              {...form.register("project.subtitle")}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              disabled={isPending}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberFormDialog;
