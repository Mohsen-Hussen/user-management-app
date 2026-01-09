export const memberKeys = {
  all: ["members"] as const,
  list: () => [...memberKeys.all, "list"] as const,
  details: (id: string) => [...memberKeys.all, "details", id] as const,
};
