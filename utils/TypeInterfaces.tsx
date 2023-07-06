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
