import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, TwoColumnLayout, useUserDataForm } from '@rimac/shared';
import { toast } from 'sonner';
import heroImage from '../assets/hero.png';

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
  const { save, savedData } = useUserDataForm();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: savedData,
  });

  const onSubmit = (data: FormData) => {
    const result = save(data);
    if (result.success) {
      toast.success('Datos guardados correctamente');
      navigate('/step2');
    } else {
      toast.error(result.errors.join(', '));
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
          {/* Documento */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#03050F] font-semibold text-sm leading-4">Documento</label>
            <div className="flex flex-row w-full h-12">
              <select
                {...register('documentType')}
                className="w-1/3 md:w-[152px] border border-[#5E6488] rounded-l-md px-3 py-2 bg-white focus:ring-primary focus:border-primary"
              >
                <option value="DNI">DNI</option>
                <option value="CE">Carné de Extranjería</option>
              </select>
              <input
                {...register('documentNumber')}
                placeholder="87654321"
                className="flex-1 border border-l-0 border-[#5E6488] rounded-r-md px-3 py-2 bg-white focus:ring-primary focus:border-primary"
              />
            </div>
            {errors.documentNumber && <p className="text-red-500 text-xs">{errors.documentNumber.message}</p>}
          </div>

          {/* Celular */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#03050F] font-semibold text-sm leading-4">Celular</label>
            <input
              {...register('phone')}
              placeholder="987654321"
              className="w-full border border-[#5E6488] rounded-md px-3 py-2 bg-white focus:ring-primary focus:border-primary"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full">
          <Checkbox label="Acepto la Política de Privacidad" {...register('privacyAccepted')} />
          {errors.privacyAccepted && <p className="text-red-500 text-xs">{errors.privacyAccepted.message}</p>}
          <Checkbox label="Acepto la Política Comunicaciones Comerciales" wide {...register('commercialAccepted')} />
          <p className="w-full text-[#03050F] font-semibold text-xs leading-5 tracking-[0.1px] underline text-left">
            Aplican Términos y Condiciones.
          </p>
        </div>

        <Button type="submit" variant="custom" size="custom" className="w-full md:w-[195px] h-14 md:h-16 bg-[#03050F] text-white rounded-full text-base md:text-xl leading-5 md:leading-6 font-bold tracking-[0.4px] px-6 md:px-10 py-4 md:py-5 hover:bg-black transition mx-auto md:mx-0">
          Cotiza aquí
        </Button>
      </form>
    </TwoColumnLayout>
  );
};