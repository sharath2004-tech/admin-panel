import MapPicker from "react-google-map-picker";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";
import { ErrorTextStyle } from "@/styles/TextStyles";

interface MapProps {
  label: string;
  name: string;
}
const MapPickerComponent = ({ name, label }: MapProps) => {
  const { setFieldValue } = useFormikContext();
  const { currentTheme } = useTheme();
  const [meta] = useField(name);
  const { value } = meta;
  function handleChangeLocation(lat: number, lng: number) {
    setFieldValue(name, [lat, lng]);
  }

  return (
    <>
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
      <MapPicker
        defaultLocation={{ lat: value[0] ?? 10, lng: value[1] ?? 106 }}
        zoom={10}
        // mapTypeId="roadmap"
        style={{ height: "300px" }}
        onChangeLocation={handleChangeLocation}
        apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY}
      />
      <ErrorMessage name={name} component="div" className={ErrorTextStyle} />
    </>
  );
};

export default MapPickerComponent;
