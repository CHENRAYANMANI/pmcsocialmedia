import React, { useState } from "react";
import { paginate } from "./Paginate";
import Pagination from "./Pagination";
import Post from "./Post";
const Feed = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const Posts = useSelector((state) => state.pmc.Posts);
  const pageSize = 2;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemCount = posts.length;
  const filterPost = paginate(posts, currentPage, pageSize);
  return (
    <>
      {filterPost.map((post) => (
        <Post post={post} />
      ))}
      <Pagination
        handlePageChange={handlePageChange}
        filterPost={filterPost}
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={itemCount}
      />
    </>
  );
};

export default Feed;
