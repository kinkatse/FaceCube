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
    const videos = useSelector(state => state.entities.videos)
    // const [videosArr, setVideosArr] = useState(videos.length ? Object.values(videos) : [])

    useEffect(() => {
        dispatch(getVideos)
    }, [])

    if (videos.length === 0) return null;

    const indexClass = videoId ? 'show' : 'home'

    const renderVideos = () => {
        const videosArr = [];

        Object.values(videos).map((video) => {
            if (videoId !== video.id) {
              videosArr.push(
                <VideoIndexItem video={video} videoId={videoId} key={video.id}/>
              )
            }
        })
        return shuffleArray(videosArr);
    }

    return (
        <div className={`video-${indexClass}-index`}>
            {renderVideos()}
        </div>
    )
}

export default VideoIndex;