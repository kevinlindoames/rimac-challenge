import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setQuoteType, setSelectedPlan } from '../core/store/slices/quoteSlice';
import { fetchPlans } from '../services/api';
import { Stepper, TwoColumnLayout } from '@rimac/shared';
import { toast } from 'sonner';
import { useAppDispatch } from '../core/hooks/useAppDispatch';
import { useAppSelector } from '../core/hooks/useAppSelector';

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

  // Cargar planes desde la API
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

  // Filtrar planes cuando tengamos el usuario y los planes cargados
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
      <div className="flex-1 flex items-center justify-center p-4">
        <TwoColumnLayout
          tag="Elige tu plan"
          title={`${user.name} ¿Para quién deseas cotizar?`}
          subtitle="Selecciona la opción que se ajuste más a tus necesidades."
        >
          <div className="w-full max-w-[544px] mx-auto md:mx-0">
            {/* Tarjetas de selección */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Para mí */}
              <div
                onClick={() => handleQuoteSelect('forMe')}
                className={`cursor-pointer rounded-2xl p-6 shadow-lg transition-all ${
                  quoteType === 'forMe'
                    ? 'border-2 border-[#4F4FFF] bg-white'
                    : 'border border-gray-200 bg-white hover:shadow-xl'
                }`}
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#34263B] to-[#13172C] flex items-center justify-center">
                    <span className="text-white text-2xl">👤</span>
                  </div>
                  <h3 className="text-xl font-black text-[#141938]">Para mí</h3>
                  <p className="text-sm text-[#141938] opacity-80">
                    Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                  </p>
                </div>
              </div>

              {/* Para alguien más */}
              <div
                onClick={() => handleQuoteSelect('forSomeoneElse')}
                className={`cursor-pointer rounded-2xl p-6 shadow-lg transition-all ${
                  quoteType === 'forSomeoneElse'
                    ? 'border-2 border-[#4F4FFF] bg-white'
                    : 'border border-gray-200 bg-white hover:shadow-xl'
                }`}
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#34263B] to-[#13172C] flex items-center justify-center">
                    <span className="text-white text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-black text-[#141938]">Para alguien más</h3>
                  <p className="text-sm text-[#141938] opacity-80">
                    Realiza una cotización para uno de tus familiares o cualquier persona.
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de planes filtrados (solo si se seleccionó una opción) */}
            {quoteType && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#141938] mb-4">Planes disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPlans.map((plan, idx) => {
                    const finalPrice = plan.price * (1 - discountPercent / 100);
                    return (
                      <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                        <h4 className="text-lg font-bold text-[#141938]">{plan.name}</h4>
                        <div className="mt-2">
                          <span className="text-2xl font-black text-[#4F4FFF]">
                            ${finalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500"> /mes</span>
                        </div>
                        {discountPercent > 0 && (
                          <p className="text-sm text-green-600 mt-1">5% de descuento aplicado</p>
                        )}
                        <ul className="mt-4 space-y-2">
                          {plan.description.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-sm text-[#141938] flex items-start gap-2">
                              <span className="text-green-500">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleSelectPlan(plan)}
                          className="mt-6 w-full bg-[#4F4FFF] text-white py-2 rounded-full hover:bg-blue-700 transition"
                        >
                          Seleccionar Plan
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </TwoColumnLayout>
      </div>
    </>
  );
};

export default Step2_QuoteAndPlans;