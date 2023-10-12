import { useDispatch, useSelector } from "react-redux";
import { openMiniPlayer, closeMiniPlayer } from "../../store/miniPlayer";
import { NavLink } from "react-router-dom";
import './MiniPlayer.css'
import VideoJS from "../VideoPlayer/VideoJS";

const MiniPlayer = () => {
    const dispatch = useDispatch();
    const videoId = useSelector(state => state.ui.mini.videoId);
    const video = useSelector(state => state.entities.videos[videoId])

    const handleOpenMini = (videoId) => {
      dispatch(openMiniPlayer(videoId));
    }
    const handleCloseMini = () => {
      dispatch(closeMiniPlayer());
    }

    // let iconButton = (
    //   <button onClick={handleCloseMini} className="mini-close">
    //     <i className="fa-solid fa-xmark"/>
    //   </button>
    // )

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
      <div className="mini-player">
        <div className='videojs-container'>
          <VideoJS options={videoJsOptions} />
          <div className='behind-player-background'></div>
        </div>
      </div>
    )
}

export default MiniPlayer;