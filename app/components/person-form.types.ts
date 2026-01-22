// person-form.types.ts

export interface BaseField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  type: string;
}

// PhoneField - добавляем value
export interface PhoneField extends BaseField {
  type: "phone";
  value: string; // ✅ Добавляем value
  mask?: string | "+{7} (000) 000-00-00";
  // options?: undefined;
  // min?: undefined;
  // maxlength?: undefined;
}

// Текстовое поле
export interface TextField extends BaseField {
  type: "text";
  value: string;
  // options?: undefined;
  // min?: undefined;
  // mask?: undefined;
  maxlength?: number;
}

// Number field
export interface NumberField extends BaseField {
  type: "number";
  value: number;
  // options?: undefined;
  min?: number;
  // mask?: undefined;
  // maxlength?: undefined;
}

// Enum field
export interface EnumField extends BaseField {
  type: "enum";
  value: string;
  options: Record<string, string>;
  // min?: undefined;
  // mask?: undefined;
  // maxlength?: undefined;
}

// Multi enum field
export interface MultiEnumField extends BaseField {
  type: "multienum";
  value: Array<{ id: string; name: string }>;
  options: Array<{ id: string; name: string }>;
  // min?: undefined;
  // mask?: undefined;
  // maxlength?: undefined;
}

// Textarea field
export interface TextareaField extends BaseField {
  type: "textarea";
  value: string;
  maxlength?: number;
  // options?: undefined;
  // min?: undefined;
  // mask?: undefined;
}

// Datepicker field
export interface DateField extends BaseField {
  type: "datetime";
  value: string;
  max?: string;
  min?: string;
  // options?: undefined;
  // min?: undefined;
  // mask?: undefined;
}

// Checkbox field (multiple select)
export interface CheckboxField extends BaseField {
  type: "checkbox";
  value: string[];
  options: Record<string, string>;
  // min?: undefined;
  // mask?: undefined;
  // maxlength?: undefined;
}

// Radio field (single select from array)
export interface RadioField extends BaseField {
  type: "radio";
  value: string;
  options: string[];
  // min?: undefined;
  // mask?: undefined;
  // maxlength?: undefined;
}

// Объединённый тип
export type Field =
  | PhoneField
  | TextField
  | EnumField
  | MultiEnumField
  | NumberField
  | TextareaField
  | CheckboxField
  | RadioField
  | DateField;

// FieldItem - используем тот же тип Field
export type FieldItem = Field;

// Альтернативно: создаём базовый тип для всех полей
export interface FieldBase {
  id: string;
  name: string;
  label: string;
  required: boolean;
  value: any; // Обязательное для всех полей
  type?: string;
  options?: any;
  min?: number;
  mask?: string;
  maxlength?: number;
}
