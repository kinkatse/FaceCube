import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoJS from "../VideoPlayer/VideoJS";
import Videos from "./ImportVideos";
import logo from "../../assets/youtube-logo.png"
import './VideoShow.css'

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
        <div>
            <h1>{videoId}</h1>
            <div className='video-container'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                <div className='behind-player-background'></div>
            </div>
        </div>
    )
}

export default VideoShow;