import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Videos from "./ImportVideos";
import logo from "../../assets/youtube-logo.png"
import './VideoShow.css'

const VideoShow = () => {
    const { videoId } = useParams();

    useEffect(() => {
        
    }, [videoId])

    return (
        <div>
            <h1>{videoId}</h1>
            <video
                id="my-video"
                className="video-js"
                controls
                autoPlay
                preload="auto"
                width="720"
                height="400"
                poster={logo}
                data-setup="{}"
            >
                <source src={Videos[videoId]} type="video/mp4" />
            </video>
        </div>
    )
}

export default VideoShow;