import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setQuoteType, setSelectedPlan } from "../core/store/slices/quoteSlice";
import { fetchPlans } from "../services/api";
import { Stepper, SelectionCard } from "@rimac/shared";
import { toast } from "sonner";
import { useAppDispatch } from "../core/hooks/useAppDispatch";
import { useAppSelector } from "../core/hooks/useAppSelector";
import meIcon from "../assets/icon-me.png";
import otherIcon from "../assets/icon-other.png";

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

const steps = [{ label: "Planes y coberturas" }, { label: "Resumen" }];

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
        toast.error("Error al cargar los planes");
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

  const handleQuoteSelect = (type: "forMe" | "forSomeoneElse") => {
    dispatch(setQuoteType(type));
    toast.info(
      `Has seleccionado: ${type === "forMe" ? "Para mí" : "Para alguien más"}`,
    );
  };

  const handleSelectPlan = (plan: Plan) => {
    dispatch(setSelectedPlan(plan));
    navigate("/step3");
  };

  if (userLoading || plansLoading) {
    return <div className="text-center p-8">Cargando...</div>;
  }

  if (!user) {
    navigate("/");
    return null;
  }

  const discountPercent = quoteType === "forSomeoneElse" ? 5 : 0;

  return (
    <>
      <Stepper currentStep={1} steps={steps} />
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Contenedor centrado (Frame 1000004397) */}
        <div className="flex flex-col items-center w-full max-w-[544px] gap-8">
          {/* Título y subtítulo (Frame 1000004396) */}
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="text-[#141938] font-bold text-[40px] leading-[48px] text-center tracking-[-0.6px]">
              {user.name} ¿Para quién deseas cotizar?
            </h1>
            <p className="text-[#141938] font-normal text-base leading-7 text-center tracking-[0.1px]">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>
          </div>

          {/* Tarjetas (Frame 1000004408) */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-8 w-full justify-center">
            <SelectionCard
              title="Para mí"
              description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
              iconSrc={meIcon}
              selected={quoteType === "forMe"}
              onSelect={() => handleQuoteSelect("forMe")}
            />
            <SelectionCard
              title="Para alguien más"
              description="Realiza una cotización para alguien diferente a ti."
              iconSrc={otherIcon}
              selected={quoteType === "forSomeoneElse"}
              onSelect={() => handleQuoteSelect("forSomeoneElse")}
            />
          </div>

          {/* Planes */}
          {quoteType && (
            <div className="w-full mt-4">
              <h3 className="text-xl font-bold text-[#141938] mb-4">
                Planes disponibles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPlans.map((plan, idx) => {
                  const finalPrice = plan.price * (1 - discountPercent / 100);
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
                    >
                      <h4 className="text-lg font-bold text-[#141938]">
                        {plan.name}
                      </h4>
                      <div className="mt-2">
                        <span className="text-2xl font-black text-[#4F4FFF]">
                          ${finalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500"> /mes</span>
                      </div>
                      {discountPercent > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          5% de descuento aplicado
                        </p>
                      )}
                      <ul className="mt-4 space-y-2">
                        {plan.description.slice(0, 3).map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-[#141938] flex items-start gap-2"
                          >
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
      </div>
    </>
  );
};

export default Step2_QuoteAndPlans;
