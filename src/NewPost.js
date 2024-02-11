import React from "react";
// import "./index1.css";

const NewPost = ({
  postBody,
  postTitle,
  setPostBody,
  setPostTitle,
  handleSubmit,
}) => {
  return (
    <main className="newpost">
      <h2 className="text-success m-3">NEW POST</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">new post title:</label>
        <input
          type="text"
          required
          placeholder="post title"
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
        <button className="btn btn-success my-3" type="submit">
          submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
