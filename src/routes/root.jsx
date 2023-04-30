import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { BASE_URL } from "../lib/util";
import Profile from "../components/Profile";

export default function Root() {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate;

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`${BASE_URL}/posts`);

      const info = await response.json();
      setPosts(info.data.posts);
      console.log(info.data);
      console.log(info);
    }
    fetchPosts();
  }, [token]);

  useEffect(() => {
    async function myData() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          });
          const result = await response.json();
          if (result.success) {
            setUser(result.data);
          }
          // console.log(result);
        } catch (err) {
          console.error(err);
        }
      }
    }
    myData(token, setToken, setUser);
  }, [token, navigate]);

  // useEffect(() => {
  //   fetchPosts();
  // }, [token]);
  return (
    <div>
      <Navbar user={user} setUser={setUser} setToken={setToken} />

      <Outlet
        context={{
          posts,
          setToken,
          setUser,
          token,
          user,
          setPosts,
        }}
      />
    </div>
  );
}
