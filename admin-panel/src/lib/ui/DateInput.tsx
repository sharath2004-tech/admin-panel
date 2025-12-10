import { CalendarIcon } from "@radix-ui/react-icons";
import { useField, ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/lib/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/Popover";
import { Button } from "./TableButton";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";

interface DateInputProps {
  label: string;
  name: string;
  disabled?: boolean;
  isForward?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  disabled,
  isForward = false,
}) => {
  const { currentTheme } = useTheme();
  const [field, , helpers] = useField(name);

  const handleDateSelect = (date: Date | undefined) => {
    helpers.setValue(date); // Set the selected date using Formik's setValue function
  };
  //disable dates before today or after today based on props
  const isDateDisabled = (date: Date) => {
    const currentDate = new Date();

    if (!isForward) {
      return (
        (disabled || date > currentDate || date < new Date("1900-01-01")) &&
        !field.value
      );
    } else {
      return (
        (disabled || date < currentDate || date < new Date("1900-01-01")) &&
        !field.value
      );
    }
  };
  console.log(isDateDisabled);
  return (
    <div className="w-full">
      <label
        className={`
        ${
          currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
            ? "text-white "
            : "text-gray-900"
        }
            block 
            text-xs 
            font-medium
            leading-3
            capitalize
          `}
      >
        {label}
      </label>
      <div className="mt-1 w-full">
        <Popover>
          <PopoverTrigger
            asChild
            className={`${
              currentTheme === "dark" ||
              (currentTheme === "dark" && systemTheme)
                ? "text-white bg-main-dark-bg"
                : "text-gray-900"
            } p-1  w-auto`}
          >
            <Button
              variant={"outline"}
              className={cn(
                "w-full text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span
                  className={`${
                    currentTheme === "dark" ||
                    (currentTheme === "dark" && systemTheme)
                      ? "text-white "
                      : "text-gray-900"
                  } ml-3`}
                >
                  Pick a date
                </span>
              )}
              <CalendarIcon className="ml-auto mr-3 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={`${
              currentTheme === "dark" ||
              (currentTheme === "dark" && systemTheme)
                ? "bg-main-dark-bg text-white "
                : "bg-white"
            } w-auto p-0`}
            align="start"
          >
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={handleDateSelect}
              // disabled={isDateDisabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm"
        />
        {/* {required && meta.touched && meta.error ? (
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null} */}
      </div>
    </div>
  );
};

export default DateInput;
