import React, { useState } from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/video';
import './VideoIndex.css'
import { NavLink } from 'react-router-dom';

const VideoIndex = () => {
    const dispatch = useDispatch()
    const videos = useSelector(state => state.entities.videos)
    // const [videosArr, setVideosArr] = useState(videos.length ? Object.values(videos) : [])

    useEffect(() => {
        dispatch(getVideos)
    }, [])

    if (videos.length === 0) return null;

    const renderVideos = () => {
        const videosArr = [];

        Object.values(videos).map((video) => {
            videosArr.push(
              <NavLink exact to={`/video/${video.id}`} key={video.id} className="video-index-item">
                <img src={`${video.thumbnail}`} />
              </NavLink>
            )
        })
        return videosArr
    }

    return (
        <div>
            {renderVideos()}
        </div>
    )
}

export default VideoIndex;