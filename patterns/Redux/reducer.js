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
                articles: [...state.articles, ...action.articles],
            });

        case 'ARTICLE_IS_VIEWED' :
            return Object.assign({}, state, {
            articlesViewed: [...state.articlesViewed, action.articlesViewed],
            counter: state.counter + 1,
});

        default:
            return state;
        }
    }
}
