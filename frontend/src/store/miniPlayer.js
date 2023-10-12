const OPEN_MINI_PLAYER = 'miniPlayer/openMini';
const CLOSE_MINI_PLAYER = 'miniPlayer/closeMini';

export const openMiniPlayer = (videoId) => {
    return {
      type: OPEN_MINI_PLAYER,
      videoId
    }
}

export const closeMiniPlayer = () => {
    return {
      type: CLOSE_MINI_PLAYER
    }
}

const miniPlayerReducer = (state = {videoId: null}, action) => {
    Object.freeze(state);

    switch(action.type) {
      case OPEN_MINI_PLAYER:
        return Object.assign({}, state, {videoId: action.videoId})
      case CLOSE_MINI_PLAYER:
        return Object.assign({}, state, {videoId: null})
      default:
        return state;
    }
}

export default miniPlayerReducer;