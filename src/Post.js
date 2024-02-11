import React from "react";
import { Link } from "react-router-dom";
// import "./index1.css";

const Post = ({ post }) => {
  const styleLink = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  };
  return (
    <div>
      <article className="p-5">
        <Link to={`/post/${post.id}`} style={styleLink}>
          <h2>{post.title}</h2>
          <h4>{post.date}</h4>
        </Link>
        <p>{post.body.length <= 25 ? post.body : post.body.slice(0, 25)}</p>
        <hr></hr>
      </article>
    </div>
  );
};

export default Post;
