export interface Post {
  Author?: string;
  Title?: string;
  CreatedOn?: string;
  Content?: string;
  id?: string;
  Image?: string;
  Category?: string;
  [x: string]: any;
}

export interface HomePost {
  data: Array<Post>;
  [x: string]: any;
}
export interface Blog {
  Author?: string;
  Title?: string;
  CreatedOn?: string;
  Content?: string;
  id?: string;
  Image1?: string;
  Image2?: string;
  [x: string]: any;
}
export interface HomeBlog {
  data: Array<Blog>;
  [x: string]: any;
}
export interface Trending {
  Author?: string;
  Title?: string;
  CreatedOn?: string;
  Content?: string;
  id?: string;
  Video1?: string;
  Image1?: string;
  [x: string]: any;
}
export interface HomeTrending {
  [x: string]: any;

  data: Array<Trending>;
}
export interface Assemble {
  Author?: string;
  Title?: string;
  CreatedOn?: string;
  Content?: string;
  id?: string;
  Image?: string;
  Category?: string;
  [x: string]: any;
}
