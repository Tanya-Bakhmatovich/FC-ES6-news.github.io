const initState = {
    articles: [],
    dataRecieved: false,
    articlesViewed: [],
    counter: 0,
};

export default class Reducers {

    reduce(state = initState, action) {
        switch (action.type) {

        case 'DATA_RECEIVED' :
            return Object.assign({}, state, {
                dataRecieved: true,
                articles: action.articles,
            });

        case 'ARTICLE_IS_VIEWED' :
            state.counter ++;// eslint-disable-line no-plusplus
            state.articlesViewed.push(action.articlesViewed);

            return Object.assign({}, state);

        default:
            return this.state;
        }
    }
}
