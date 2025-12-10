import { useTheme } from "@/hooks/useThemeContext";
import Button from "@/lib/ui/Button";

interface Props {
  onClick: () => void;
}
const ErrorBoundary = ({ onClick }: Props) => {
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div className="flex flex-col items-center space-y-2 justify-center w-full py-5">
      <h2
        className={`${
          currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
            ? "text-white "
            : "text-gray-700"
        } text-sm  font-medium text-center`}
      >
        Something went wrong. Try again
      </h2>
      <Button onClick={onClick}>Try Again</Button>
    </div>
  );
};

export default ErrorBoundary;
