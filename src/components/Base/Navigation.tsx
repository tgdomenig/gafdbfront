
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { Menu } from 'antd';
import { VotingScreen } from '../Voting/VotingScreen';
import { RShortPostsScreen } from '../ShortPosts/RShortPostsScreen';
import { RCompetitorsScreen } from '../Competition/RCompetitorsScreen';
import { RSessionsScreen } from '../Competition/RSessionsScreen';
import { RAuditionScreen } from '../Competition/RAuditionScreen';
import { EditConcoursConfig } from '../ConcoursConfig/ConcoursConfigAlt';


export function NavigationMenu() {
return(
  <Menu mode="horizontal" style={{minWidth: 800}} // theme="dark" defaultSelectedKeys={['2']}
  
>
  <Menu.Item key="concours-config"><Link to="/concours-config">Concours Config</Link></Menu.Item>
  <Menu.Item key="short-posts"><Link to="/short-posts">Short Posts</Link></Menu.Item>
  <Menu.Item key="rounds"><Link to="/rounds">Rounds</Link></Menu.Item>
  <Menu.Item key="sessions"><Link to="/sessions">Sessions</Link></Menu.Item>
  <Menu.Item key="auditions"><Link to="/auditions">Recitals</Link></Menu.Item>
  <Menu.Item key="voting"><Link to="/voting">Voting</Link></Menu.Item>
</Menu>

);
}
export function NavigationRoutes() {
return(
  <Routes>
    <Route path="/concours-config" Component={EditConcoursConfig} />
    <Route path="/short-posts" Component={RShortPostsScreen} />
    <Route path="/rounds" Component={RCompetitorsScreen} />
    <Route path="/sessions" Component={RSessionsScreen} />
    <Route path="/auditions" Component={RAuditionScreen} />
    <Route path="/voting" Component={VotingScreen} />
  </Routes>
);
}
