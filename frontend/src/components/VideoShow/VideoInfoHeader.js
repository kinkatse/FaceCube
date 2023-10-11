import { NavLink } from "react-router-dom";
import './VideoInfoHeader.css'

const VideoInfoHeader = ({ video }) => {

    return (
        <header className='video-user-header'>
          <h1 className='video-title'>{video.title}</h1>
          <div className='video-user-container'>
            <section className='video-user'>
              <NavLink exact to={`/channel/${video.userId}`} className="video-header-icon">
                <i className="fa-solid fa-user video-user-icon"/>
              </NavLink>
              <div className='video-user-info'>
                <NavLink exact to={`/channel/${video.userId}`} >
                  <h1>{video.username}</h1>
                </NavLink>
                <h3>94.5K subscribers</h3>
              </div>
              <button className="subscribe-button">Subscribe</button>
            </section>
            <section className="video-buttons">
              <button>
                <i className="fa-solid fa-thumbs-up video-details-icon"/>
                <h3>Like</h3>
              </button>
              <button>
                <i className="fa-solid fa-share video-details-icon"/>
                <h3>Share</h3>
              </button>
            </section>
          </div>
          <div className="video-details">
            <header className="video-details-header">
              <h1>{video.views} views</h1>
              <h1>{video.uploaded}</h1>
              <h1>{video.category}</h1>
            </header>
            <p className="video-description">{video.description}</p>
          </div>
        </header>
    )
}

export default VideoInfoHeader;