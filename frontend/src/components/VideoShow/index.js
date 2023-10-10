import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getVideo } from '../../store/video';
import VideoInfoHeader from './VideoInfoHeader';
import VideoJS from "../VideoPlayer/VideoJS";
// import Videos from "./ImportVideos";
// import logo from "../../assets/youtube-logo.png"
import './VideoShow.css'
import './VideoJS.css'
import VideoIndex from '../VideoIndex';

const VideoShow = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch()
    const video = useSelector(state => state.entities.videos[videoId])

    useEffect(() => {
        dispatch(getVideo(videoId))
    }, [videoId])

    const playerRef = React.useRef(null);

    if (!video) return null;

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        // poster: logo,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: `${video?.file}`,
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
              <VideoInfoHeader video={video}/>
            </section>
            <section className='video-show-left'>
              <VideoIndex />
            </section>
        </div>
    )
}

export default VideoShow;