export interface NYTArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: Array<{
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    credit: string;
  }>;
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline?: {
    original: string;
    person: Array<{
      firstname: string;
      middlename: string;
      lastname: string;
      qualifier: string;
      title: string;
      role: string;
      organization: string;
      rank: number;
    }>;
    organization: string;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface NYTApiResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface SearchParams {
  q: string;
  page?: number;
  sort?: 'newest' | 'oldest' | 'relevance';
  fq?: string;
  begin_date?: string;
  end_date?: string;
}
