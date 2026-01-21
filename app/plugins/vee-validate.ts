import { defineNuxtPlugin } from "#app";
import { defineRule, configure } from "vee-validate";
import { required, email, min, max, url } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import ru from "@vee-validate/i18n/dist/locale/ru.json";

export default defineNuxtPlugin((nuxtApp) => {
  // Регистрируем базовые правила
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("url", url);

  // Добавляем свои правила
  defineRule("phone", (value: string) => {
    if (!value) return true;
    const phoneRegex =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRegex.test(value) || "Неверный формат телефона";
  });

  // Настраиваем локализацию
  configure({
    generateMessage: localize({
      ru: {
        ...ru,
        messages: {
          ...ru.messages,
          phone: "Неверный формат телефона",
        },
      },
    }),
  });

  // Устанавливаем язык
  setLocale("ru");
});
