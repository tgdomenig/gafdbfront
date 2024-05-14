import React, { useState, useEffect } from 'react';

const FacebookPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
//          'https://www.facebook.com/concoursgezaanda/posts/pfbid02bruLHkoXdYaA4kedFp41QgpC58M6hLhnLRaSx3L5Xibv2BAhKt896p7UbgSXqqwxl'
          'https://graph.facebook.com/v13.0/865797115345474?fields=message,full_picture'
        );
        const data = await response.json();
        console.log(data);
        setPosts(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Facebook Posts</h1>
      {/* {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.message}</h3>
          <p>{post.created_time}</p>
        </div>
      ))} */}
    </div>
  );
};

export default FacebookPosts;
