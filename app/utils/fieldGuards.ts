// utils/fieldGuards.ts
import type {
  Field,
  TextField,
  PhoneField,
  EnumField,
  MultiEnumField,
  NumberField,
  TextareaField,
  CheckboxField,
  RadioField,
} from "~/components/person-form.types";

// ==================== БАЗОВЫЕ ПРОВЕРКИ ====================

/**
 * Проверяет, что у поля есть тип (даже если это undefined)
 */
export const hasType = (field: Field): field is Field & { type?: string } => {
  return "type" in field;
};

/**
 * Проверяет, что тип поля определён (не undefined)
 */
export const hasDefinedType = (
  field: Field,
): field is Field & { type: string } => {
  return hasType(field) && field.type !== undefined;
};

/**
 * Проверяет, что у поля есть значение
 */
export const hasValue = (field: Field): field is Field & { value: any } => {
  return Array.isArray(field?.value)
    ? !!field.value.length
    : Boolean(field?.value);
};

// ==================== ПРОВЕРКИ КОНКРЕТНЫХ ТИПОВ ====================

/**
 * Проверяет, что поле является текстовым полем (text, email, password)
 */
export const isTextField = (field: Field): field is TextField => {
  if (!hasDefinedType(field)) return false;
  return ["text", "email", "password"].includes(field.type);
};

/**
 * Проверяет, что поле является полем телефона
 */
export const isPhoneField = (field: Field): field is PhoneField => {
  return hasDefinedType(field) && field.type === "phone";
};

/**
 * Проверяет, что поле является полем с выбором из объекта
 */
export const isEnumField = (field: Field): field is EnumField => {
  return hasDefinedType(field) && field.type === "enum";
};

/**
 * Проверяет, что поле является полем с множественным выбором из массива объектов
 */
export const isMultiEnumField = (field: Field): field is MultiEnumField => {
  return hasDefinedType(field) && field.type === "multienum";
};

/**
 * Проверяет, что поле является числовым полем
 */
export const isNumberField = (field: Field): field is NumberField => {
  return hasDefinedType(field) && field.type === "number";
};

/**
 * Проверяет, что поле является текстовой областью (textarea)
 */
export const isTextareaField = (field: Field): field is TextareaField => {
  return hasDefinedType(field) && field.type === "textarea";
};

/**
 * Проверяет, что поле является группой чекбоксов
 */
export const isCheckboxField = (field: Field): field is CheckboxField => {
  return hasDefinedType(field) && field.type === "checkbox";
};

/**
 * Проверяет, что поле является группой радиокнопок
 */
export const isRadioField = (field: Field): field is RadioField => {
  return hasDefinedType(field) && field.type === "radio";
};

// ==================== ПРОВЕРКИ ПО СВОЙСТВАМ ====================

/**
 * Проверяет, что поле имеет опции (options)
 */
export const hasOptions = (field: Field): field is Field & { options: any } => {
  return "options" in field && field.options !== undefined;
};

/**
 * Проверяет, что поле имеет маску (mask)
 */
export const hasMask = (field: Field): field is Field & { mask: string } => {
  return "mask" in field && field.mask !== undefined;
};

/**
 * Проверяет, что поле имеет ограничение по минимальному значению
 */
export const hasMin = (field: Field): field is Field & { min: number } => {
  return "min" in field && field.min !== undefined;
};

/**
 * Проверяет, что поле имеет ограничение по максимальной длине
 */
export const hasMaxLength = (
  field: Field,
): field is Field & { maxlength: number } => {
  return "maxlength" in field && field.maxlength !== undefined;
};

// ==================== КОМБИНИРОВАННЫЕ ПРОВЕРКИ ====================

/**
 * Проверяет, что поле является селектом (любого типа с опциями)
 */
export const isSelectType = (field: Field): boolean => {
  if (!hasDefinedType(field)) return false;
  return ["enum", "multienum"].includes(field.type);
};

/**
 * Проверяет, что поле является мультиселектом (множественный выбор)
 */
export const isMultiSelect = (field: Field): boolean => {
  return isMultiEnumField(field) || isCheckboxField(field);
};

/**
 * Проверяет, что поле является сингл-селектом (одиночный выбор)
 */
export const isSingleSelect = (field: Field): boolean => {
  return isEnumField(field) || isRadioField(field);
};

/**
 * Проверяет, что поле требует валидации по маске или паттерну
 */
export const hasPatternValidation = (field: Field): boolean => {
  return isPhoneField(field) || isTextField(field);
};

/**
 * Проверяет, что поле имеет числовую валидацию (min/max)
 */
export const hasNumberValidation = (field: Field): boolean => {
  return isNumberField(field) || hasMin(field);
};

// ==================== ХЕЛПЕРЫ ДЛЯ РАБОТЫ СО ЗНАЧЕНИЯМИ ====================

/**
 * Получает безопасное строковое значение поля
 */
export const getStringValue = (field: Field): string => {
  if (
    isTextField(field) ||
    isPhoneField(field) ||
    isEnumField(field) ||
    isRadioField(field)
  ) {
    return String(field.value);
  }
  return "";
};

/**
 * Получает безопасное числовое значение поля
 */
export const getNumberValue = (field: Field): number => {
  if (isNumberField(field)) {
    return Number(field.value);
  }
  return 0;
};

/**
 * Получает безопасное значение массива для мультиселектов
 */
export const getArrayValue = (field: Field): any[] => {
  if (isMultiEnumField(field) || isCheckboxField(field)) {
    return Array.isArray(field.value) ? field.value : [];
  }
  return [];
};

/**
 * Проверяет, что значение поля не пустое (с учётом типа поля)
 */
export const isFieldValueEmpty = (field: Field): boolean => {
  if (!hasValue(field)) return true;

  if (isTextField(field) || isPhoneField(field) || isTextareaField(field)) {
    return String(field.value).trim() === "";
  }

  if (isNumberField(field)) {
    return field.value === 0 || isNaN(field.value);
  }

  if (isMultiEnumField(field) || isCheckboxField(field)) {
    return !Array.isArray(field.value) || field.value.length === 0;
  }

  if (isEnumField(field) || isRadioField(field)) {
    return String(field.value).trim() === "";
  }

  return false;
};

// ==================== ПРОВЕРКИ ДЛЯ РЕНДЕРИНГА ====================

/**
 * Определяет, нужен ли label для поля
 */
export const shouldShowLabel = (field: Field): boolean => {
  // Для checkbox/radio иногда label не нужен
  if (isCheckboxField(field) || isRadioField(field)) {
    return false;
  }
  return true;
};

/**
 * Определяет, нужно ли показывать поле как обязательное
 */
export const isFieldRequired = (field: Field): boolean => {
  return field.required === true;
};

/**
 * Получает тип input для текстовых полей
 */
export const getInputType = (field: Field): string => {
  if (isTextField(field) && hasDefinedType(field)) {
    return field.type;
  }
  if (isPhoneField(field)) {
    return "tel";
  }
  if (isNumberField(field)) {
    return "number";
  }
  return "text";
};

// ==================== ПРОВЕРКИ ДЛЯ ВАЛИДАЦИИ ====================

/**
 * Проверяет, что поле проходит базовую валидацию (required)
 */
export const validateRequired = (field: Field): boolean => {
  if (!isFieldRequired(field)) return true;
  return !isFieldValueEmpty(field);
};

/**
 * Проверяет минимальное значение для числовых полей
 */
export const validateMinValue = (field: Field): boolean => {
  if (!isNumberField(field) || !hasMin(field)) return true;
  return getNumberValue(field) >= field.min;
};

/**
 * Проверяет максимальную длину для текстовых полей
 */
export const validateMaxLength = (field: Field): boolean => {
  if (!hasMaxLength(field)) return true;
  const value = getStringValue(field);
  return value.length <= field.maxlength;
};

/**
 * Проверяет валидность телефона по маске
 */
export const validatePhone = (field: Field): boolean => {
  if (!isPhoneField(field)) return true;
  const value = getStringValue(field);

  // Базовая проверка для российских телефонов
  if (field.mask?.includes("+7")) {
    const cleanPhone = value.replace(/\D/g, "");
    return cleanPhone.length === 11 && cleanPhone.startsWith("7");
  }

  return true;
};

// ==================== УТИЛИТЫ ДЛЯ ТРАНСФОРМАЦИИ ====================

/**
 * Конвертирует поле в безопасный объект для формы
 */
export const fieldToFormData = (field: Field): Record<string, any> => {
  const base = {
    id: field.id,
    name: field.name,
    label: field.label,
    required: field.required,
    type: hasDefinedType(field) ? field.type : "text",
  };

  if (isTextField(field) || isPhoneField(field) || isTextareaField(field)) {
    return { ...base, value: getStringValue(field) };
  }

  if (isNumberField(field)) {
    return { ...base, value: getNumberValue(field), min: field.min };
  }

  if (isMultiEnumField(field) || isCheckboxField(field)) {
    return { ...base, value: getArrayValue(field), options: field.options };
  }

  if (isEnumField(field) || isRadioField(field)) {
    return { ...base, value: getStringValue(field), options: field.options };
  }

  return base;
};

/**
 * Создаёт объект ошибок валидации для поля
 */
export const validateField = (field: Field): string[] => {
  const errors: string[] = [];

  // Проверка обязательности
  if (isFieldRequired(field) && isFieldValueEmpty(field)) {
    errors.push(`${field.label} обязательно для заполнения`);
  }

  // Проверка минимального значения
  if (!validateMinValue(field)) {
    errors.push(`Значение должно быть не меньше ${(field as any).min}`);
  }

  // Проверка максимальной длины
  if (!validateMaxLength(field)) {
    errors.push(`Максимальная длина: ${(field as any).maxlength} символов`);
  }

  // Проверка телефона
  if (!validatePhone(field)) {
    errors.push("Неверный формат телефона");
  }

  return errors;
};

// ==================== ЭКСПОРТ ВСЕХ ГАРДОВ ====================

export default {
  // Базовые проверки
  hasType,
  hasDefinedType,
  hasValue,

  // Проверки типов
  isTextField,
  isPhoneField,
  isEnumField,
  isMultiEnumField,
  isNumberField,
  isTextareaField,
  isCheckboxField,
  isRadioField,

  // Проверки свойств
  hasOptions,
  hasMask,
  hasMin,
  hasMaxLength,

  // Комбинированные проверки
  isSelectType,
  isMultiSelect,
  isSingleSelect,
  hasPatternValidation,
  hasNumberValidation,

  // Хелперы для значений
  getStringValue,
  getNumberValue,
  getArrayValue,
  isFieldValueEmpty,

  // Проверки для рендеринга
  shouldShowLabel,
  isFieldRequired,
  getInputType,

  // Валидация
  validateRequired,
  validateMinValue,
  validateMaxLength,
  validatePhone,
  validateField,

  // Утилиты
  fieldToFormData,
};
