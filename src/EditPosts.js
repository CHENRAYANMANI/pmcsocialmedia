import React from "react";
import { useParams } from "react-router-dom";
// import "./index1.css";

const EditPost = ({
  postBody,
  postTitle,
  setPostBody,
  setPostTitle,
  handleEdit,
}) => {
  const { id } = useParams();
  return (
    <main className="newpost p-5">
      <h2>EDIT POST</h2>

      <label htmlFor="title">EDIT post title:</label>
      <input
        type="text"
        required
        placeholder="EDIT title"
        id="title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <label htmlFor="body">new post body: </label>
      <textarea
        type="text"
        required
        placeholder="post body"
        id="body"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
      />
      <br></br>
      <button
        className="btn btn-danger  rounded-pill "
        onClick={() => handleEdit(id)}
      >
        submit
      </button>
    </main>
  );
};

export default EditPost;
