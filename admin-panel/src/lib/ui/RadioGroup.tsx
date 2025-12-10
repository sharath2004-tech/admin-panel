/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useFormikContext } from "formik";

const plans = [
  {
    name: "Yes I need A Banner",
    disc: "Yes",

    value: true,
  },
  {
    name: "No I donn't",
    disc: "Yes",

    value: false,
  },
];
interface RadioProps {
  label: string;
  name: string;
}
export default function RadioGroupComponent({ name, label }: RadioProps) {
  const { setFieldValue } = useFormikContext();
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full flex flex-col items-start space-y-1">
      <label
        className="
            block 
            text-sm 
            font-medium 
            leading-6 
            text-gray-900
            capitalize
            dark:text-light-gray
          "
      >
        {label}
      </label>
      <div className="w-full ">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-sky-900 bg-opacity-75 text-white"
                      : "bg-white dark:bg-white/10"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
                onClick={() => setFieldValue(name, plan.value)}
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked
                                ? "text-white"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>{plan.disc}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
