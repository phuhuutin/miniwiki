export type Post = {
  id: number;
  username?: string;
  title: string;
  texts: string;
  imgUrl: string;
  likeCount?: number | 0;
  commentList?: Comment[];
  postDate?: String;
  likeList?: Set<String>;
};
