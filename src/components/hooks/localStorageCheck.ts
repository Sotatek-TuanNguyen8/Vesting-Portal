export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
export const getLocalStorage = (key: any) => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
};

export function setWithExpiry(key: any, value: any, expiration: any) {
  const now = new Date();
  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + expiration,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key: any) {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}