import React from "react";
import { Stepper } from "react-form-stepper";
interface StepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  labelOne: string;
  labelTwo: string;
  labelThree: string;
}
const FeaturePropertyStepper = ({
  activeStep,
  labelOne,
  labelTwo,
  labelThree,
}: StepperProps) => {
  return (
    <div className="w-full py-4">
      <Stepper
        steps={[
          { label: labelOne },
          { label: labelTwo },
          { label: labelThree },
        ]}
        activeStep={activeStep}
        className="w-full"
        connectorStyleConfig={{
          activeColor: "#00f080",
          completedColor: "#216fed",
          disabledColor: "#8effca",
          size: 2,
          style: "",
        }}
        connectorStateColors={true}
        styleConfig={{
          activeBgColor: "#00f080",
          activeTextColor: "#FFFFFF",
          completedBgColor: "#216fed",
          completedTextColor: "#ffffff",
          inactiveBgColor: "#CCCCCC",
          inactiveTextColor: "#666666",
          size: 32, // You can use numbers
          circleFontSize: "16px", // You can use strings
          labelFontSize: "14px",
          borderRadius: 4,
          fontWeight: "bold",
        }}
      />
    </div>
  );
};

export default FeaturePropertyStepper;
