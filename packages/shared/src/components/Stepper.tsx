import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: { label: string }[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full bg-[#EDEFFC] py-4">
      <div className="max-w-[1360px] mx-auto px-4 md:px-0">
        <div className="flex flex-row items-center justify-center gap-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <React.Fragment key={index}>
                {/* Paso: círculo + texto en la misma línea */}
                <div className="flex flex-row items-center gap-2">
                  {/* Círculo con número */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isActive || isCompleted
                        ? 'bg-[#4F4FFF] text-white'
                        : 'border border-[#7981B2] text-[#7981B2]'
                    }`}
                  >
                    <span className="text-xs font-bold leading-4 tracking-wide">
                      {stepNumber}
                    </span>
                  </div>
                  {/* Texto del paso */}
                  <span
                    className={`text-sm whitespace-nowrap ${
                      isActive || isCompleted
                        ? 'font-bold text-[#141938]'
                        : 'font-normal text-[#7981B2]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Línea de conexión (excepto después del último paso) */}
                {index < steps.length - 1 && (
                  <div className="w-8 border-t-2 border-dashed border-[#4F4FFF]" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};