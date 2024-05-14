// https://www.geza-anda.ch/wp-json/wp/v2/itc_cpt_news
// https://www.geza-anda.ch/fr/wp-json/wp/v2/itc_cpt_news

// https://www.geza-anda.ch/de/wp-json/wp/v2/itc_cpt_news?_fields=title,content,excerpt,acf,status_embed=wp:featuredmedia

type RenderedValue = {
  rendered: string,
  protected?: boolean
}

type NewsLinks = {
  "wp:featuredmedia": { href: string }[]
}

type NewsAcf = {
  acf_title: string,
  subtitle: string,
  acf_date: string,
  button_1_label: string,
  button_1_link: string,
  button_2_label: string,
  button_2_link: string,
  button_3_label: string,
  button_3_link: string,
  button_4_label: string,
  button_4_link: string,
  button_5_label: string,
  button_5_link: string,
  button_6_label: string,
  button_6_link: string,
  managed_artists?: string[]
}

export type FetchedNews = {
  id: string,
  slug: string,
  wpml_translations: _WpmlTranslationRef[],
  categories: number[],
  title: RenderedValue,
  content: RenderedValue,
  excerpt: RenderedValue,
  acf: NewsAcf,
  _links: NewsLinks,
  status: string,
  featured_media: number
}

type _WpmlTranslationRef = {
   locale: string,
   id: number,
   slug: string,
   post_title: string,
   href: string
}

type _ImageSource = {
  file: string,
  height: number,
  width: number,
  mime_type: string,
  source_url: string
}

export type FetchedWpFeaturedMedia = {
  title: RenderedValue,
  source_url: string,
  media_details: {
    sizes: {
      full: _ImageSource,
      medium?: _ImageSource,
      medium_large?: _ImageSource,
      thumbnail: _ImageSource
    }
  }
}

export type WpFeaturedMedia = {
  title: string,
  sources: {
    preferred: _ImageSource,
    thumbnail: _ImageSource
  }
}

// _________________ EXAMPLE ___________________________
//
// {
//   "id": 8940,
//   "date": "2022-03-28T15:00:23",
//   "date_gmt": "2022-03-28T13:00:23",
//   "guid": {
//     "rendered": "https://geza-anda.ch/itc_cpt_news/news-2021-05-12-message-from-silvia-steiner/"
//   },
//   "modified": "2022-04-04T20:36:35",
//   "modified_gmt": "2022-04-04T18:36:35",
//   "slug": "news-2021-05-12-message-from-silvia-steiner",
//   "status": "publish",
//   "type": "itc_cpt_news",
//   "link": "https://geza-anda.ch/itc_cpt_news/news-2021-05-12-message-from-silvia-steiner/",
//   "title": {
//     "rendered": "News 2021-05-12 Message from Silvia Steiner"
//   },
//   "content": {
//     "rendered": "\n<p>The Concours Géza Anda has always been considered one of the world’s most demanding piano competitions. However, the current pandemic requires far stronger efforts from participants and organizers than ever before. My esteem for this achievement could therefore not be higher. I would aready like to wish all talented young participants good luck and fulfilment in this musical challenge.</p>\n\n\n\n<p>Silvia Steiner<em><br></em><em>President of the Swiss Conference of Cantonal Ministers of Education<br></em><em>Member of the Government Council of the Canton of Zurich and Head of the Department of Education</em></p>\n",
//     "protected": false
//   },
//   "excerpt": {
//     "rendered": "<p>The Concours Géza Anda has always been considered one of the world’s most demanding piano competitions. However, the current pandemic requires far stronger efforts from participants and organizers than ever before. My esteem for this achievement could therefore not be higher. I would aready like to wish all talented young participants good luck and fulfilment &#8230; <a title=\"News 2021-05-12 Message from Silvia Steiner\" class=\"read-more\" href=\"https://geza-anda.ch/itc_cpt_news/news-2021-05-12-message-from-silvia-steiner/\" aria-label=\"More on News 2021-05-12 Message from Silvia Steiner\">Read more</a></p>\n",
//     "protected": false
//   },
//   "featured_media": 8732,
//   "template": "",
//   "categories": [
//     118
//   ],
//   "acf": {
//     "acf_title": "Message from Silvia Steiner",
//     "subtitle": "",
//     "sub-subtitle": "",
//     "acf_date": "20210512",
//     "button_1_label": "",
//     "button_1_link": "",
//     "button_2_label": "",
//     "button_2_link": "",
//     "button_3_label": "",
//     "button_3_link": "",
//     "button_4_label": "",
//     "button_4_link": "",
//     "button_5_label": "",
//     "button_5_link": "",
//     "button_6_label": "",
//     "button_6_link": ""
//   },
//   "_links": {
//     "self": [
//       {
//         "href": "https://geza-anda.ch/wp-json/wp/v2/itc_cpt_news/8940"
//       }
//     ],
//     "collection": [
//       {
//         "href": "https://geza-anda.ch/wp-json/wp/v2/itc_cpt_news"
//       }
//     ],
//     "about": [
//       {
//         "href": "https://geza-anda.ch/wp-json/wp/v2/types/itc_cpt_news"
//       }
//     ],
//     "version-history": [
//       {
//         "count": 0,
//         "href": "https://geza-anda.ch/wp-json/wp/v2/itc_cpt_news/8940/revisions"
//       }
//     ],
//     "wp:featuredmedia": [
//       {
//         "embeddable": true,
//         "href": "https://geza-anda.ch/wp-json/wp/v2/media/8732"
//       }
//     ],
//     "wp:attachment": [
//       {
//         "href": "https://geza-anda.ch/wp-json/wp/v2/media?parent=8940"
//       }
//     ],
//     "wp:term": [
//       {
//         "taxonomy": "category",
//         "embeddable": true,
//         "href": "https://geza-anda.ch/wp-json/wp/v2/categories?post=8940"
//       }
//     ],
//     "curies": [
//       {
//         "name": "wp",
//         "href": "https://api.w.org/{rel}",
//         "templated": true
//       }
//     ]
//   }
// },



// \n<p>\r\n



/*

_________________________ MEDIA: _________________________
https://geza-anda.ch/wp-json/wp/v2/media/8732

{  
   "id":8732,
   "date":"2022-03-28T14:56:55",
   "date_gmt":"2022-03-28T12:56:55",
   "guid":{
      "rendered":"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg"
   },
   "modified":"2022-03-28T14:56:55",
   "modified_gmt":"2022-03-28T12:56:55",
   "slug":"silvia-steiner-offiziell-2021-300dpi-768x512-2",
   "status":"inherit",
   "type":"attachment",
   "link":"https:\/\/geza-anda.ch\/silvia-steiner-offiziell-2021-300dpi-768x512-2\/",
   "title":{
      "rendered":"silvia-steiner-offiziell-2021-300dpi-768&#215;512"
   },
   "author":1,
   "comment_status":"closed",
   "ping_status":"closed",
   "template":"",
   "meta":{
      "inline_featured_image":false
   },
   "acf":[
      
   ],
   "description":{
      "rendered":"<p class=\"attachment\"><a href='https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg'><img width=\"300\" height=\"200\" src=\"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2-300x200.jpeg\" class=\"attachment-medium size-medium\" alt=\"\" loading=\"lazy\" srcset=\"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2-300x200.jpeg 300w, https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg 768w\" sizes=\"(max-width: 300px) 100vw, 300px\" \/><\/a><\/p>\n"
   },
   "caption":{
      "rendered":""
   },
   "alt_text":"",
   "media_type":"image",
   "mime_type":"image\/jpeg",
   "media_details":{
      "width":768,
      "height":512,
      "file":"2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg",
      "sizes":{
         "medium":{
            "file":"silvia-steiner-offiziell-2021-300dpi-768x512-2-300x200.jpeg",
            "width":300,
            "height":200,
            "mime_type":"image\/jpeg",
            "source_url":"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2-300x200.jpeg"
         },
         "thumbnail":{
            "file":"silvia-steiner-offiziell-2021-300dpi-768x512-2-150x150.jpeg",
            "width":150,
            "height":150,
            "mime_type":"image\/jpeg",
            "source_url":"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2-150x150.jpeg"
         },
         "full":{
            "file":"silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg",
            "width":768,
            "height":512,
            "mime_type":"image\/jpeg",
            "source_url":"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg"
         }
      },
      "image_meta":{
         "aperture":"8",
         "credit":"MON",
         "camera":"Canon EOS 5D Mark IV",
         "caption":"",
         "created_timestamp":"1617199159",
         "copyright":"",
         "focal_length":"135",
         "iso":"400",
         "shutter_speed":"0.00625",
         "title":"",
         "orientation":"1",
         "keywords":[
            
         ]
      }
   },
   "post":null,
   "source_url":"https:\/\/geza-anda.ch\/wp-content\/uploads\/2022\/03\/silvia-steiner-offiziell-2021-300dpi-768x512-2.jpeg",
   "_links":{
      "self":[
         {
            "href":"https:\/\/geza-anda.ch\/wp-json\/wp\/v2\/media\/8732"
         }
      ],
      "collection":[
         {
            "href":"https:\/\/geza-anda.ch\/wp-json\/wp\/v2\/media"
         }
      ],
      "about":[
         {
            "href":"https:\/\/geza-anda.ch\/wp-json\/wp\/v2\/types\/attachment"
         }
      ],
      "author":[
         {
            "embeddable":true,
            "href":"https:\/\/geza-anda.ch\/wp-json\/wp\/v2\/users\/1"
         }
      ],
      "replies":[
         {
            "embeddable":true,
            "href":"https:\/\/geza-anda.ch\/wp-json\/wp\/v2\/comments?post=8732"
         }
      ]
   }
}

*/