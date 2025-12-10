import { useTheme } from "@/hooks/useThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/Option";

interface Props {
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}
const PerPageTable = ({ setPerPage }: Props) => {
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <Select onValueChange={(e) => setPerPage(Number(e))}>
      <SelectTrigger className="w-[30px] dark:text-white">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent
        className={`${
          currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
            ? "text-white bg-main-dark-bg border-gray-700"
            : "bg-white"
        }`}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <SelectItem key={pageSize} value={pageSize.toString()} className="cursor-pointer">
            {pageSize ?? 10}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PerPageTable;
