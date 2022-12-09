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
    title: "Po Klong Garai Tower",
    texts:
      "Po Klong Garai Tower is the common name for a cluster of the most majestic and beautiful Cham towers left in Vietnam, worshiping King Po Klong Garai.",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Th%C3%A1p_Po_Klaung_Garai%2C_Phan_Rang%2C_Ninh_Thu%E1%BA%ADn.JPG/1920px-Th%C3%A1p_Po_Klaung_Garai%2C_Phan_Rang%2C_Ninh_Thu%E1%BA%ADn.JPG",
    likeCount: 99,
  },
  {
    id: 2,
    username: "phuhuunhan",
    title: "Po Nagar",
    texts:
      "Po Nagar is a Cham temple tower founded sometime before 781 C.E. and located in the medieval principality of Kauthara, near modern Nha Trang in Vietnam",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ganesh_Tempel_Po_Nagar_Nha_Trang.jpg/1920px-Ganesh_Tempel_Po_Nagar_Nha_Trang.jpg",
    likeCount: 99,
  },
  {
    id: 3,
    username: "phusuper",
    title: "My Son",
    texts:
      "Mỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central VMỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central Vietnam, constructed between the Mỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central Vietnam, constructed between the Mỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central Vietnam, constructed between the ietnam, constructed between the 4th and the 14th century by the Kings of Champa, an Indianized kingdom of the Cham people.",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/My_Son.jpg",
    likeCount: 99,
  },
  {
    id: 4,
    username: "phuhuutin",
    title: "Po Klong Garai Tower",
    texts:
      "Po Klong Garai Tower is the common name for a cluster of the most majestic and beautiful Cham towers left in Vietnam, worshiping King Po Klong Garai.",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Th%C3%A1p_Po_Klaung_Garai%2C_Phan_Rang%2C_Ninh_Thu%E1%BA%ADn.JPG/1920px-Th%C3%A1p_Po_Klaung_Garai%2C_Phan_Rang%2C_Ninh_Thu%E1%BA%ADn.JPG",
    likeCount: 99,
  },
  {
    id: 5,
    username: "phuhuunhan",
    title: "Po Nagar",
    texts:
      "Po Nagar is a Cham temple tower founded sometime before 781 C.E. and located in the medieval principality of Kauthara, near modern Nha Trang in Vietnam",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ganesh_Tempel_Po_Nagar_Nha_Trang.jpg/1920px-Ganesh_Tempel_Po_Nagar_Nha_Trang.jpg",
    likeCount: 99,
  },
  {
    id: 6,
    username: "phusuper",
    title: "My Son",
    texts:
      "Mỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central VMỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central Vietnam, constructed between the Mỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central Vietnam, constructed between the Mỹ Sơn (Vietnamese pronunciation: [mǐˀ səːn]) is a cluster of abandoned and partially ruined Hindu temples in central Vietnam, constructed between the ietnam, constructed between the 4th and the 14th century by the Kings of Champa, an Indianized kingdom of the Cham people.",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/My_Son.jpg",
    likeCount: 99,
  },
];

export type PostProps = {
  post: Post;
  handleDeletePost: (id: number) => void;
};
