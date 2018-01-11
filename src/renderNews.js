import {
    factoryDivElement,
    factoryImgElement,
    factoryArticleElement,
    factoryHeaderElement,
    factoryButtonElement,
    FactoryHeaderElementDecorator,
} from '../patterns/pattern';
import { store } from '../patterns/Redux/redux';

function renderViewedArticleButton() {
    const { counter } = store.getState();
    const renderViewedArticles = document.querySelector('.display-article-button');

    if (renderViewedArticles) {
        renderViewedArticles.innerHTML = `Viewed articles (${counter})`;
    }
}

function clear() {
    if (document.querySelector('.no-viewed-articles')) {
        document.body.removeChild(document.querySelector('.no-viewed-articles'));
    }

    if (document.querySelector('.main-section')) {
        document.body.removeChild(document.querySelector('.main-section'));
    }
}

function renderViewedArticlesHandler() {
    clear();

    [...document.querySelectorAll('.active')]
    .forEach(elem => elem.classList.remove('active'));

    const renderViewedArticles = document.querySelector('.display-article-button');

    renderViewedArticles.classList.add('active');

    const { articlesViewed } = store.getState();

    if (articlesViewed.length === 0) {
        return factoryDivElement.factory({
            attrs: { class: 'no-viewed-articles' },
            props: { innerHTML: 'No viewed articles' },
        });
    }

    return renderNews({ articles: articlesViewed });// eslint-disable-line no-use-before-define
}

function createButtonViewedArticles() {
    const renderViewedArticles = document.querySelector('.display-article-button');

    if (!renderViewedArticles) {
        const { counter } = store.getState();

        factoryButtonElement.factory({
            attrs: { class: 'display-article-button' },
            props: { innerHTML: `Viewed articles (${counter})` },
        });
        const button = document.querySelector('.display-article-button');

        button.addEventListener('click', renderViewedArticlesHandler);
    }

    store.subscribe(renderViewedArticleButton);
}

export default function renderNews({ articles }) {
    if (!articles || articles.length === 0) {
        return null;
    }

    store.dispatch({
        type: 'DATA_RECEIVED',
        articles,
    });

    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-small').style.display = 'block';

    clear();
    createButtonViewedArticles();

    const main = factoryDivElement.factory({ attrs: { class: 'main-section' } });

    return articles.forEach((article) => {
        const {
            author,
            description,
            publishedAt,
            title,
            url,
            urlToImage,
        } = article;
        const articleBlock = factoryArticleElement.factory({ parent: main, tagName: 'a', attrs: { href: `${url}`, target: '_blank', class: 'article' } });
        const currentTime = new Date();
        const publishedTime = new Date(publishedAt);
        const lastNews = currentTime.getTime() - publishedTime.getTime();
        const headerDecorator = new FactoryHeaderElementDecorator(factoryHeaderElement);

        articleBlock.addEventListener('click', () => {
            store.dispatch({
                type: 'ARTICLE_IS_VIEWED',
                articlesViewed: article,
                counter: 1,
            });
        });

        factoryImgElement.factory({
            parent: articleBlock,
            attrs: { class: 'preview', src: `${urlToImage}`, style: { height: '200px' } },
        });

        lastNews < 432e5 ? // eslint-disable-line no-unused-expressions
        headerDecorator.factory({
            parent: articleBlock,
            attrs: { class: 'title' },
            props: { innerHTML: `${title}` },
        }) :
        factoryHeaderElement.factory({
            parent: articleBlock,
            attrs: { class: 'title' },
            props: { innerHTML: `${title}` },
        });

        factoryDivElement.factory({
            parent: articleBlock,
            attrs: { class: 'author' },
            props: { innerHTML: `${author}` },
        });

        const dateTimeBlock = factoryDivElement.factory({
            parent: articleBlock,
            attrs: { class: 'date-time' },
        });

        factoryDivElement.factory({
            parent: dateTimeBlock,
            attrs: { class: 'date' },
            props: { innerHTML: `${publishedAt.slice(0, 10)}` },
        });

        factoryDivElement.factory({
            parent: dateTimeBlock,
            attrs: { class: 'time', title: `${url}` },
            props: { innerHTML: `${publishedAt.slice(12, -1)}` },
        });

        factoryDivElement.factory({
            parent: articleBlock,
            attrs: { class: 'description' },
            props: { innerHTML: `${description}` },
        });
    });
}
