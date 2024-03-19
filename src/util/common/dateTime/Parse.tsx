import { isValid, parse, parseISO } from "date-fns";

export function parseTime(time: string, date=new Date()) : Date | undefined {

  const isValidTime = (value: string) => /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);

  const fmtIn = (time.length === 8) ? "HH:mm:ss" : ((time.length === 5) ? "HH:mm" : undefined);

  if (isValidTime(time) && fmtIn) {
    return parse(time, fmtIn, date);
  }
  else {
    return undefined;
  }
}

export function parseDate(dateStr: string) : Date | undefined {
  const date = parseISO(dateStr);
  return isValid(date) ? date : undefined;
}