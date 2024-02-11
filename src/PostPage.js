import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = ({ setPostBody, setPostTitle, posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main>
      <article className="m-3">
        {post && (
          <>
            <h2>{post.title}</h2>
            <h4>{post.date}</h4>
            <p>{post.body}</p>
            <br></br>
            <hr></hr>
            <br></br>
            <button
              onClick={() => handleDelete(post.id)}
              className="btn btn-danger m-1 w-25 rounded-pill"
            >
              Delete post
            </button>
            <button
              onClick={() => {
                setPostBody(post.body);
                setPostTitle(post.title);
              }}
              className="btn btn-warning m-3 w-25 rounded-pill"
            >
              <Link to={`/editpage/${id}`} className="editbutton text-light ">
                edit button
              </Link>
            </button>
          </>
        )}
        {!post && (
          <>
            <p>post not found</p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
