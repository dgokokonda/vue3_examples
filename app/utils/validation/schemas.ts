import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";

// Схема для вашей формы
export const personFormSchema = toTypedSchema(
  yup.object({
    fio: yup
      .string()
      .required("ФИО обязательно для заполнения")
      .min(2, "Минимум 2 символа"),
    // .max(100, 'Максимум 100 символов')
    // .matches(/^[а-яА-ЯёЁ\s-]+$/, 'Только кириллические буквы, пробелы и дефисы'),

    phone: yup
      .string()
      .required("Телефон обязателен")
      .matches(
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        "Неверный формат телефона. Пример: +7 (999) 123-45-67",
      ),

    post: yup.string().required("Нужно заполнить должность"),
    // .oneOf(
    //   ["Developer", "Writer", "Actor", "Producer", "Housewife"],
    //   "Выберите корректную должность",
    // ),

    hobby: yup
      .array()
      // .required("Поле обязательно для заполнения")
      // .of(
      //   yup.object({
      //     id: yup.string().required(),
      //     name: yup.string().required(),
      //   }),
      // ),
      .min(1, "Выберите хотя бы одно хобби"),
    // .max(3, 'Максимум 3 хобби'),

    age: yup
      .number()
      .required("Поле обязательно для заполнения")
      // .typeError('Возраст должен быть числом')
      // .integer('Возраст должен быть целым числом')
      .min(18, "Минимум 18 лет"),
    // .max(100, 'Максимум 100 лет')
    // .nullable()
    // .transform((value, originalValue) =>
    //   originalValue === '' ? null : value
    // ),

    about_me: yup
      .string()
      .required("Поле обязательно для заполнения")
      .max(500, "Максимум 500 символов"),
    // .nullable(),

    languages: yup
      .array()
      // .of(
      //   yup.object({
      //     id: yup.string().required(),
      //     name: yup.string().required(),
      //   }),
      // )
      .min(1, "Выберите хотя бы один язык"),

    sex: yup.string().required("Пол обязателен"),
    // .oneOf(["male", "female"], "Выберите корректный пол"),

    // password: yup
    //   .string()
    //   .required("Пароль обязателен")
    //   .min(8, "Минимум 8 символов")
    //   .matches(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
    //   .matches(/[a-z]/, "Должна быть хотя бы одна строчная буква")
    //   .matches(/\d/, "Должна быть хотя бы одна цифра"),

    // confirmPassword: yup
    //   .string()
    //   .required("Подтвердите пароль")
    //   .oneOf([yup.ref("password")], "Пароли должны совпадать"),

    // email: yup
    //   .string()
    //   .required("Email обязателен")
    //   .email("Неверный формат email"),
  }),
);

// Фабрика для создания схем
// export const createFormSchema = (fields: any[]) => {
//   const schema: Record<string, any> = {};

//   fields.forEach((field) => {
//     let validator: any = field.required
//       ? yup.string().required(`${field.label} обязательно`)
//       : yup.string();

//     if (field.type === "email") {
//       validator = validator.email("Неверный формат email");
//     }

//     if (field.min) {
//       validator = validator.min(field.min, `Минимум ${field.min} символов`);
//     }

//     if (field.max || field.maxlength) {
//       const max = field.max || field.maxlength;
//       validator = validator.max(max, `Максимум ${max} символов`);
//     }

//     if (field.type === "number") {
//       validator = field.required
//         ? yup.number().required(`${field.label} обязательно`)
//         : yup.number();

//       if (field.min !== undefined) {
//         validator = validator.min(field.min, `Минимум ${field.min}`);
//       }

//       if (field.max !== undefined) {
//         validator = validator.max(field.max, `Максимум ${field.max}`);
//       }
//     }

//     schema[field.name] = validator;
//   });

//   return toTypedSchema(yup.object(schema));
// };

// utils/validation/schemas/personForm.schema.ts
