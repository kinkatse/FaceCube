import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import VideoJS from "../VideoPlayer/VideoJS";
import Videos from "./ImportVideos";
import logo from "../../assets/youtube-logo.png"
import './VideoShow.css'
import './VideoJS.css'
import { getVideo } from '../../store/video';

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
        poster: logo,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: `https://facecube-seeds.s3.amazonaws.com/1.mp4`,
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
                {/* <video controls>
                    <source src={`${video.file}`} type="video/mp4"/>
                </video> */}
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