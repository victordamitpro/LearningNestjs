import { useEffect, useState } from 'react';
import Joi from 'joi';

export function useValidateForm<T>(
  form: T,
  schema: Joi.ObjectSchema<T>,
): Joi.ValidationErrorItem[] {
  const [formError, setFormError] = useState([] as Joi.ValidationErrorItem[]);
  useEffect(() => {
    const { error } = schema.validate(form, { abortEarly: false });
    setFormError(error?.details as Joi.ValidationErrorItem[]);
  }, [form, schema]);
  return formError;
}
