
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { Layout, Menu, Typography } from 'antd';
import { ShortPostEditor } from '../ShortPosts/ShortPostEditor';
import { ShortPostsHistory } from '../ShortPosts/ShortPostsHistory';
import { VotingScreen } from '../Voting/VotingScreen';


export function NavigationMenu() {
return(
  <Menu mode="horizontal" style={{minWidth: 800}} // theme="dark" defaultSelectedKeys={['2']}
  
>
  <Menu.Item key="new-short-post"><Link to="/edit-short-post">New Short Post</Link></Menu.Item>
  <Menu.Item key="short-posts-in-db"><Link to="/history">Short Posts in DB</Link></Menu.Item>
  <Menu.Item key="voting"><Link to="/voting">Voting</Link></Menu.Item>
</Menu>

);
}
export function NavigationRoutes() {
return(
  <Routes>
    <Route path="/history" Component={ShortPostsHistory} />
    <Route path="/edit-short-post" Component={ShortPostEditor} />
    <Route path="/voting" Component={VotingScreen} />
  </Routes>
);
}
