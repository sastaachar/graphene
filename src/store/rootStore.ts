import { combineReducers, createStore, Store } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { NodeManagerReducer } from './nodeManager/nodeManagerReducer';

const rootReducer = combineReducers({ NodeManager: NodeManagerReducer });
export type AppState = ReturnType<typeof rootReducer>;

export const rootStore: Store = createStore(rootReducer, composeWithDevTools());
export type AppDispatch = typeof rootStore.dispatch;
