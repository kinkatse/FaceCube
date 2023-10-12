import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { openMiniPlayer } from '../../store/miniPlayer';

const VideoIndexItem = ({ video, videoId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const indexClass = videoId ? 'show' : 'home';
    const miniVideoId = useSelector(state => state.ui.mini.videoId);

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

    const handleClick = (e) => {
      e.preventDefault();
      if (e.target.classList[0] === `${indexClass}-item-username` 
      || e.target.classList[0] === 'fa-solid') {
        history.push(`/channel/${video.userId}`);
        return;
      }
      if (miniVideoId) {
        dispatch(openMiniPlayer(video.id));
        return;
      }
      history.push(`/video/${video.id}`);
    }

    return (
      <div onClick={handleClick} className={`video-${indexClass}-item`}>
        <div className={`video-${indexClass}-image`}>
          <img className="video-index-item-image" src={`${video.thumbnail}`} />
        </div>
        <div className={`${indexClass}-item-details`}>
            <div className={`video-${indexClass}-icon`}>
              <i className="fa-solid fa-user"/>
            </div>
            <div>
              <h1 className={`${indexClass}-item-title`}>{video.title}</h1>
              <h1 className={`${indexClass}-item-username`}>{video.username}</h1>
              <div className={`${indexClass}-other-details`}>
                <h1 className={`${indexClass}-item-views`}>{video.views} views</h1>
                <p className='dot'>•</p>
                <h1 className={`${indexClass}-item-date`}>{timeAgo(new Date(video.createdAt))} ago</h1>
              </div>
            </div>
        </div>
      </div>
    )
}

export default VideoIndexItem;