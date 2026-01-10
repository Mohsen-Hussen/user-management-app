export interface StatusIconProps {
  status: "active" | "absent";
  className?: string;
}

export interface PdfIconProps {
  className?: string;
}

export interface ProjectIconProps {
  iconKey: string;
  className?: string;
}

export type Filter = "all" | "active" | "absent";

export interface FilterTabsProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export interface EditMemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: import("./member").Member;
}

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isPending?: boolean;
  tone?: "danger" | "primary";
};