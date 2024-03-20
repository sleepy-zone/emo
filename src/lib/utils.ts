import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getEmoKey = (t = undefined) => {
  return dayjs(t).format('YYYY-MM-DD');
}

 // @ts-ignore utools
export const globalUtools = window.utools;

export const getEmojiFromStorage = (t = undefined) => {
  if (globalUtools) {
    let localEmos = globalUtools.dbStorage.getItem(getEmoKey(t));
    if (localEmos?.length) {
      return localEmos[localEmos.length - 1].native
    }
  }
  return null;
}

export const setEmoji2Storage = (data: any) => {
  if (globalUtools) {
    try {
      const key = getEmoKey();
      let localEmos = globalUtools.dbStorage.getItem(key);
      if (!localEmos) {
        localEmos = [];
      }
      localEmos.push(data);
      if (localEmos.length > 10) {
        localEmos.splice(0, 1);
      }
      globalUtools.dbStorage.setItem(key, localEmos);
    } catch(e) {
      console.log(e);
    }
  }
}