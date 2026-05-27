// packages/shared/src/components/Stepper.tsx
import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: { label: string }[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  const totalSteps = steps.length;
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <>
      {/* Desktop: Stepper horizontal */}
      <div className="hidden md:block w-full bg-[#EDEFFC] py-4">
        <div className="max-w-[1360px] mx-auto px-4 md:px-0">
          <div className="flex flex-row items-center justify-center gap-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              return (
                <React.Fragment key={index}>
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-col items-center">
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
                      <span
                        className={`mt-1 text-sm whitespace-nowrap ${
                          isActive || isCompleted
                            ? 'font-bold text-[#141938]'
                            : 'font-normal text-[#7981B2]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 border-t-2 border-dashed border-[#4F4FFF]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Stepper compacto con barra de progreso */}
      <div className="md:hidden w-full bg-[#FAFBFF]">
        <div className="flex flex-row items-center justify-between px-6 py-4 gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-6 h-6 rounded-full border-2 border-[#A9AFD9] flex items-center justify-center"
            aria-label="Atrás"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2.5L4 6L7.5 9.5" stroke="#A9AFD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[#141938] font-black text-xs leading-4 tracking-[0.8px] uppercase">
            PASO {currentStep} DE {totalSteps}
          </span>
          <div className="flex-1 h-1.5 bg-[#D7DBF5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F4FFF] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="w-full h-px bg-[#D7DBF5]" />
      </div>
    </>
  );
};