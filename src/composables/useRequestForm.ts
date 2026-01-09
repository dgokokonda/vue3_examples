import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useRequestForm(fn: any) {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      status: "active",
    },
  });

  const {
    value: fio,
    errorMessage: fError,
    handleBlur: fBlur,
  } = useField(
    "fio",
    yup.string().trim().required("Обязательно для заполнения")
  );
  const {
    value: phone,
    errorMessage: pError,
    handleBlur: pBlur,
    // meta: phoneMeta,
  } = useField(
    "phone",
    yup
      .string()
      .trim()
      .required("Обязательно для заполнения")
      .test(
        // валидация заполнения по маске vue-the-mask
        "phone-format",
        "Введите полный номер телефона в формате +7 (XXX) XXX-XX-XX",
        (value) => {
          if (!value) return false;

          // Убираем все нецифровые символы
          const digitsOnly = value.replace(/\D/g, "");

          // Проверяем длину (7 + 10 цифр)
          if (digitsOnly.length !== 11) return false;

          // Проверяем, что начинается с 7
          if (!digitsOnly.startsWith("7")) return false;

          // Проверяем формат с маской (опционально)
          const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
          return phoneRegex.test(value);
        }
      )
      .test("phone-operator", "Неверный код оператора", (value) => {
        if (!value) return false;
        const digitsOnly = value.replace(/\D/g, "");
        const operatorCode = digitsOnly.substring(1, 4);

        // Список допустимых кодов операторов (можно расширить)
        const validOperatorCodes = [
          "900",
          "901",
          "902",
          "903",
          "904",
          "905",
          "906",
          "907",
          "908",
          "909",
          "910",
          "911",
          "912",
          "913",
          "914",
          "915",
          "916",
          "917",
          "918",
          "919",
          "920",
          "921",
          "922",
          "923",
          "924",
          "925",
          "926",
          "927",
          "928",
          "929",
          "930",
          "931",
          "932",
          "933",
          "934",
          "935",
          "936",
          "937",
          "938",
          "939",
          "940",
          "941",
          "942",
          "943",
          "944",
          "945",
          "946",
          "947",
          "948",
          "949",
          "950",
          "951",
          "952",
          "953",
          "954",
          "955",
          "956",
          "957",
          "958",
          "959",
          "960",
          "961",
          "962",
          "963",
          "964",
          "965",
          "966",
          "967",
          "968",
          "969",
          "970",
          "971",
          "972",
          "973",
          "974",
          "975",
          "976",
          "977",
          "978",
          "979",
          "980",
          "981",
          "982",
          "983",
          "984",
          "985",
          "986",
          "987",
          "988",
          "989",
          "990",
          "991",
          "992",
          "993",
          "994",
          "995",
          "996",
          "997",
          "998",
          "999",
        ];

        return validOperatorCodes.includes(operatorCode);
      })
  );
  const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur,
  } = useField(
    "amount",
    yup
      .number()
      .required("Обязательно для заполнения")
      .min(0, "Сумма не может быть меньше 0")
  );
  const { value: status } = useField("status");

  // const isPhoneValid = phoneMeta.valid && phoneMeta.validated;

  const onSubmit = handleSubmit(fn);

  return {
    isSubmitting,
    onSubmit,
    fio,
    phone,
    amount,
    status,
    fError,
    pError,
    aError,
    fBlur,
    pBlur,
    aBlur,
    // isPhoneValid,
    // phoneMeta,
  };
}
