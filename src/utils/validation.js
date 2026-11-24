export function digitsOfPhone(value = '') {
  const digits = String(value).replace(/\D/g, '');
  if (digits === '') return '';
  if (digits.startsWith('8')) {
    return `7${digits.slice(1)}`;
  }
  if (digits.startsWith('7')) {
    return digits;
  }
  return `7${digits}`;
}

export function formatPhoneMask(value = '') {
  const digits = digitsOfPhone(value);
  if (!digits) return '';
  const visible = digits.slice(0, 11);
  const extra = digits.slice(11);
  const part = visible.slice(1);

  return (
    '+7' +
    (part ? ` (${part.slice(0, 3)}` : '') +
    (part.length >= 3 ? ')' : '') +
    (part.length > 3 ? ` ${part.slice(3, 6)}` : '') +
    (part.length > 6 ? `-${part.slice(6, 8)}` : '') +
    (part.length > 8 ? `-${part.slice(8, 10)}` : '') +
    (extra ? ` [лишние цифры: ${extra}]` : '')
  );
}

export function validateNameField(name = '') {
  const trimmed = String(name).trim();
  if (trimmed.length < 2) {
    return 'Введите имя не короче 2 символов.';
  }
  return '';
}

export function validateEmailField(email = '') {
  const trimmed = String(email).trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return 'Введите корректный адрес электронной почты (например, student@mail.ru).';
  }
  return '';
}

export function validatePhoneField(phone = '') {
  const digits = digitsOfPhone(phone);
  if (digits.length !== 11 || !digits.startsWith('7')) {
    return 'Введите полный номер телефона из 11 цифр.';
  }
  return '';
}

export function validateOrderForm(values, cartItems = []) {
  const errors = {};

  const nameError = validateNameField(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmailField(values.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhoneField(values.phone);
  if (phoneError) errors.phone = phoneError;

  if (!cartItems || cartItems.length === 0) {
    errors.cart = 'Добавьте хотя бы один товар в корзину перед оформлением заявки.';
  }

  if (!values.topic) {
    errors.topic = 'Выберите тему обращения.';
  }

  if (!values.agreement) {
    errors.agreement = 'Необходимо подтвердить согласие на обработку персональных данных.';
  }

  return errors;
}