import { useEffect } from "react";
import { useParams } from "react-router-dom";
import earth from "../../assets/videos/earth.mov"
import './VideoShow.css'

const VideoShow = () => {
    const { videoId } = useParams();

    useEffect(() => {
        debugger

    }, [videoId])

    return (
        <div>
            <h1>{videoId}</h1>
            {/* <video src={earth} autoPlay className="video-show"></video> */}
            <video width="750" height="500" controls>
                <source src={earth} type="video/mp4"/>
            </video>
        </div>
    )
}

export default VideoShow;