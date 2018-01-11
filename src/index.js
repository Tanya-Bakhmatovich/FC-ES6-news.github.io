import { URL_START, URL_END, sources } from './constants';

import {
    factoryDivElement,
    factoryImgElement,
    onClickHandlerStrategy,
} from '../patterns/pattern';
import file from './../loader/fileToCheck.json'; // eslint-disable-line no-unused-vars
import './../css/main.css';

class News {

    render() {
        factoryDivElement.factory({
            attrs: { class: 'header' },
            props: { innerHTML: 'Stay tuned!' },
        });

        const menu = factoryDivElement.factory({ attrs: { class: 'menu' } });

        const menuSmall = factoryDivElement.factory({ attrs: { class: 'menu-small' } });

        sources.map((source) => {
            const url = `${URL_START}${source}${URL_END}`;

            const sourceNews = factoryDivElement.factory({
                parent: menu,
                attrs: { class: `${source}` },
                props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` },
            });

            factoryImgElement.factory({
                parent: sourceNews,
                tagName: 'img',
                attrs: { style: { width: '320px', height: '200px' }, src: `./../img/${source}.png` },
            });

            const sourceNewsSmall = factoryDivElement.factory({
                parent: menuSmall,
                attrs: { class: `${source}-small` },
                props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` },
            });

            sourceNewsSmall.addEventListener('click', () => onClickHandlerStrategy({
                sourceNews: 'sourceNewsSmall',
                source,
                element: sourceNewsSmall,
                url,
            }),
        );

            sourceNews.addEventListener('click', () => onClickHandlerStrategy({
                sourceNews: 'sourceNews',
                source,
                element: sourceNews,
                url,
            }),
        );

            return this;
        });
    }
}

const newsApp = new News();

newsApp.render();
