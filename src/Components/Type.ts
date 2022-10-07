export type Post = {
  id: number;
  username: string;
  title: string;
  texts: string;
  imgUrl: string;
  likeCount: number | 0;
  commentList?: Comment[];
};

export type Comment = {
  id: number;
  username: string;
  texts: string;
};

export const data: Post[] = [
  {
    id: 1,
    username: "phuhuutin",
    title: "Hamutaran",
    texts: "My Homeland",
    imgUrl: "*a img url link*",
    likeCount: 99,
  },
  {
    id: 2,
    username: "phuhuu",
    title: "Kauthara",
    texts: "My Homeland",
    imgUrl: "*a img url link*",
    likeCount: 99,
  },
  {
    id: 3,
    username: "phu",
    title: "Panduranga",
    texts: "My Homeland",
    imgUrl: "*a img url link*",
    likeCount: 99,
  },
];

export type PostProps = {
  post: Post;
  handleDeletePost: (id: number) => void;
};
