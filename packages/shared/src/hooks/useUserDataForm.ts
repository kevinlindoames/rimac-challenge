import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm, UserData } from '../store/formSlice';
import { validateDocument, validatePhone } from '../../../app/src/utils/validators';

export const useUserDataForm = () => {
  const dispatch = useDispatch();
  const savedData = useSelector((state: any) => state.userForm) as UserData;

  const save = useCallback((data: UserData) => {
    const errors: string[] = [];
    if (!validateDocument(data.documentNumber)) errors.push('DNI debe tener 8 dígitos');
    if (!validatePhone(data.phone)) errors.push('Celular debe tener 9 dígitos');
    if (!data.privacyAccepted) errors.push('Debes aceptar la Política de Privacidad');
    if (errors.length) return { success: false, errors };
    dispatch(updateForm(data));
    return { success: true, errors: [] };
  }, [dispatch]);

  return { save, savedData };
};