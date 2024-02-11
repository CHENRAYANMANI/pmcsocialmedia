import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import EditPost from "./EditPosts";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import LoginForm from "./Login";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import SignupForm from "./SignUpForm";
import api from "./api/posts";
// import "./index1.css";
import "./index2.css";
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isUserSignedUp, setIsUserSignedUp] = useState(true);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const Posts = useSelector((state) => state.pmc.Posts);
  // console.log("Posts", Posts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) return;
    const fatchData = async () => {
      try {
        const response = await api.get("post/1", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.Header);
          console.log(err.response.status);
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fatchData();
  }, [isUserLoggedIn]);

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filterResults.reverse());
  }, [posts, search]);
  useEffect(() => {
    if (isUserLoggedIn) {
      try {
        api
          .get("http://127.0.0.1:8000/user/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            // console.log("response", res);
            setUserData(res.data); // Assuming response.data contains user profile data
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [isUserLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // const date = format(new Date(), "yyyy-mm-dd HH:MM:SS");
    const newpost = { id, title: postTitle, body: postBody };
    try {
      const response = await api.post("post/1", newpost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response", response, posts);
      const addpost = [...posts, response.data];
      setPosts(addpost);
      setPostBody(" ");
      setPostTitle(" ");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const deletPost = posts.filter((post) => post.id !== id);

      setPosts(deletPost);
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };
  const handleEdit = async (id) => {
    const editpost = { id, title: postTitle, body: postBody };
    // console.log("editpost", editpost);
    try {
      const temp = posts.filter((post) => post.id !== parseInt(id));
      const response = await api.put(`post/${id}`, editpost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("response", response, posts);
      console.log("temp", temp);
      const addpost = [...temp, response.data];
      setPosts(addpost);
      setPostBody(" ");
      setPostTitle(" ");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  return (
    <div className="container App">
      {!isUserSignedUp ? (
        <SignupForm setIsUserSignedUp={setIsUserSignedUp} />
      ) : !isUserLoggedIn ? (
        <LoginForm
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsUserSignedUp={setIsUserSignedUp}
        />
      ) : (
        <>
          <Header title={"PMC SOCIAL MEDIA"} />
          <Nav
            search={search}
            setSearch={setSearch}
            setIsUserLoggedIn={setIsUserLoggedIn}
            userData={userData}
          />
          <Routes>
            <Route path="/" element={<Home posts={searchResult} />} />
            <Route path="/post">
              <Route
                index
                element={
                  <NewPost
                    postBody={postBody}
                    postTitle={postTitle}
                    setPostBody={setPostBody}
                    setPostTitle={setPostTitle}
                    handleSubmit={handleSubmit}
                  />
                }
              />
              <Route
                path=":id"
                element={
                  <PostPage
                    posts={posts}
                    handleDelete={handleDelete}
                    setPostBody={setPostBody}
                    setPostTitle={setPostTitle}
                  />
                }
              />
            </Route>
            <Route path="/about" element={<About />} />
            <Route
              path={`/editpage/:id`}
              element={
                <EditPost
                  posts={posts}
                  handleEdit={handleEdit}
                  postBody={postBody}
                  postTitle={postTitle}
                  setPostBody={setPostBody}
                  setPostTitle={setPostTitle}
                />
              }
            />

            <Route path="*" element={<Missing />} />
          </Routes>
          <Footer length={posts.length} />
        </>
      )}
    </div>
  );
}

export default App;
