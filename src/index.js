import { URL_START, URL_END, sources } from './constants';
import sendRequest from './request';
import createElement from './createElement';
import file from '../loader/fileToCheck.json.json'; // eslint-disable-line no-unused-vars
import './../css/main.css';

class News {

    render() {
        createElement({
            attrs: { class: 'header' },
            props: { innerHTML: 'Stay tuned!' },
        });

        const menu = createElement({ attrs: { class: 'menu' } });

        const menuSmall = createElement({ attrs: { class: 'menu-small' } });

        sources.map((source) => {
            const url = `${URL_START}${source}${URL_END}`;

            const sourceNews = createElement({
                parent: menu,
                attrs: { class: `${source}` },
                props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` },
            });

            createElement({
                parent: sourceNews,
                tagName: 'img',
                attrs: { style: { width: '320px', height: '200px' }, src: `./../img/${source}.png` },
            });

            const sourceNewsSmall = createElement({
                parent: menuSmall,
                attrs: { class: `${source}-small` },
                props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` },
            });

            sourceNewsSmall.addEventListener('click', async () => {
                const { forEach } = Array.prototype;

                document.querySelectorAll('.active')
                ::forEach(elem => elem.classList.remove('active'));
                sourceNewsSmall.classList.add('active');

                (await import(
                    /* webpackChunkName: "./renderNews" */
                    /* webpackMode: "lazy" */
                    './renderNews')).default(await sendRequest(url));
            });

            sourceNews.addEventListener('click', async () => {
                document.querySelector(`.${source}-small`).classList.add('active');

                const [func] = await Promise.all([import(
                    /* webpackChunkName: "./renderNews" */
                    /* webpackMode: "lazy" */
                    './renderNews'),
                    import(
                        /* webpackChunkName: "./renderStyle" */
                        /* webpackMode: "lazy" */
                        './../css/render.css'),
                ]);

                func.default(await sendRequest(url));
            });

            return this;
        });
    }
}

const newsApp = new News();

newsApp.render();
