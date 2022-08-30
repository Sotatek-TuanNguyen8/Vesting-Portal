//eslint-disable-next-line
export const removeMark = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

export const validatePassWord = (value: string) => {
  //eslint-disable-line
  if (value.length < 8) return 0;
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])[A-Za-z\d`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]{8,}$/g.test(
      value
    )
  ) {
    return 3;
  } else if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]{8,}$/g.test(
      value
    ) ||
    /^(?=.*[A-Z])(?=.*\d)(?=.*?[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])[A-Z\d`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]{8,}$/g.test(
      value
    ) ||
    /^(?=.*[a-z])(?=.*\d)(?=.*?[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])[a-z\d`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]{8,}$/g.test(
      value
    ) ||
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(value)
  ) {
    return 2;
  } else {
    return 1;
  }
};

export const scrollIntoView = (element: React.RefObject<HTMLInputElement>) => {
  if (!element?.current) return;
  element?.current?.scrollIntoView({
    behavior: "smooth",
    inline: "nearest",
  });
};

export function convertTextAddressWallet(
  startIndex: number,
  endIndex: number,
  text: string
) {
  const startText = text?.substring(0, startIndex);
  const endText = text?.substring(text.length - endIndex);
  return startText?.concat("...")?.concat(endText);
}

export const take_decimal_number = (num: string | number, n: number) => {
  let result = Math.trunc(Number(num) * Math.pow(10, n)) / Math.pow(10, n);
  return result;
};

export const format_thousands_decimal = (num: string | number) => {
  let result = Math.trunc(Number(num) * Math.pow(10, 4)) / Math.pow(10, 4);
  const newResult = result
    .toString()
    .split(".")[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(
      result.toString().split(".")[1]
        ? "." + result.toString().split(".")[1]
        : ""
    );
  return newResult;
};

export function formatAmount(value: string) {
  return value?.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
