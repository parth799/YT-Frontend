import { useDispatch, useSelector } from "react-redux"
import Navbar from "../../Headers/Navbar"
import Video from "./Video"
import { useParams } from "react-router-dom"


function VideoDetail() {
    const dispatch = useDispatch()
    const {videoId} = useParams()
    const video = useSelector((state) => state.video?.video);
    console.log(video);
    
  return (
    <>
    <Navbar />
      <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url}/>
    </>
  )
}

export default VideoDetail
