import { useDispatch, useSelector } from "react-redux";
import { openMiniPlayer, closeMiniPlayer } from "../../store/miniPlayer";
import { NavLink, useHistory } from "react-router-dom";
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

    const mouseEnterHandler = (e) => {
        const expand = document.querySelector(".mini-expand");
        const close = document.querySelector(".mini-close");
        const playButton = document.querySelector(".mini-player .video-js .vjs-play-control");
        const background = document.querySelector(".mini-behind-player-background");
        expand.classList.remove("mini-buttons-after");
        close.classList.remove("mini-buttons-after");
        playButton.classList.remove("mini-buttons-after");
        background.classList.remove("mini-after-hover-away");
        expand.style.display = "flex";
        close.style.display = "flex";
        playButton.style.display = "block";
        background.style.display = "block";
    }

    const mouseLeaveHandler = (e) => {
        const expand = document.querySelector(".mini-expand");
        const close = document.querySelector(".mini-close");
        const playButton = document.querySelector(".mini-player .video-js .vjs-play-control");
        const background = document.querySelector(".mini-behind-player-background");
        expand.classList.add("mini-buttons-after");
        close.classList.add("mini-buttons-after");
        playButton.classList.add("mini-buttons-after");
        background.classList.add("mini-after-hover-away");
        setTimeout(() => {
            expand.style.display = "none";
            close.style.display = "none";
            playButton.style.display = "none";
            background.style.display = "none";
        }, 200)
    }

    if (!videoId) return null;

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

    return (
      <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className="mini-player">
        <div className='videojs-container'>
          <button onClick={handleClickExpand} className="mini-expand">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
          <VideoJS options={videoJsOptions} />
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