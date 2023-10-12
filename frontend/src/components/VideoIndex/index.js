import React, { useState } from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearVideos, getVideos } from '../../store/video';
import './VideoIndex.css'
import VideoIndexItem from './VideoIndexItem';

const shuffleArray = (array) => {
    for (let i = array.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

const VideoIndex = ({ videoId, setNextVideoId }) => {
    const dispatch = useDispatch()
    // const miniVideoId = useSelector(state => state.ui.mini.videoId);
    const videos = useSelector(state => state.entities.videos)
    const [videosArr, setVideosArr] = useState([])

    useEffect(() => {
        dispatch(getVideos)
    }, [])

    useEffect(() => {
        const videosObj = Object.values(videos);
        const videosList = [];
        videosObj.map((video) => {
            if (videoId !== video.id) {
                videosList.push(
                <VideoIndexItem video={video} videoId={videoId} key={video.id}/>
                )
            }
        })
        const shuffled = shuffleArray(videosList)
        // debugger
        setNextVideoId && setNextVideoId(shuffled[0]?.key);
        setVideosArr(shuffled);
    }, [videos])

    if (videos.length === 0) return null;

    const indexClass = videoId ? 'show' : 'home'

    return (
        <div className={`video-${indexClass}-index`}>
            {videosArr}
        </div>
    )
}

export default VideoIndex;