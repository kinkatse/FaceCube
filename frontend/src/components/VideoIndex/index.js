// import React, { useState } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { getVideos } from '../../store/video';
// import VideoJS from '../VideoPlayer/VideoJS';
// import './VideoIndex.css'
// import { NavLink } from 'react-router-dom';

// const VideoIndex = () => {
//     const dispatch = useDispatch()
//     const videos = useSelector(state => state.entities.videos)
//     const [videosArr, setVideosArr] = useState(videos.length ? Object.values(videos) : [])

//     useEffect(() => {
//         dispatch(getVideos())
//     }, [])

//     const playerRef = React.useRef(null);

//     if (videos.length === 0) return null;

//     const handlePlayerReady = (player) => {
//         playerRef.current = player;
    
//         // You can handle player events here, for example:
//         player.on('waiting', () => {
//             videojs.log('player is waiting');
//         });
    
//         player.on('dispose', () => {
//             videojs.log('player will dispose');
//         });
//     };

//     const renderVideos = () => {
//         const newArr = []
//         Object.values(videos).map((video) => {
//             const videoJsOptions = {
//                 responsive: true,
//                 fluid: true,
//                 poster: video?.thumbnail,
//                 playbackRates: [0.5, 1, 1.5, 2],
//                 sources: [{
//                     src: `${video?.file}`,
//                     type: 'video/mp4'
//                 }]
//             };

//             newArr.push(
//                 <NavLink exact to={`/video/${video.id}`} key={video.id} className="video-index-item">
//                   <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//                 </NavLink>
//             )
//         })

//         return newArr
//     }

//     return (
//         <div>
//             {renderVideos()}
//         </div>
//     )
// }

// export default VideoIndex;


import React, { useState } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../store/video';
// import VideoJS from '../VideoPlayer/VideoJS';
import './VideoIndex.css'
import { NavLink } from 'react-router-dom';

const VideoIndex = () => {
    const dispatch = useDispatch()
    const videos = useSelector(state => state.entities.videos)
    // const [videosArr, setVideosArr] = useState(videos.length ? Object.values(videos) : [])

    useEffect(() => {
        dispatch(getVideos)
    }, [])

    // const playerRef = React.useRef(null);

    // if (videos.length === 0) return null;

    // const handlePlayerReady = (player) => {
    //     playerRef.current = player;
    
    //     // You can handle player events here, for example:
    //     player.on('waiting', () => {
    //         videojs.log('player is waiting');
    //     });
    
    //     player.on('dispose', () => {
    //         videojs.log('player will dispose');
    //     });
    // };

    // const renderVideos = () => {
    //     const newArr = []
    //     Object.values(videos).map((video) => {
    //         const videoJsOptions = {
    //             responsive: true,
    //             fluid: true,
    //             poster: video?.thumbnail,
    //             playbackRates: [0.5, 1, 1.5, 2],
    //             sources: [{
    //                 src: `${video?.file}`,
    //                 type: 'video/mp4'
    //             }]
    //         };

    //         newArr.push(
    //             <NavLink exact to={`/video/${video.id}`} key={video.id} className="video-index-item">
    //               <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    //             </NavLink>
    //         )
    //     })

    //     return newArr
    // }

    if (videos.length === 0) return null;

    const renderVideos = () => {
        const videosArr = [];

        Object.values(videos).map((video) => {
            videosArr.push(
            //   <NavLink exact to={`/video/${video.id}`} key={video.id} className="video-index-item">
                <video controls src={`${video.thumbnail}`} />
            //   </NavLink>
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