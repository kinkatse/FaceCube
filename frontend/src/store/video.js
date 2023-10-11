import csrfFetch from './csrf';

const RECEIVE_VIDEO = 'videos/receiveVideo';
const RECEIVE_VIDEOS = 'videos/receiveVideos';
// Not necessary since we can just increment on the backend
// or in fetch request when we fetch for the video. May potentially
// fetch every so often to update views live, but not important right now
// const VIEW_INCREMENT = 'videos/viewIncrement';
const CLEAR_VIDEOS = 'videos/clearVideos';

const receiveVideo = (video) => {
  return {
    type: RECEIVE_VIDEO,
    video
  };
};

const receiveVideos = (videos) => {
  return {
    type: RECEIVE_VIDEOS,
    videos
  };
};

const clearVideos = () => {
  return {
    type: CLEAR_VIDEOS
  };
};

export const getVideos = async (dispatch) => {
    const response = await csrfFetch('/api/videos');
    const data = await response.json();
    dispatch(receiveVideos(data.videos));
    return response;
};

export const getVideo = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}`);
    const data = await response.json();
    dispatch(receiveVideo(data.video));
    return response;
};

export const uploadVideo = (video) => async (dispatch) => {
    const { user_id, title, description, category } = video;
    const response = await csrfFetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        title,
        description,
        category
      })
    });
    const data = await response.json();
    dispatch(receiveVideo(data.video));
    return response;
};

export const udpdateVideo = (video) => async (dispatch) => {
    const { user_id, title, description, category } = video;
    const response = await csrfFetch(`/api/videos/${video.id}`, {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        title,
        description,
        category
      })
    });
    const data = await response.json();
    dispatch(receiveVideo(data.video));
    return response;
};

export const deleteVideo = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}`, {
      method: 'DELETE'
    });
    dispatch(clearVideos());
    return response;
};

const videosReducer = (state = { }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_VIDEO:
      let id = action.video.id;
      newState[id] = action.video;
      return newState;
    case RECEIVE_VIDEOS:
      newState = { ...action.videos, ...newState }
      return newState;
    case CLEAR_VIDEOS:
      return { };
    default:
      return state;
  }
};

export default videosReducer;