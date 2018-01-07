import Reducers from './reducer';

class Redux {

    createStore(reducer) {
        let state = {};
        let listeners = [];

        const getState = () => state;
// Methods dispatch and subscribe implement Observer pattern
        const dispatch = (action) => {
            state = reducer(this.state, action);
            listeners.forEach(listener => listener());
        };

        const subscribe = (listener) => {
            listeners.push(listener);

            return () => {
                listeners = listeners.filter(l => l !== listener);
            };
        };

        return { getState, dispatch, subscribe };
    }

}

export const redux = new Redux();
const reducer = new Reducers();

export const store = redux.createStore(reducer.reduce);
