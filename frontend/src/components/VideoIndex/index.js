import React, { useState } from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/video';
import './VideoIndex.css'
import { NavLink } from 'react-router-dom';
import VideoIndexItem from './VideoIndexItem';

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
                    <VideoIndexItem video={video} videoId={videoId}/>
                )
            }
        })
        return videosArr
    }

    return (
        <div className={`video-${indexClass}-index`}>
            {renderVideos()}
        </div>
    )
}

export default VideoIndex;