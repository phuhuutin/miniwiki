type ShowingCommentProps = {
  id: number;
  username: string;
  body: string;
};
export const ShowingComment = ({ id, username, body }: ShowingCommentProps) => {
  return <div>{`${username} : ${body}`}</div>;
};
