import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Route, Switch } from 'react-router-dom'
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import VideoShow from './components/VideoShow';
import VideoJS from './components/VideoPlayer/VideoJS'
import VideoIndex from './components/VideoIndex';

const App = () => {
  // const playerRef = React.useRef(null);

  // const videoJsOptions = {
  //     autoplay: true,
  //     controls: true,
  //     responsive: true,
  //     fluid: true,
  //     sources: [{
  //       src: '//vjs.zencdn.net/v/oceans.mp4',
  //       type: 'video/mp4'
  //     }]
  // };

  // const handlePlayerReady = (player) => {
  //     playerRef.current = player;
  
  //     // You can handle player events here, for example:
  //     player.on('waiting', () => {
  //       videojs.log('player is waiting');
  //     });
  
  //     player.on('dispose', () => {
  //       videojs.log('player will dispose');
  //     });
  // };

  return (
    <>
      <NavBar/>
      <Modal />
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
