
import { FetchedNews } from "./InitTypes";

import { RestAPISlug } from '../../Fetch/Config';

import { mapAsync } from '../../../../util/common/general/collections';
import { PostInit } from "../Post/InitTypes";
import { LongTextInit, TextInit } from "../Base/InitTypes";
import { fetchFeaturedImage } from "../../Fetch/FetchData";
import { format, isValid, parseISO } from "date-fns";
import { ManagedArtistsLookup } from "../../../../util/web/general/Globals";

// export type PostTypeInvariantFields = {
//   displayId?: string | null,
//   category?: string | null,
//   subcategory?: string | null,
//   tags?: string[] | null,
//   publishDate?: string | null,
//   sort?: number | null
// }

// export type PostInit = PostTypeInvariantFields & {
//   title: TextInit,
//   excerpt?: LongTextInit | null,
//   content?: PostSectionInit[] | null,
//   featuredImage?: GafLinkInit | null,
// }


export type FetchedNewsEnFrDe = {
  news_en: FetchedNews[],
  news_fr: FetchedNews[],
  news_de: FetchedNews[]
}

export async function parseNews({news_en, news_fr, news_de}: FetchedNewsEnFrDe ) : Promise<PostInit[]> {

  const findTranslatedNews = (nws_en: FetchedNews) : {nws_fr?: FetchedNews, nws_de?: FetchedNews} => {

    let nws_fr, nws_de;
    for(var transl of nws_en.wpml_translations) {
      const {locale, slug} = transl;
      switch (locale) {
        case "fr_FR": nws_fr = news_fr.find(el => el.slug === slug); break;
        case "de_DE": nws_de = news_de.find(el => el.slug === slug); break;
      }
    }
    return {nws_fr, nws_de};
  }

  const endpointEN = RestAPISlug.en_US + 'media/';

  const isNewsCategory = (news: FetchedNews) => news.categories.includes(99); // NOTE: Category "NewsArchive" is 118

  const result = await mapAsync<FetchedNews, PostInit>(async (nws_en: FetchedNews) => {

    const {nws_fr: nws_fr0, nws_de: nws_de0} = findTranslatedNews(nws_en);
    const nws_fr = nws_fr0 || nws_en; // default to english
    const nws_de = nws_de0 || nws_en; // default to english

    const title = _prepareTextField({news_en: nws_en, news_fr: nws_fr, news_de: nws_de}, "title");
    const subtitle = _prepareTextField({news_en: nws_en, news_fr: nws_fr, news_de: nws_de}, "subtitle");
    const excerpt = _prepareLongTextField({news_en: nws_en, news_fr: nws_fr, news_de: nws_de}, "excerpt");
    const content = _prepareLongTextField({news_en: nws_en, news_fr: nws_fr, news_de: nws_de}, "content");

    let featuredImage;

    /*
    BEMERKUNG: featuredMediaId ist nach Sprache unterschiedlich. 
    Da aber die Bilder und Labels aktuell nicht von der Sprache abhängen, fetchen wir nur den englischen Link
    */
    const featMediaId = nws_en.featured_media;
    if (featMediaId) {
      featuredImage = await fetchFeaturedImage(featMediaId);
      // featuredImage = {
      //   link: featImg_en?.link,
      //   label: {
      //     en_US: featImg_en?.label,
      //     fr_FR: featImg_en?.label,
      //     de_DE: featImg_en?.label,
      //   }
      // }
    }

    // managed_artists are used for sending notifications
    const {managed_artists} = nws_en.acf;

    return {
      displayId: nws_en.slug,
      title,
      excerpt, 
      content: [{
        subtitle,
        text: content
      }],
      featuredImage,
      category: isNewsCategory(nws_en) ? "News" : "Archived News",
      publishDate: _parsePublishDate(nws_en.acf.acf_date),
      tags: managed_artists ? managed_artists.map(wp_identifier => {
              const displayId = lookupManagedArtistDisplayId(wp_identifier);
              if (displayId) {
                return ("ManagedArtist:" + displayId);
              }
            }).filter(el => (!! el))
       : []
    }
  }, news_en);

  return result;

  // const news = fetchedNews.map(prepareRegularFields).map(result => ({postType: "News" as DsPostType, ...result}));


  // return news;
}

type AllNews = {
  news_en: FetchedNews,
  news_fr: FetchedNews,
  news_de: FetchedNews
}

function _textFieldAccessor(news: FetchedNews, fieldName: "title" | "subtitle") : string {
  switch (fieldName) {
    case "title": return news.title ? news.acf.acf_title : "";
    case "subtitle": return news.acf.subtitle;
  }
  return "";
}

function _longTextFieldAccessor(news: FetchedNews, fieldName: keyof FetchedNews) : string[] {
  if ((fieldName === "excerpt" && news.excerpt) || (fieldName === "content" && news.content)) {
    const raw = news[fieldName].rendered;
    return _sanitize_and_split(raw);
  }
  else return [];
}


function _prepareTextField({news_en, news_fr, news_de}: AllNews, fieldName: "title" | "subtitle") : TextInit {
  return {
    en_US: _textFieldAccessor(news_en, fieldName),
    fr_FR: _textFieldAccessor(news_fr, fieldName),
    de_DE: _textFieldAccessor(news_de, fieldName)
  }
}

function _prepareLongTextField({news_en, news_fr, news_de}: AllNews, fieldName: keyof FetchedNews) : LongTextInit {
  return {
    en_US: _longTextFieldAccessor(news_en, fieldName),
    fr_FR: _longTextFieldAccessor(news_fr, fieldName),
    de_DE: _longTextFieldAccessor(news_de, fieldName)
  }
}

function _parsePublishDate(str: string) : string | undefined {
    const date = parseISO(str);
    return isValid(date) ? format(date, 'yyyy-MM-dd') : undefined;
}

function _sanitize_and_split(text: string) : string[] {

  const texts = text.split('</p>');

  return texts.map((s: string) => removeHTMLTags(s).trim()).filter(s => s !== "");
}

export function lookupManagedArtistDisplayId(key: string) : string|undefined {

  if (ManagedArtistsLookup.has(key)) {
    return ManagedArtistsLookup.get(key);
  }
  else {
    return undefined;
  }
}

/* ----------------- Helpers ------------------- */
function removeHTMLTags(text: string) {
  // Replace <br> or <br/> with newline
  text = text.replace(/<br\s*\/?>/gi, '\n');
  
  // Replace &nbsp; with space
  text = text.replace(/&nbsp;/g, ' ');
  
  // Remove all other HTML tags
  text = text.replace(/<[^>]*>/g, '');

  return pairwiseReplace(text);
}

function pairwiseReplace(text: string) {

  const _pairwiseReplaceMap = new Map<string,string>([
    // from https://de.wikipedia.org/wiki/Hilfe:Sonderzeichenreferenz
    ["&#8211;", "—"], // en-dash
    ["&#8216;", '‘'],
    ["&#8217;", '’'],
    ["&rsquo;", '’'],
    ["&#8218;", '‚'],
    ["&#8220;", '“'],
    ["&#8221;", '”'],
    ["&#8222;", '„'],
    ["&#8230;", "..."]
  ]);
  
  function _replacer(match: string) : string {  
    return _pairwiseReplaceMap.get(match) || "";
  }
  
  const pattern = new RegExp(Object.keys(_pairwiseReplaceMap).join('|'), 'g');  

  return text.replace(pattern, _replacer);
}

