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

const VideoIndex = ({ videoId }) => {
    const dispatch = useDispatch()
    // const miniVideoId = useSelector(state => state.ui.mini.videoId);
    const videos = useSelector(state => state.entities.videos)
    const [videosArr, setVideosArr] = useState([])

    useEffect(() => {
        dispatch(getVideos)
    }, [])

    useEffect(() => {
        const videosList = [];
        Object.values(videos).map((video) => {
            if (videoId !== video.id) {
                videosList.push(
                <VideoIndexItem video={video} videoId={videoId} key={video.id}/>
                )
            }
        })
        setVideosArr(shuffleArray(videosList));
    }, [videos])

    if (videos.length === 0) return null;

    const indexClass = videoId ? 'show' : 'home'

    // const renderVideos = () => {
    //     const videosList = videosArr;
    //     Object.values(videos).map((video) => {
    //         if (videoId !== video.id) {
    //             videosList.push(
    //             <VideoIndexItem video={video} videoId={videoId} key={video.id}/>
    //             )
    //         }
    //     })
    //     setVideosArr(videosList)
    //     return shuffleArray(videosList);
    // }

    return (
        <div className={`video-${indexClass}-index`}>
            {/* {!miniVideoId && renderVideos()}
            {miniVideoId && videosArr} */}
            {videosArr}
        </div>
    )
}

export default VideoIndex;