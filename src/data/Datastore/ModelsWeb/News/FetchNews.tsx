import { fetchListData } from '../../Fetch/FetchData';

import { FetchedNews } from './InitTypes';
import { RestAPIEndpointNews } from '../../Fetch/Config';

export async function fetchNews({lastUpdateDate}: {lastUpdateDate: Date}) {

  const PER_PAGE = 50;

  const {events: news_en, error: error_en} = await fetchListData<FetchedNews>({endpoint: RestAPIEndpointNews.en_US, modifiedDate: lastUpdateDate, perPage: PER_PAGE});
  if (error_en) { throw error_en; }

  const {events: news_fr, error: error_fr} = await fetchListData<FetchedNews>({endpoint: RestAPIEndpointNews.fr_FR, modifiedDate: lastUpdateDate, perPage: PER_PAGE});
  if (error_fr) { throw error_fr; }

  const {events: news_de, error: error_de} = await fetchListData<FetchedNews>({endpoint: RestAPIEndpointNews.de_DE, modifiedDate: lastUpdateDate, perPage: PER_PAGE});
  if (error_de) { throw error_de; }

  return {
    news_en,
    news_fr,
    news_de
  };
}


/*
---------------------------------- EN ----------------------------------
{
  "id": 17946,
  "date": "2023-06-12T07:22:23",
  "date_gmt": "2023-06-12T05:22:23",
  "guid": {
    "rendered": "https://geza-anda.ch/?post_type=itc_cpt_news&#038;p=17946"
  },
  "modified": "2023-06-15T13:57:21",
  "modified_gmt": "2023-06-15T11:57:21",
  "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
  "status": "publish",
  "type": "itc_cpt_news",
  "link": "https://geza-anda.ch/itc_cpt_news/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/",
  "title": {
    "rendered": "News 2023-06-12 In Touch with Talent &#8211; Christmas Magic in June"
  },
  "content": {
    "rendered": "\n<p>On 2nd June, Syrian violinist Bilal Alnemr and Czech pianist Marek Kozák played music by Smetana, Ysaÿe and Grieg for a good-humoured adult audience at the “Razzia” in Zurich, while on 3rd June, during a family concert titled &#8220;Tchaikovsky and his Nutcracker&#8221;, children&#8217;s eyes shone brightly &#8211; and not only because of the unexpected Christmas cookies, which were handed out to them.</p>\n\n\n\n<p>&#8220;In Touch with Talent&#8221; has been run jointly by the Géza Anda-Foundation and the Orpheum-Foundation for many years. Both foundations are dedicated to the promotion of young musicians.</p>\n\n\n\n<p>In the run-up to the 16th Concours Géza Anda 2024, a morning event was also held for host families, during which Marek Kozák played an interesting Rachmaninoff programme. We are still looking for host parents for the next Concours; you can find more information <a href=\"https://geza-anda.ch/the-foundation/#private-partners\">here</a>.</p>\n",
    "protected": false
  },
  "excerpt": {
    "rendered": "<p>At the joint events of the Géza Anda- and the Orpheum-Foundation one could get to know the Syrian violinist Bilal Alnemr and the Czech pianist Marek Kozák.</p>\n",
    "protected": false
  },
  "featured_media": 17947,
  "template": "",
  "categories": [
    99
  ],
  "acf": {
    "acf_title": "In Touch with Talent - Christmas Magic in June",
    "subtitle": "",
    "sub-subtitle": "",
    "acf_date": "20230612",
    "button_1_label": "",
    "button_1_link": "",
    "button_2_label": "",
    "button_2_link": "",
    "button_3_label": "",
    "button_3_link": "",
    "button_4_label": "",
    "button_4_link": "",
    "button_5_label": "",
    "button_5_link": "",
    "button_6_label": "",
    "button_6_link": "",
    "anchor": ""
  },
  "wpml_current_locale": "en_US",
  "wpml_translations": [
    {
      "locale": "fr_FR",
      "id": 17954,
      "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
      "post_title": "News 2023-06-12 In Touch with Talent - Christmas Magic in June",
      "href": "https://geza-anda.ch/fr/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
    },
    {
      "locale": "de_DE",
      "id": 17956,
      "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
      "post_title": "News 2023-06-12 In Touch with Talent - Christmas Magic in June",
      "href": "https://geza-anda.ch/de/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
    }
  ],
  "_links": {
    "self": [
      {
        "href": "https://geza-anda.ch/wp-json/wp/v2/itc_cpt_news/17946"
      }
    ],
    "collection": [
      {
        "href": "https://geza-anda.ch/wp-json/wp/v2/itc_cpt_news"
      }
    ],
    "about": [
      {
        "href": "https://geza-anda.ch/wp-json/wp/v2/types/itc_cpt_news"
      }
    ],
    "version-history": [
      {
        "count": 0,
        "href": "https://geza-anda.ch/wp-json/wp/v2/itc_cpt_news/17946/revisions"
      }
    ],
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "https://geza-anda.ch/wp-json/wp/v2/media/17947"
      }
    ],
    "wp:attachment": [
      {
        "href": "https://geza-anda.ch/wp-json/wp/v2/media?parent=17946"
      }
    ],
    "wp:term": [
      {
        "taxonomy": "category",
        "embeddable": true,
        "href": "https://geza-anda.ch/wp-json/wp/v2/categories?post=17946"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}

---------------------------------- FR ----------------------------------

{
  "id": 17954,
  "date": "2023-06-12T07:28:31",
  "date_gmt": "2023-06-12T05:28:31",
  "guid": {
    "rendered": "https://geza-anda.ch/itc_cpt_news/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
  },
  "modified": "2023-06-15T13:59:21",
  "modified_gmt": "2023-06-15T11:59:21",
  "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
  "status": "publish",
  "type": "itc_cpt_news",
  "link": "https://geza-anda.ch/fr/itc_cpt_news/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/",
  "title": {
    "rendered": "News 2023-06-12 In Touch with Talent &#8211; Christmas Magic in June"
  },
  "content": {
    "rendered": "\n<p>Le 2 juin à Zurich, le violoniste syrien Bilal Alnemr et le pianiste tchèque Marek Kozák ont joué des oeuvres de Smetana, Ysaÿe et Grieg pour un public adulte de bonne humeur, tandis que le 3 juin, pendant un concert familial intitulé « Tchaïkovski et son Casse-Noisette », les yeux des enfants ont commencé à briller &#8211; et pas seulement à cause des biscuits de Noël distribués autour.</p>\n\n<p>Le projet « In Touch with Talent » est mené conjointement par la fondation Géza Anda et la fondation Orpheum depuis de nombreuses années. Toutes deux se sont engagées à promouvoir les jeunes musiciens.</p>\n\n<p><p>&#13;\nEn amont du 16e Concours Géza Anda 2024, une séance d&rsquo;information a par ailleurs été organisée pour les familles, qui par tradition hebergent les candidats dans leurs maisons. Dans ce cadre Marek Kozák a interprété un intéressant programme dédié à l’anniversaire de Rachmaninoff. Pour le prochain Concours Géza Anda, nous sommes toujours à la recherche des hôtes pour les candidats &#8211; vous trouverez plus d&rsquo;informations <a href=\"https://geza-anda.ch/fr/la-fondation/#private-partners\">ici</a>.&#13;\n</p></p>\n",
    "protected": false
  },
  "excerpt": {
    "rendered": "<p>Cette année, les événements organisés conjointement par les fondations Géza Anda et Orpheum au Razzia de Zurich ont permis de faire la connaissance du violoniste syrien Bilal Alnemr et du pianiste tchèque Marek Kozák.</p>\n",
    "protected": false
  },
  "featured_media": 17948,
  "template": "",
  "categories": [
    99
  ],
  "acf": {
    "acf_title": "In Touch with Talent - Magie de Noël en juin",
    "subtitle": "",
    "sub-subtitle": "",
    "acf_date": "20230612",
    "button_1_label": "",
    "button_1_link": "",
    "button_2_label": "",
    "button_2_link": "",
    "button_3_label": "",
    "button_3_link": "",
    "button_4_label": "",
    "button_4_link": "",
    "button_5_label": "",
    "button_5_link": "",
    "button_6_label": "",
    "button_6_link": "",
    "anchor": ""
  },
  "wpml_current_locale": "fr_FR",
  "wpml_translations": [
    {
      "locale": "en_US",
      "id": 17946,
      "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
      "post_title": "News 2023-06-12 In Touch with Talent - Christmas Magic in June",
      "href": "https://geza-anda.ch/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
    },
    {
      "locale": "de_DE",
      "id": 17956,
      "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
      "post_title": "News 2023-06-12 In Touch with Talent - Christmas Magic in June",
      "href": "https://geza-anda.ch/de/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
    }
  ],
  "_links": {
    "self": [
      {
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/itc_cpt_news/17954"
      }
    ],
    "collection": [
      {
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/itc_cpt_news"
      }
    ],
    "about": [
      {
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/types/itc_cpt_news"
      }
    ],
    "version-history": [
      {
        "count": 0,
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/itc_cpt_news/17954/revisions"
      }
    ],
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/media/17948"
      }
    ],
    "wp:attachment": [
      {
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/media?parent=17954"
      }
    ],
    "wp:term": [
      {
        "taxonomy": "category",
        "embeddable": true,
        "href": "https://geza-anda.ch/fr/wp-json/wp/v2/categories?post=17954"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}

---------------------------------- DE ----------------------------------
{
  "id": 17956,
  "date": "2023-06-12T07:30:20",
  "date_gmt": "2023-06-12T05:30:20",
  "guid": {
    "rendered": "https://geza-anda.ch/itc_cpt_news/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
  },
  "modified": "2023-06-15T13:58:13",
  "modified_gmt": "2023-06-15T11:58:13",
  "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
  "status": "publish",
  "type": "itc_cpt_news",
  "link": "https://geza-anda.ch/de/itc_cpt_news/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/",
  "title": {
    "rendered": "News 2023-06-12 In Touch with Talent &#8211; Christmas Magic in June"
  },
  "content": {
    "rendered": "\n<p>Am 2. Juni spielten der syrische Geiger Bilal Alnemr und der tschechischen Pianist Marek Kozák in Zürich Musik von Smetana, Ysaÿe und Grieg für ein gut gelauntes erwachsenes Publikum, während am 3. Juni während eines Familienkonzerts mit dem Motto „Tschaikowski und sein Nussknacker“ Kinderaugen erglänzten – und das nicht nur wegen der unerwarteten Weihnachtsguetsli.</p>\n\n<p>Das Projekt „In Touch with Talent“ wird seit vielen Jahren von der Géza Anda- und der Orpheum-Stiftung gemeinsam durchgeführt. Beide haben sich der Förderung junger Musikerinnen und Musiker verschrieben.</p>\n\n<p><p>&#13;\nIm Vorfeld des 16. Concours Géza Anda 2024 fand zudem eine Informationsveranstaltung für Gastfamilien statt, in dessen Rahmen Marek Kozák ein interessantes Rachmaninoff-Programm spielte. Für den nächsten Concours suchen wir weiterhin Gasteltern – mehr Informationen finden Sie <a href=\"https://geza-anda.ch/de/die-stiftung/#private-partners\">hier</a>.&#13;\n</p></p>\n",
    "protected": false
  },
  "excerpt": {
    "rendered": "<p>Bei den gemeinsamen Veranstaltungen der Géza Anda- und der Orpheum-Stiftung im Zürcher Razzia konnte man dieses Jahr den syrischen Geiger Bilal Alnemr und den tschechischen Pianisten Marek Kozák kennenlernen.</p>\n",
    "protected": false
  },
  "featured_media": 17949,
  "template": "",
  "categories": [
    99
  ],
  "acf": {
    "acf_title": "In Touch with Talent - Weihnachtszauber im Juni",
    "subtitle": "",
    "sub-subtitle": "",
    "acf_date": "20230612",
    "button_1_label": "",
    "button_1_link": "",
    "button_2_label": "",
    "button_2_link": "",
    "button_3_label": "",
    "button_3_link": "",
    "button_4_label": "",
    "button_4_link": "",
    "button_5_label": "",
    "button_5_link": "",
    "button_6_label": "",
    "button_6_link": "",
    "anchor": ""
  },
  "wpml_current_locale": "de_DE",
  "wpml_translations": [
    {
      "locale": "en_US",
      "id": 17946,
      "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
      "post_title": "News 2023-06-12 In Touch with Talent - Christmas Magic in June",
      "href": "https://geza-anda.ch/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
    },
    {
      "locale": "fr_FR",
      "id": 17954,
      "slug": "news-2023-06-12-in-touch-with-talent-christmas-magic-in-june",
      "post_title": "News 2023-06-12 In Touch with Talent - Christmas Magic in June",
      "href": "https://geza-anda.ch/fr/news-2023-06-12-in-touch-with-talent-christmas-magic-in-june/"
    }
  ],
  "_links": {
    "self": [
      {
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/itc_cpt_news/17956"
      }
    ],
    "collection": [
      {
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/itc_cpt_news"
      }
    ],
    "about": [
      {
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/types/itc_cpt_news"
      }
    ],
    "version-history": [
      {
        "count": 0,
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/itc_cpt_news/17956/revisions"
      }
    ],
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/media/17949"
      }
    ],
    "wp:attachment": [
      {
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/media?parent=17956"
      }
    ],
    "wp:term": [
      {
        "taxonomy": "category",
        "embeddable": true,
        "href": "https://geza-anda.ch/de/wp-json/wp/v2/categories?post=17956"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}
*/