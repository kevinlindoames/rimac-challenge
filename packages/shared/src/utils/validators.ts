export const validateDocument = (doc: string): boolean => /^\d{8}$/.test(doc);
export const validatePhone = (phone: string): boolean => /^\d{9}$/.test(phone);