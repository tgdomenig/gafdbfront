import { TextInit } from "../ModelsWeb/Base/InitTypes";


export const RestAPISlug = {
  en_US: `https://www.geza-anda.ch/wp-json/wp/v2/`,
  fr_FR: `https://www.geza-anda.ch/fr/wp-json/wp/v2/`,
  de_DE: `https://www.geza-anda.ch/de/wp-json/wp/v2/`
} as TextInit;

export const RestAPIEndpointNews = {
  en_US: RestAPISlug.en_US + 'itc_cpt_news',
  fr_FR: RestAPISlug.fr_FR + 'itc_cpt_news',
  de_DE: RestAPISlug.de_DE + 'itc_cpt_news'
}

export const RestAPIEndpointMedia = RestAPISlug.en_US + 'media/';
