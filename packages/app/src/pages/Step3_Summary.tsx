import { useNavigate } from 'react-router-dom';
import { resetQuote } from '../core/store/slices/quoteSlice';
import { resetForm } from '@rimac/shared';
import { Stepper } from '@rimac/shared';
import { toast } from 'sonner';
import { useAppDispatch } from '../core/hooks/useAppDispatch';
import { useAppSelector } from '../core/hooks/useAppSelector';

const steps = [
  { label: 'Planes y coberturas' },
  { label: 'Resumen' },
];

export const Step3_Summary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.data);
  const formData = useAppSelector((state) => state.userForm);
  const quoteType = useAppSelector((state) => state.quote.type);
  const selectedPlan = useAppSelector((state) => state.quote.selectedPlan);

  if (!user || !selectedPlan) {
    navigate('/');
    return null;
  }

  const discountPercent = quoteType === 'forSomeoneElse' ? 5 : 0;
  const finalPrice = selectedPlan.price * (1 - discountPercent / 100);
  const fullName = `${user.name} ${user.lastName}`;

  const handleVolver = () => navigate('/step2');
  const handleConfirm = () => {
    dispatch(resetQuote());
    dispatch(resetForm());
    toast.success('¡Solicitud enviada con éxito! Gracias por confiar en RIMAC.');
    navigate('/');
  };

  return (
    <>
      <Stepper currentStep={2} steps={steps} />
      <div className="flex-1 flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-[1360px] mx-auto px-6 md:px-[216px] py-8 md:pt-16 md:pb-28">
          {/* Botón Volver (alineado a la izquierda, fuera de la tarjeta) */}
          <button
            onClick={handleVolver}
            className="inline-flex items-center gap-2 text-[#4F4FFF] font-bold text-lg leading-5 tracking-wide mb-6 hover:opacity-80 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#4F4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>

          {/* Tarjeta: ancho 928px, padding derecho 224px solo en desktop */}
          <div className="max-w-[928px] mx-auto">
            <div className="bg-white rounded-2xl shadow-[0px_1px_24px_rgba(174,172,243,0.25)] p-6 md:p-8 md:pr-[224px]">
              <h1 className="text-[#141938] font-bold text-3xl md:text-4xl leading-10 md:leading-[48px] tracking-[-0.6px] mb-6">
                Resumen del seguro
              </h1>

              {/* Precios calculados para */}
              <div className="mb-6">
                <p className="text-[#141938] font-black text-xs leading-4 tracking-[0.8px] uppercase mb-1">
                  PRECIOS CALCULADOS PARA:
                </p>
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#141938"/>
                  </svg>
                  <span className="text-[#141938] font-bold text-xl leading-7 tracking-[-0.2px]">
                    {fullName}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-[#D7DBF5] my-6" />

              {/* Responsable de pago */}
              <div className="mb-6">
                <p className="text-[#141938] font-bold text-base leading-6 tracking-[0.2px] mb-2">
                  Responsable de pago
                </p>
                <p className="text-[#141938] font-normal text-sm leading-6 tracking-[0.1px]">
                  DNI: {formData.documentNumber}
                </p>
                <p className="text-[#141938] font-normal text-sm leading-6 tracking-[0.1px]">
                  Celular: {formData.phone}
                </p>
              </div>

              <div className="w-full h-px bg-[#D7DBF5] my-6" />

              {/* Plan elegido */}
              <div className="mb-8">
                <p className="text-[#141938] font-bold text-base leading-6 tracking-[0.2px] mb-2">
                  Plan elegido
                </p>
                <p className="text-[#141938] font-normal text-sm leading-6 tracking-[0.1px]">
                  {selectedPlan.name}
                </p>
                <p className="text-[#141938] font-normal text-sm leading-6 tracking-[0.1px]">
                  Costo del Plan: ${finalPrice.toFixed(2)} al mes
                  {discountPercent > 0 && (
                    <span className="text-green-600 ml-2">(5% descuento aplicado)</span>
                  )}
                </p>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-[#FF1C44] text-white font-bold text-lg leading-5 tracking-wide py-3 rounded-3xl hover:bg-red-600 transition"
              >
                Confirmar y contratar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3_Summary;