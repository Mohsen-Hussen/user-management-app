import Button from "@/app/shared/components/Button";

const ErrorState = ({
  title,
  description,
  onRetry,
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-900/60 dark:bg-red-950/30">
      <div className="text-sm font-semibold text-red-900 dark:text-red-100">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-red-800/80 dark:text-red-200/80">{description}</div>
      ) : null}
      {onRetry ? (
        <Button className="mt-4" variant="danger" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}

export default ErrorState;