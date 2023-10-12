import { useDispatch, useSelector } from "react-redux";
import { closeMiniPlayer } from "../../store/miniPlayer";
import { useHistory } from "react-router-dom";
import './MiniPlayer.css'
import VideoJS from "../VideoPlayer/VideoJS";

const MiniPlayer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const videoId = useSelector(state => state.ui.mini.videoId);
    const video = useSelector(state => state.entities.videos[videoId]);

    const handleCloseMini = () => {
      dispatch(closeMiniPlayer());
    }

    const handleClickExpand = () => {
      dispatch(closeMiniPlayer());
      history.push(`/video/${videoId}`);
      return;
    }

    const grabElements = () => {
        const elementObj = {
            expand: document.querySelector(".mini-expand"),
            close: document.querySelector(".mini-close"),
            playButton: document.querySelector(".mini-player .video-js .vjs-play-control"),
            times: document.querySelectorAll(".mini-player .video-js .vjs-time-control"),
            background: document.querySelector(".mini-behind-player-background"),
            remaining: document.querySelector(".mini-player .vjs-remaining-time")
        }
        return elementObj;
    }

    const mouseEnterHandler = (e) => {
        const elements = grabElements();
        if (elements.remaining) elements.remaining.remove();
        elements.expand.classList.remove("mini-buttons-after");
        elements.close.classList.remove("mini-buttons-after");
        elements.playButton.classList.remove("mini-buttons-after");
        for (let time of elements.times) time.classList.remove("mini-buttons-after");
        elements.background.classList.remove("mini-after-hover-away");
        elements.expand.style.display = "flex";
        elements.close.style.display = "flex";
        elements.playButton.style.display = "block";
        for (let time of elements.times) time.style.display = "block";
        elements.background.style.display = "block";
    }

    const mouseLeaveHandler = (e) => {
        const elements = grabElements();
        elements.expand.classList.add("mini-buttons-after");
        elements.close.classList.add("mini-buttons-after");
        elements.playButton.classList.add("mini-buttons-after");
        for (let time of elements.times) time.classList.add("mini-buttons-after");
        elements.background.classList.add("mini-after-hover-away");
        setTimeout(() => {
            elements.expand.style.display = "none";
            elements.close.style.display = "none";
            elements.playButton.style.display = "none";
            for (let time of elements.times) time.style.display = "none";
            elements.background.style.display = "none";
        }, 200)
    }

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: `${video?.file}`,
            type: 'video/mp4'
        }]
    };

    if (!videoId) return null;

    return (
      <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className="mini-player">
        <div className='videojs-container'>
          <button onClick={handleClickExpand} className="mini-expand">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
          <VideoJS options={videoJsOptions} className="grab-video"/>
          <div className='mini-behind-player-background'></div>
          <button onClick={handleCloseMini} className="mini-close">
            <i className="fa-solid fa-xmark"/>
          </button>
        </div>
        <header className="mini-header">
          <h1 className={`mini-item-title`}>{video.title}</h1>
          <h1 className={`mini-item-username`}>{video.username}</h1>
        </header>
      </div>
    )
}

export default MiniPlayer;