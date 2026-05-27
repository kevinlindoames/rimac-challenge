import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { updateForm } from '@rimac/shared';
import { setUser, setUserLoading, setUserError } from '../core/store/slices/userSlice';
import { fetchUser } from '../services/api';
import { calculateAge } from '../utils/helpers';
import { Button, Input, Checkbox, TwoColumnLayout } from '@rimac/shared';
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

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: savedForm,
  });

  const onSubmit = async (data: FormData) => {
    console.log('Datos enviados:', data);
    dispatch(updateForm(data));
    dispatch(setUserLoading(true));
    try {
      const userData = await fetchUser();
      const age = calculateAge(userData.birthDay);
      dispatch(setUser({ ...userData, age }));
      toast.success('Datos guardados correctamente');
      navigate('/step2');
    } catch (error) {
      console.error('Error en fetchUser:', error);
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
              {/* Select nativo usando register (funciona bien) */}
              <select
                {...register('documentType')}
                className="w-1/3 md:w-[152px] border border-[#5E6488] rounded-l-md px-3 py-2 bg-white focus:ring-primary focus:border-primary"
              >
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
              </select>

              {/* Input personalizado con Controller */}
              <Controller
                name="documentNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label=""
                    error={errors.documentNumber?.message}
                    required
                    className="flex-1 border-l-0 rounded-l-none"
                  />
                )}
              />
            </div>
            {errors.documentNumber && <p className="text-red-500 text-xs">{errors.documentNumber.message}</p>}
          </div>

          {/* Celular */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Celular"
                error={errors.phone?.message}
                required
              />
            )}
          />
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <Controller
            name="privacyAccepted"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                label="Acepto la Política de Privacidad"
              />
            )}
          />
          {errors.privacyAccepted && <p className="text-red-500 text-xs">{errors.privacyAccepted.message}</p>}

          <Controller
            name="commercialAccepted"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                label="Acepto la Política Comunicaciones Comerciales"
                wide
              />
            )}
          />

          <p className="w-full text-[#03050F] font-semibold text-xs leading-5 tracking-[0.1px] underline text-left">
            Aplican Términos y Condiciones.
          </p>
        </div>

        <Button
          type="submit"
          variant="custom"
          size="custom"
          className="w-full md:w-[195px] h-14 md:h-16 bg-[#03050F] text-white rounded-full text-base md:text-xl font-bold px-6 md:px-10 py-4 md:py-5 hover:bg-black transition mx-auto md:mx-0"
        >
          Cotiza aquí
        </Button>
      </form>
    </TwoColumnLayout>
  );
};
export default Step1_UserData;