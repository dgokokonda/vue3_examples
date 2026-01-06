const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с таким email не найден",
  INVALID_PASSWORD: "Неверный пароль",
  USER_DISABLED: "Пользователь заблокирован",
  INVALID_EMAIL: "Неверный email",
  EMAIL_EXISTS: "Пользователь с таким email уже существует",
  OPERATION_NOT_ALLOWED: "Операция не разрешена",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Слишком много попыток входа. Попробуйте позже",
  INVALID_CREDENTIALS: "Неверные учетные данные",
  INVALID_LOGIN_CREDENTIALS: "Неверные учетные данные",
  auth: "Необходима авторизация",
};

export function handleError(code: any) {
  return ERROR_CODES[code as keyof typeof ERROR_CODES] || "Неизвестная ошибка";
}
