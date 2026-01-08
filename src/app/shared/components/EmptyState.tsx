const EmptyState = ({ title, description }: { title?: string; description?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 p-10 text-center dark:border-zinc-800">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{description}</div>
      ) : null}
    </div>
  );
};

export default EmptyState;
