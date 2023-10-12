export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};

export const encodeBase64 = (str: string) => {
  try {
    if (typeof window !== 'undefined') {
      return window.btoa(encodeURIComponent(str));
    }
  } catch (err) {
    return '';
  }
};

export const decodeBase64 = (str: string) => {
  try {
    if (typeof window !== 'undefined') {
      return decodeURIComponent(window.atob(str));
    }
  } catch (err) {
    return '';
  }
};

export function formatMoney(money: number, character?: string) {
  return String(money)
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + `${character ? character : ','}`) + prev;
    });
}

export const formatPhoneNumber = (phoneNumber: string) => {
  let phone = '';
  let phoneRegister = '';
  if (phoneNumber?.trim()?.slice(0, 2) === '84') {
    phone = phoneNumber;
    phoneRegister = `0${phoneNumber?.trim()?.slice(2, phoneNumber?.length)}`;
  } else if (phoneNumber?.slice(0, 3) === '+84') {
    phone = `${phoneNumber?.slice(1, phoneNumber?.length)}`;
    phoneRegister = `0${phoneNumber?.trim()?.slice(3, phoneNumber?.length)}`;
  } else {
    phone = `84${phoneNumber?.slice(1, phoneNumber?.length)}`;
    phoneRegister = phone;
  }
  return { phone, phoneRegister };
};
