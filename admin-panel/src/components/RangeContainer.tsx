import { MainColor } from "@/constants/Color";
import React from "react";
import { Range, getTrackBackground } from "react-range";

interface Props {
  step: number;
  max: number;
  min: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}
const RangeContainer: React.FC<Props> = ({
  max,
  min,
  step,
  setValue,
  value,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <Range
        values={[value]}
        step={step}
        min={min}
        max={max}
        onChange={(newValues) => setValue(newValues[0])}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: [value],
                  colors: [MainColor, "#ccc"],
                  min: min,
                  max: max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? MainColor : "#CCC",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RangeContainer;
