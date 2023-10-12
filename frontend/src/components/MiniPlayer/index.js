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
          <button onClick={handleClickExpand} className="mini-expand">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
          <VideoJS options={videoJsOptions} />
          <div className='behind-player-background'></div>
          <button onClick={handleCloseMini} className="mini-close">
            <i className="fa-solid fa-xmark"/>
          </button>
        </div>
      </div>
    )
}

export default MiniPlayer;