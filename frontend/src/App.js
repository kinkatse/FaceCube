import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Route, Switch } from 'react-router-dom'
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import VideoShow from './components/VideoShow';
import VideoIndex from './components/VideoIndex';
import MiniPlayer from './components/MiniPlayer';

const App = () => {

  return (
    <>
      <NavBar/>
      <Modal />
      <MiniPlayer />
      <main id='content'>
        <Switch>
          <Route exact path="/">
            <VideoIndex />
          </Route>
          <Route path="/video/:videoId">
            <VideoShow />
          </Route>
          <Route path="/channel/:channelId">
            <h1>Channel Show Page</h1>
          </Route>
          <Route path="/search">
            <h1>Search Page</h1>
          </Route>
          <Route path="/studio">
            <h1>Studio Page</h1>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
