import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUser, fetchPlans } from '../services/api';
import { calculateAge } from '../utils/helpers';
import { TwoColumnLayout } from '@rimac/shared';
import { toast } from 'sonner';
import { useAppDispatch } from '../core/hooks/useAppDispatch';
import { useAppSelector } from '../core/hooks/useAppSelector';
import { setQuoteType, setSelectedPlan } from '../core/store/slices/quoteSlice';

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

const Step2_QuoteAndPlans = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quoteType = useAppSelector((state) => state.quote.type);

  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState<number | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await fetchUser();
        const age = calculateAge(user.birthDay);
        setUserName(user.name);
        setUserAge(age);

        const plansData = await fetchPlans();
        setPlans(plansData.list);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (userAge !== null && plans.length) {
      const filtered = plans.filter((plan) => plan.age >= userAge);
      setFilteredPlans(filtered);
    }
  }, [userAge, plans]);

  const handleQuoteSelect = (type: 'forMe' | 'forSomeoneElse') => {
    dispatch(setQuoteType(type));
    toast.info(`Has seleccionado: ${type === 'forMe' ? 'Para mí' : 'Para alguien más'}`);
  };

  const handleSelectPlan = (plan: Plan) => {
    dispatch(setSelectedPlan(plan));
    navigate('/step3');
  };

  const discountPercent = quoteType === 'forSomeoneElse' ? 5 : 0;

  if (loading) {
    return <div className="text-center p-8">Cargando planes...</div>;
  }

  return (
    <TwoColumnLayout
      tag="Elige tu plan"
      title={`${userName || 'Usuario'} ¿Para quién deseas cotizar?`}
      subtitle="Selecciona la opción que se ajuste más a tus necesidades."
    >
      <div className="w-full max-w-[351px] mx-auto md:mx-0">
        {/* Tarjetas de opción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            onClick={() => handleQuoteSelect('forMe')}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
              quoteType === 'forMe' ? 'border-primary bg-blue-50' : 'border-gray-200'
            }`}
          >
            <h3 className="font-bold text-lg">Para mí</h3>
            <p className="text-sm text-gray-600">Cotiza tu seguro y agrega familiares</p>
          </div>
          <div
            onClick={() => handleQuoteSelect('forSomeoneElse')}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
              quoteType === 'forSomeoneElse' ? 'border-primary bg-blue-50' : 'border-gray-200'
            }`}
          >
            <h3 className="font-bold text-lg">Para alguien más</h3>
            <p className="text-sm text-gray-600">Cotiza para un familiar o amigo</p>
          </div>
        </div>

        {/* Lista de planes filtrados */}
        {quoteType && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Planes disponibles</h3>
            {filteredPlans.map((plan, idx) => {
              const finalPrice = plan.price * (1 - discountPercent / 100);
              return (
                <div key={idx} className="border rounded-2xl p-4 shadow-sm">
                  <h4 className="font-bold text-xl">{plan.name}</h4>
                  <p className="text-2xl text-primary font-black">
                    ${finalPrice.toFixed(2)} <span className="text-sm">/mes</span>
                  </p>
                  {discountPercent > 0 && (
                    <p className="text-sm text-green-600">5% de descuento aplicado</p>
                  )}
                  <ul className="mt-2 space-y-1">
                    {plan.description.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-1">
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="mt-3 w-full bg-primary text-white py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Seleccionar Plan
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TwoColumnLayout>
  );
};

export default Step2_QuoteAndPlans;