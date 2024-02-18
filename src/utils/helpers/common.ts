import html2canvas from 'html2canvas';
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

export const conver1DArrayTo2DArray = (mang1D: [], soHang: number, soCot: number) => {
  let mang2D = [];
  let index = 0;

  for (let i = 0; i < soHang; i++) {
    let hang = [];
    for (let j = 0; j < soCot; j++) {
      if (index < mang1D.length) {
        hang.push(mang1D[index]);
        index++;
      }
    }
    mang2D.push(hang);
  }
  return mang2D;
};

export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'ớẩươổọộỷđãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  var to = 'oauooooydaaaaaeeeeeiiiiooooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export const captureElement = (htmlElement: HTMLElement) => {
  html2canvas(htmlElement).then((canvas) => {
    let image = canvas.toDataURL();
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = image;
    a.download = 'chung-nhan-song-khoe-gop-xanh.png';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(image);
    }, 100);
  });
};

export const filterArrayStringDuplicate = (arr: string[]) => {
  const arrUniq = new Set(arr);
  return arrUniq;
};

export const filterFinalResult = (arr: any[]) => {
  let resultArr = arr.filter((i) => {
    let name = (i.name as string).slice(0, (i.name as string).indexOf('|'));
    return name === 'F';
  });
  return resultArr
    ? resultArr.map((item) => {
        return {
          ...item,
          name: (item.name as string).slice((item.name as string).indexOf('|') + 1),
        };
      })
    : [];
};

export const filterWeeklyResult = (arr: any[]) => {
  let arrWeek = arr.filter((i) => {
    let name = (i.name as string).slice(0, (i.name as string).indexOf('|'));
    return name.includes('W');
  });
  let array = [];
  for (let i = 0; i <= 7; i++) {
    let arrFilter = arrWeek.filter((item) => {
      switch ((item.name as string).slice(0, (item.name as string).indexOf('|'))) {
        case 'W-1': {
          if (i === 0) return true;
          break;
        }
        case 'W-2': {
          if (i === 1) return true;
          break;
        }
        case 'W-3': {
          if (i === 2) return true;
          break;
        }
        case 'W-4': {
          if (i === 3) return true;
          break;
        }
        case 'W-5': {
          if (i === 4) return true;
          break;
        }
        case 'W-6': {
          if (i === 5) return true;
          break;
        }
        case 'W-7': {
          if (i === 6) return true;
          break;
        }
        case 'W-8': {
          if (i === 7) return true;
          break;
        }
      }
    });
    if (arrFilter.length > 0) {
      array.push(
        arrFilter.map((item) => {
          return {
            ...item,
            name: (item.name as string).slice((item.name as string).indexOf('|') + 1),
          };
        })
      );
    }
  }
  return array;
};

export const filterLibrary = (arr: any[]) => {
  let resultArr = arr.filter((i) => {
    return !i.name.includes('|');
  });
  return resultArr
    ? resultArr.map((item) => {
        return {
          ...item,
          name: (item.name as string).slice((item.name as string).indexOf('|') + 1),
        };
      })
    : [];
};

export function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp)$/.test(url);
}

export function isAudio(url: string) {
  return /\.(mp3|wav)$/.test(url);
}

export function isVideo(url: string) {
  return /\.(mp4|mov)$/.test(url);
}

export function join(date, options, separator) {
  function format(option) {
    let formatter = new Intl.DateTimeFormat('en', option);
    return formatter.format(date);
  }
  return options.map(format).join(separator);
}
