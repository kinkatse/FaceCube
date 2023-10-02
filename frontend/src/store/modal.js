const OPEN_MODAL = 'modal/openModal';
const CLOSE_MODAL = 'modal/closeModal';

export const openModal = (modalType) => {
    return {
      type: OPEN_MODAL,
      modalType
    }
}

export const closeModal = () => {
    return {
      type: CLOSE_MODAL
    }
}

const modalReducer = (state = {type: ''}, action) => {
    Object.freeze(state);

    switch(action.type) {
      case OPEN_MODAL:
        return Object.assign({}, state, {type: action.modalType})
      case CLOSE_MODAL:
        return Object.assign({}, state, {type: ''})
      default:
        return state;
    }
}

export default modalReducer;