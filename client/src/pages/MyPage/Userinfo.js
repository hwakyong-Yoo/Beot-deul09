import { useState, useEffect } from "react";
import axios from "axios";
const UserInfo = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:80/api/hello",
    }).then((response) => setPost(response.data));
  });

  return <div>{post.msg}</div>;
};
export default UserInfo;
