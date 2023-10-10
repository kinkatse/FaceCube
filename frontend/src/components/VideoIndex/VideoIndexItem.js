import React from 'react';
import { NavLink } from 'react-router-dom';

const VideoIndexItem = ({ video, videoId }) => {
    const indexClass = videoId ? 'show' : 'home'

    return (
        <li className={`video-${indexClass}-item`} key={video.id}>
          <NavLink exact to={`/video/${video.id}`} className={`video-${indexClass}-image`}>
            <img className="video-index-item-image" src={`${video.thumbnail}`} />
          </NavLink>
          <div className={`${indexClass}-item-details`}>
            <NavLink exact to={`/video/${video.id}`}>
              <h1 className={`${indexClass}-item-title`}>{video.title}</h1>
            </NavLink>
            <NavLink exact to={`/channel/${video.userId}`}>
              <h1 className={`${indexClass}-item-username`}>{video.username}</h1>
            </NavLink>
            <div>
              <h1 className={`${indexClass}-item-views`}>{video.views} views</h1>
              <h1 className={`${indexClass}-item-views`}>{video.createdAt} ago</h1>
            </div>
          </div>
        </li>
    )
}

export default VideoIndexItem;