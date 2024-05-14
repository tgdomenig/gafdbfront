import { parseDate, parseTime } from '../../../../util/common/dateTime/Parse';
import { TextField, LongTextField, DsLink, DsImage } from '../../../../models';
import { GafImage, GafLink, HyperText } from './CommonTypes';
import { fmtDate, fmtTime } from '../../../../util/common/dateTime/Localized';
import { ENGLISH, LANGUAGE } from '../../../../util/common/language';


export function stageTime(lg: LANGUAGE, timeStr: string, date?: Date) {
  const time = parseTime(timeStr, date);
  return time && fmtTime(time, lg);
}

export function stageDate(lg: LANGUAGE, dateStr: string) {
  const date = parseDate(dateStr);
  return date && fmtDate(date, lg, "long");
}

export function stageTextFieldArray(lg: LANGUAGE, input?: TextField[] | null) {
  if (input && input.length > 0) {
    return input.map((field) => stageMandatoryTextField(lg, field));
  }
  else {
    return null;
  }
}

export function stageImage(lg: LANGUAGE, dsImage: DsImage) : GafImage {

  const {sm, md, alt} = dsImage;
  return({
    sm: sm || undefined,
    md,
    alt: alt ? stageTextField(lg, alt) : undefined
  })
}

export function stageTextField(lg: LANGUAGE, input?: TextField | null) : string | undefined {
  return input ? input[lg] || input[ENGLISH] : undefined;
}

export function stageMandatoryTextField(lg: LANGUAGE, input: TextField) : string {
  return input[lg] || input[ENGLISH]
}

export function stageLongTextField(lg: LANGUAGE, input?: LongTextField | null) : string[] | undefined {
  if (! input) { return undefined; }
  const result = input[lg];
  return (result && result.length > 0) ? result : input[ENGLISH];
}

export function stageMandatoryLongTextField(lg: LANGUAGE, input: LongTextField) : string[] {
  const result = input[lg];
  return (result && result.length > 0) ? result : input[ENGLISH];
}

export function stageGafLink(lg: LANGUAGE, dsLink: DsLink) : GafLink {
  const {label, link, variant, sort} = dsLink;
  return({
    link: stageMandatoryTextField(lg, link),
    label: stageMandatoryTextField(lg, label),
    variant,
    sort
  })
}

export async function stageRecs<S,T>(lg: LANGUAGE, recs: S[], stageFn: (lg: LANGUAGE, rec: S) => T) : Promise<T[]> {
  return (recs && recs.length > 0) ? recs.map(rec => stageFn(lg, rec)) : [];
}

/*
Parse text containing html web-links and return a list of type HyperText
*/
export function stageHyperText(text: string) : HyperText {
  const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
  const matches = Array.from(text.matchAll(htmlLinkRegex));

  const result = [];

  let start = 0;
  for (var match of matches) {
    const fullLink = match[0];
    const url = match[1];
    const subtext = match[2];
    if (match.index) {
      result.push({text: text.substring(start, match.index)});
      result.push({url, text: subtext});
      start = match.index + fullLink.length;
    }
  }
  result.push({text: text.substring(start)});

  return result as HyperText;
}
