import React from 'react';
import { NavLink } from 'react-router-dom';

const VideoIndexItem = ({ video }) => {

    return (
        <li className='video-index-item' key={video.id}>
          <NavLink exact to={`/video/${video.id}`} className="video-index-image">
            <img src={`${video.thumbnail}`} />
          </NavLink>
          <div className='index-item-details'>
            <NavLink exact to={`/video/${video.id}`}>
              <h1 className='index-item-title'>{video.title}</h1>
            </NavLink>
            <NavLink exact to={`/channel/${video.userId}`}>
              <h1 className='index-item-username'>{video.username}</h1>
            </NavLink>
            <div>
              <h1 className='index-item-views'>{video.views} views</h1>
              <h1 className='index-item-views'>{video.createdAt} ago</h1>
            </div>
          </div>
        </li>
    )
}

export default VideoIndexItem;