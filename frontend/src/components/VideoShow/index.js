import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoJS from "../VideoPlayer/VideoJS";
import Videos from "./ImportVideos";
import logo from "../../assets/youtube-logo.png"
import './VideoShow.css'
import './VideoJS.css'

const VideoShow = () => {
    const { videoId } = useParams();
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        poster: logo,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: `${Videos[videoId]}`,
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    return (
        <div className='video-whole'>
            <section className='video-show-right'>
              <div className='videojs-container'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                <div className='behind-player-background'></div>
              </div>
              <header className='video-user-header'>
                <h1 className='video-title'>Title of this Video with ID: {videoId}</h1>
              </header>
            </section>
            <section className='video-show-left'>
              Related Video Index
            </section>
        </div>
    )
}

export default VideoShow;