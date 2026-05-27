import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { updateForm } from '@rimac/shared';
import { setUser, setUserLoading, setUserError } from '../core/store/slices/userSlice';
import { fetchUser } from '../services/api';
import { calculateAge } from '../utils/helpers';
import { TwoColumnLayout } from '@rimac/shared';
import { toast } from 'sonner';
import heroImage from '../assets/hero.png';
import { useAppDispatch } from '../core/hooks/useAppDispatch';
import { useAppSelector } from '../core/hooks/useAppSelector';

const schema = z.object({
  documentType: z.enum(['DNI', 'CE']),
  documentNumber: z.string().regex(/^\d{8}$/, 'DNI debe tener 8 dígitos'),
  phone: z.string().regex(/^\d{9}$/, 'Celular debe tener 9 dígitos'),
  privacyAccepted: z.boolean().refine(val => val === true, 'Debes aceptar la Política de Privacidad'),
  commercialAccepted: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export const Step1_UserData = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedForm = useAppSelector(state => state.userForm);

  console.log('🟢 savedForm inicial desde Redux:', savedForm);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: savedForm,
  });

  // Log cada vez que cambia el formulario
  const watchedValues = watch();
  console.log('🟡 Formulario actual (watch):', watchedValues);

  const onSubmit = async (data: FormData) => {
    console.log('🔵 Envío de formulario con data:', data);
    dispatch(updateForm(data));
    dispatch(setUserLoading(true));
    try {
      const userData = await fetchUser();
      console.log('🟢 Usuario obtenido:', userData);
      const age = calculateAge(userData.birthDay);
      dispatch(setUser({ ...userData, age }));
      toast.success('Datos guardados correctamente');
      navigate('/step2');
    } catch (error) {
      console.error('🔴 Error en fetchUser:', error);
      dispatch(setUserError('Error al cargar datos del usuario'));
      toast.error('Error al cargar tus datos. Intenta de nuevo.');
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  return (
    <TwoColumnLayout
      tag="Seguro Salud Flexible"
      title="Creado para ti y tu familia"
      subtitle="Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online."
      imageSrc={heroImage}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-[351px] mx-auto md:mx-0">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#03050F] font-semibold text-sm leading-4">Documento</label>
            <div className="flex flex-row w-full h-12">
              <select
                {...register('documentType')}
                className="w-1/3 md:w-[152px] border border-[#5E6488] rounded-l-md px-3 py-2 bg-white"
              >
                <option value="DNI">DNI</option>
                <option value="CE">Carné de Extranjería</option>
              </select>
              <input
                {...register('documentNumber')}
                placeholder="87654321"
                className="flex-1 border border-l-0 border-[#5E6488] rounded-r-md px-3 py-2 bg-white"
              />
            </div>
            {errors.documentNumber && <p className="text-red-500 text-xs">{errors.documentNumber.message}</p>}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#03050F] font-semibold text-sm leading-4">Celular</label>
            <input
              {...register('phone')}
              placeholder="987654321"
              className="w-full border border-[#5E6488] rounded-md px-3 py-2 bg-white"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('privacyAccepted')} className="w-4 h-4" />
            <span>Acepto la Política de Privacidad</span>
          </label>
          {errors.privacyAccepted && <p className="text-red-500 text-xs">{errors.privacyAccepted.message}</p>}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('commercialAccepted')} className="w-4 h-4" />
            <span>Acepto la Política Comunicaciones Comerciales</span>
          </label>
          <p className="w-full text-[#03050F] font-semibold text-xs underline text-left">
            Aplican Términos y Condiciones.
          </p>
        </div>

        <button
          type="submit"
          className="w-full md:w-[195px] h-14 md:h-16 bg-[#03050F] text-white rounded-full text-base md:text-xl font-bold px-6 md:px-10 py-4 md:py-5 hover:bg-black transition mx-auto md:mx-0"
        >
          Cotiza aquí
        </button>
      </form>
    </TwoColumnLayout>
  );
};
export default Step1_UserData;