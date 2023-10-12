import React from 'react';
import { NavLink } from 'react-router-dom';

const VideoIndexItem = ({ video, videoId }) => {
    const indexClass = videoId ? 'show' : 'home'

    const timeAgo = (date) => {
        let seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        let time;
      
        if (interval > 1) {
            time = Math.floor(interval);
            if (time === 1) return time + " year";
            return time + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            time = Math.floor(interval);
            if (time === 1) return time + " month";
            return time + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            time = Math.floor(interval);
            if (time === 1) return time + " day";
            return time + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            time = Math.floor(interval);
            if (time === 1) return time + " hour";
            return time + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            time = Math.floor(interval);
            if (time === 1) return time + " minute";
            return time + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
      <NavLink exact to={`/video/${video.id}`} className={`video-${indexClass}-item`}>
        <NavLink exact to={`/video/${video.id}`} className={`video-${indexClass}-image`}>
          <img className="video-index-item-image" src={`${video.thumbnail}`} />
        </NavLink>
        <div className={`${indexClass}-item-details`}>
            <NavLink exact to={`/channel/${video.userId}`} className={`video-${indexClass}-icon`}>
              <i className="fa-solid fa-user"/>
            </NavLink>
            <div>
              <NavLink exact to={`/video/${video.id}`}>
                <h1 className={`${indexClass}-item-title`}>{video.title}</h1>
              </NavLink>
              <NavLink exact to={`/channel/${video.userId}`}>
                <h1 className={`${indexClass}-item-username`}>{video.username}</h1>
              </NavLink>
              <div className={`${indexClass}-other-details`}>
                <h1 className={`${indexClass}-item-views`}>{video.views} views</h1>
                <p className='dot'>•</p>
                <h1 className={`${indexClass}-item-date`}>{timeAgo(new Date(video.createdAt))} ago</h1>
              </div>
            </div>
        </div>
      </NavLink>
    )
}

export default VideoIndexItem;