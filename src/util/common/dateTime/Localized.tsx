import { format } from 'date-fns';
import { de, frCH, enUS } from 'date-fns/locale';

import {GERMAN, FRENCH, ENGLISH, LANGUAGE} from '../language/Const';
import { parseDate } from './Parse';

export function fmtDate(date: Date | string, lg: LANGUAGE, fmt: "short" | "long" | formatDateProps) {

  const effFmt = fmt === "short" 
    ? { dayOfWeek: "", month: "MMM", year: "yyyy" } as formatDateProps
    : fmt === "long"
    ? { dayOfWeek: "EEEE", month: "MMMM", year: "yyyy" } as formatDateProps
    : fmt;

  const effDate = (typeof date === 'string') ? parseDate(date) : date;

  if (effDate) {
    return formatDate(effDate, lg, effFmt);
  }

}

export const formatDayMonth = (date: Date, lg: LANGUAGE) => {
  return formatDate(date, lg, {dayOfWeek: "", month: "MMM", year: ""})
}

type formatDateProps = {
  dayOfWeek: "" | "EEEE",
  month: "MM" | "MMM" | "MMMM",
  year: "" | "yyyy"
}

export const formatDate = (date: Date, lg: LANGUAGE, {dayOfWeek, month, year}: formatDateProps) => {
  let fmt, locale;

  const day = dayOfWeek ? `${dayOfWeek}, dd` : "dd";

  switch (lg) {
    case GERMAN: locale = de; fmt = `${day}. ${month}${year ? " yyyy" : ""}`; break;
    case FRENCH: locale = frCH; fmt = `${day} ${month}${year ? " yyyy" : ""}`; break;
    default: locale = enUS; fmt = `${month} ${day}${year ? ", yyyy" : ""}`;
  }

  return format(date, fmt, {locale});
}


export const fmtTime = (date: Date, lg: LANGUAGE) => {
  if (! date) {
    return "UNKNOWN TIME";
  }

  let fmt;
  switch (lg) {
    case GERMAN: fmt = "HH:mm 'Uhr'"; break;
    case FRENCH: fmt = "HH 'h' mm"; break;
    default: fmt = "hh:mm aaa"; break;
  }

  return format(date, fmt);
}

