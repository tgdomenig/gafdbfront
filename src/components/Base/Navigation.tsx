
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { Layout, Menu, Typography } from 'antd';
import { ShortPostEditor } from '../ShortPosts/ShortPostEditor';
import { ShortPostsHistory } from '../ShortPosts/ShortPostsHistory';
import { VotingScreen } from '../Voting/VotingScreen';
import { RSelectCompetitors } from '../Competition/RSelectCompetitors';
import { RSessionEditor } from '../Competition/RSessionEditor';
import { RAuditionEditor } from '../Competition/RAuditionEditor';
import { RShortPosts } from '../ShortPosts/RShortPosts';


export function NavigationMenu() {
return(
  <Menu mode="horizontal" style={{minWidth: 800}} // theme="dark" defaultSelectedKeys={['2']}
  
>
  <Menu.Item key="short-posts"><Link to="/short-posts">Short Posts</Link></Menu.Item>
  <Menu.Item key="voting"><Link to="/rounds">Rounds</Link></Menu.Item>
  <Menu.Item key="voting"><Link to="/sessions">Sessions</Link></Menu.Item>
  <Menu.Item key="voting"><Link to="/auditions">Auditions</Link></Menu.Item>
  <Menu.Item key="voting"><Link to="/voting">Voting</Link></Menu.Item>
</Menu>

);
}
export function NavigationRoutes() {
return(
  <Routes>
    <Route path="/short-posts" Component={RShortPosts} />
    <Route path="/rounds" Component={RSelectCompetitors} />
    <Route path="/sessions" Component={RSessionEditor} />
    <Route path="/auditions" Component={RAuditionEditor} />
    <Route path="/voting" Component={VotingScreen} />
  </Routes>
);
}
