// packages/app/src/pages/Step2_QuoteAndPlans.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setQuoteType, setSelectedPlan } from '../core/store/slices/quoteSlice';
import { fetchPlans } from '../services/api';
import { Stepper, SelectionCard, PlanCard } from '@rimac/shared';
import { toast } from 'sonner';
import { useAppDispatch } from "../core/hooks/useAppDispatch";
import { useAppSelector } from "../core/hooks/useAppSelector";
import iconMe from '../assets/icon-me.png';        
import otherIcon from "../assets/icon-other.png";
import iconClinic from '../assets/icon-clinic.png';
import iconHouse from '../assets/icon-house.png';

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

const steps = [
  { label: 'Planes y coberturas' },
  { label: 'Resumen' },
];

export const Step2_QuoteAndPlans = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quoteType = useAppSelector((state) => state.quote.type);
  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.loading);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plansData = await fetchPlans();
        setPlans(plansData.list);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar los planes');
      } finally {
        setPlansLoading(false);
      }
    };
    loadPlans();
  }, []);

  useEffect(() => {
    if (user?.age !== undefined && plans.length) {
      const filtered = plans.filter((plan) => plan.age >= user.age);
      setFilteredPlans(filtered);
    }
  }, [user, plans]);

  useEffect(() => {
    setCurrentPlanIndex(0);
  }, [quoteType, filteredPlans]);

  const handleQuoteSelect = (type: 'forMe' | 'forSomeoneElse') => {
    dispatch(setQuoteType(type));
    toast.info(`Has seleccionado: ${type === 'forMe' ? 'Para mí' : 'Para alguien más'}`);
  };

  const handleSelectPlan = (plan: Plan) => {
    dispatch(setSelectedPlan(plan));
    navigate('/step3');
  };

  const handlePrevPlan = () => {
    setCurrentPlanIndex((prev) => (prev > 0 ? prev - 1 : filteredPlans.length - 1));
  };

  const handleNextPlan = () => {
    setCurrentPlanIndex((prev) => (prev < filteredPlans.length - 1 ? prev + 1 : 0));
  };

  const getPlanIcon = (planName: string): string => {
    if (planName.toLowerCase().includes('clínica')) return iconClinic;
    return iconHouse;
  };

  if (userLoading || plansLoading) {
    return <div className="text-center p-8">Cargando...</div>;
  }

  if (!user) {
    navigate('/');
    return null;
  }

  const discountPercent = quoteType === 'forSomeoneElse' ? 5 : 0;

  return (
    <>
      <Stepper currentStep={1} steps={steps} />
      <div className="flex-1 flex flex-col items-center justify-start p-4">
        <div className="flex flex-col items-center w-full max-w-[544px] gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-2 w-full px-4 md:px-0">
            <h1 className="text-[#141938] font-bold text-[28px] md:text-[40px] leading-9 md:leading-[48px] text-center tracking-[-0.6px]">
              {user.name} ¿Para quién deseas cotizar?
            </h1>
            <p className="text-[#141938] font-normal text-base md:text-base leading-7 text-center tracking-[0.1px]">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full justify-center px-4 md:px-0">
            <SelectionCard
              title="Para mí"
              description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
              iconSrc={iconMe}
              selected={quoteType === 'forMe'}
              onSelect={() => handleQuoteSelect('forMe')}
            />
            <SelectionCard
              title="Para alguien más"
              description="Realiza una cotización para alguien diferente a ti."
              iconSrc={otherIcon}
              selected={quoteType === 'forSomeoneElse'}
              onSelect={() => handleQuoteSelect('forSomeoneElse')}
            />
          </div>
        </div>

        {quoteType && filteredPlans.length > 0 && (
          <div className="w-full py-5 pb-14 md:mt-12 md:pb-12">
            <h3 className="text-xl font-bold text-[#141938] mb-6 text-center">Planes disponibles</h3>

            {/* Desktop: grid de 3 columnas */}
            <div className="hidden md:block max-w-[928px] mx-auto px-4">
              <div className="grid grid-cols-3 gap-8 items-stretch">
                {filteredPlans.map((plan, idx) => {
                  const finalPrice = plan.price * (1 - discountPercent / 100);
                  const originalPrice = discountPercent > 0 ? plan.price : undefined;
                  return (
                    <PlanCard
                      key={idx}
                      name={plan.name}
                      originalPrice={originalPrice}
                      currentPrice={finalPrice}
                      benefits={plan.description}
                      onSelect={() => handleSelectPlan(plan)}
                      recommended={plan.name === "Plan en Casa y Clínica"}
                      discountPercent={discountPercent}
                      iconSrc={getPlanIcon(plan.name)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Mobile: carrusel con una tarjeta, altura fija para evitar saltos */}
<div className="md:hidden w-full">
  <div className="flex flex-col items-center gap-6">
                {/* Tarjeta actual - altura mínima fija para todas iguales */}
    <div className="w-[288px] mx-auto">
                  <PlanCard
                    name={filteredPlans[currentPlanIndex].name}
                    originalPrice={discountPercent > 0 ? filteredPlans[currentPlanIndex].price : undefined}
                    currentPrice={filteredPlans[currentPlanIndex].price * (1 - discountPercent / 100)}
                    benefits={filteredPlans[currentPlanIndex].description}
                    onSelect={() => handleSelectPlan(filteredPlans[currentPlanIndex])}
                    recommended={filteredPlans[currentPlanIndex].name === "Plan en Casa y Clínica"}
                    discountPercent={discountPercent}
                    iconSrc={getPlanIcon(filteredPlans[currentPlanIndex].name)}
                  />
                </div>
    <div className="flex flex-row items-center justify-center gap-4">
                  <button
                    onClick={handlePrevPlan}
                    className="w-8 h-8 rounded-full border-2 border-[#A9AFD9] flex items-center justify-center"
                    aria-label="Anterior"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 2.5L4 6L7.5 9.5" stroke="#7981B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-base font-normal text-[#141938]">
                    {currentPlanIndex + 1} / {filteredPlans.length}
                  </span>
                  <button
                    onClick={handleNextPlan}
                    className="w-8 h-8 rounded-full border-2 border-[#4F4FFF] flex items-center justify-center"
                    aria-label="Siguiente"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#4F4FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Step2_QuoteAndPlans;