import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from "react-router-dom";
import { getVideo } from '../../store/video';
import VideoInfoHeader from './VideoInfoHeader';
import VideoJS from "../VideoPlayer/VideoJS";
// import Videos from "./ImportVideos";
// import logo from "../../assets/youtube-logo.png"
import './VideoShow.css'
import './VideoJS.css'
import VideoIndex from '../VideoIndex';
import { openMiniPlayer } from '../../store/miniPlayer';

const VideoShow = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch()
    const miniVideoId = useSelector(state => state.ui.mini.videoId);
    const video = useSelector(state => state.entities.videos[videoId])

    useEffect(() => {
        dispatch(getVideo(videoId))
    }, [videoId])

    if (!video) return null;
    if (miniVideoId === parseInt(videoId)) return <Redirect to="/"/>

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

    const handleOpenMiniPlayer = () => {
        dispatch(openMiniPlayer(video.id));
    }

    return (
        <div className='video-whole'>
            <section className='video-show-left'>
              <div className='videojs-container'>
                <VideoJS options={videoJsOptions} />
                <div className='behind-player-background'></div>
              </div>
              <VideoInfoHeader video={video}/>
            </section>
            <section className='video-show-right'>
              <VideoIndex videoId={video.id}/>
            </section>
            <button style={{position: 'absolute'}} onClick={handleOpenMiniPlayer}>Open Mini Player</button>
        </div>
    )
}

export default VideoShow;