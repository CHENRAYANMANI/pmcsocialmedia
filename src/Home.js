import React from "react";
import Feed from "./Feed";

const Home = ({ posts }) => {
  return <>{posts.length ? <Feed posts={posts} /> : <p>post is empty</p>}</>;
};
                           
export default Home;
