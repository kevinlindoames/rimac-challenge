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

  const handleQuoteSelect = (type: 'forMe' | 'forSomeoneElse') => {
    dispatch(setQuoteType(type));
    toast.info(`Has seleccionado: ${type === 'forMe' ? 'Para mí' : 'Para alguien más'}`);
  };

  const handleSelectPlan = (plan: Plan) => {
    dispatch(setSelectedPlan(plan));
    navigate('/step3');
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
        {/* Contenedor principal (tarjetas de selección) - centrado y responsivo */}
        <div className="flex flex-col items-center w-full max-w-[544px] gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="text-[#141938] font-bold text-2xl md:text-[40px] leading-8 md:leading-[48px] text-center tracking-[-0.6px]">
              {user.name} ¿Para quién deseas cotizar?
            </h1>
            <p className="text-[#141938] font-normal text-sm md:text-base leading-5 md:leading-7 text-center tracking-[0.1px]">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>
          </div>

          {/* Tarjetas de selección - en móvil se apilan con gap-4 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center">
            <SelectionCard
              title="Para mí"
              description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
              iconSrc={iconMe}
              selected={quoteType === 'forMe'}
              onSelect={() => handleQuoteSelect('forMe')}
            />
            <SelectionCard
              title="Para alguien más"
              description="Realiza una cotización para uno de tus familiares o cualquier persona."
              iconSrc={otherIcon}
              selected={quoteType === 'forSomeoneElse'}
              onSelect={() => handleQuoteSelect('forSomeoneElse')}
            />
          </div>
        </div>

        {/* Contenedor de planes - ya responsive (grid-cols-1 md:grid-cols-3) */}
        {quoteType && filteredPlans.length > 0 && (
          <div className="w-full mt-8 md:mt-12 pb-12">
            <h3 className="text-xl font-bold text-[#141938] mb-6 text-center">Planes disponibles</h3>
            <div className="max-w-[928px] mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
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
          </div>
        )}
      </div>
    </>
  );
};

export default Step2_QuoteAndPlans;