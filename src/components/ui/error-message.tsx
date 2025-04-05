interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <span className="text-xs md:text-sm text-error font-medium">{message}</span>
  );
}
