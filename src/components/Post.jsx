import { Route, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();
  console.log(postId);
  const { posts } = useOutletContext();

  const post = posts.find((p) => p._id === postId);
  console.log(post);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <h4>Price: {post.price}</h4>
      <h4>Post created by: {post.author.username}</h4>
    </div>
  );
}
