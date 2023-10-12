import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import miniPlayerReducer from './miniPlayer';
import modalReducer from './modal';
import sessionReducer from './session';
import videosReducer from './video';

const entitiesReducer = combineReducers({
    videos: videosReducer
})
const uiReducer = combineReducers({
    modal: modalReducer,
    mini: miniPlayerReducer
})
const rootReducer = combineReducers({
    session: sessionReducer,
    entities: entitiesReducer,
    ui: uiReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;