const URL_START = 'https://newsapi.org/v2/top-headlines?sources=';
const URL_END = '&apiKey=081377ca5b314ef4b45a9331d41406c4';
const sources = ['national-geographic', 'bbc-news', 'the-wall-street-journal'];

class News {
    static async sendRequest(url) {
        try {
            return (await fetch(url)).json();
        } catch (err) {
            console.log(err);
        }
    }

    static createElement({
        parent = document.body,
        tagName = 'div',
        attrs,
        props,
    }) {
        console.log('remove');
        const element = document.createElement(tagName);
        if (attrs) {
            Object.keys(attrs).forEach((attr) => {
                element.setAttribute(attr, attrs[attr]);
                if (attr === 'style') {
                    Object.assign(element.style, attrs.style);
                }
            });
        }

        if (props) {
            Object.assign(element, props);
        }

        return parent.appendChild(element);
    }


    static renderNews({ articles }) {
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.menu-small').style.display = 'block';

        if (document.querySelector('.main-section')) {
            document.body.removeChild(document.querySelector('.main-section'));
        }


        const main = News.createElement({ attrs: { class: 'main-section' } });

        articles.forEach((article) => {
            const {
                author,
                description,
                publishedAt,
                title,
                url,
                urlToImage,
            } = article;

            const articleBlock = News.createElement({ parent: main, tagName: 'a', attrs: { href: `${url}`, target: '_blank', class: 'article' } });

            News.createElement({
                tagName: 'img',
                parent: articleBlock,
                attrs: { class: 'preview', src: `${urlToImage}`, style: { height: '200px' } },
            });

            News.createElement({
                parent: articleBlock,
                tagName: 'h1',
                attrs: { class: 'title', href: `${url}`, target: '_blank' },
                props: { innerHTML: `${title}` },
            });

            News.createElement({
                parent: articleBlock,
                attrs: { class: 'author' },
                props: { innerHTML: `${author}` },
            });

            const dateTimeBlock = News.createElement({
                parent: articleBlock,
                attrs: { class: 'date-time' },
            });

            News.createElement({
                parent: dateTimeBlock,
                attrs: { class: 'date' },
                props: { innerHTML: `${publishedAt.slice(0, 10)}` },
            });

            News.createElement({
                parent: dateTimeBlock,
                attrs: { class: 'time', title: `${url}` },
                props: { innerHTML: `${publishedAt.slice(12, -1)}` },
            });

            News.createElement({
                parent: articleBlock,
                attrs: { class: 'description' },
                props: { innerHTML: `${description}` },
            });
        });
    }

    render() {
        News.createElement({
            attrs: { class: 'header' },
            props: { innerHTML: 'Stay tuned!' },
        });

        const menu = News.createElement({ attrs: { class: 'menu' } });

        const menuSmall = News.createElement({ attrs: { class: 'menu-small' } });

        sources.map((source) => {
            const url = `${URL_START}${source}${URL_END}`;

            const sourceNews = News.createElement({
                parent: menu,
                attrs: { class: `${source}` },
                props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` },
            });

            News.createElement({
                parent: sourceNews,
                tagName: 'img',
                attrs: { style: { width: '320px', height: '200px' }, src: `img/${source}.png` },
            });

            const sourceNewsSmall = News.createElement({
                parent: menuSmall,
                attrs: { class: `${source}-small` },
                props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` },
            });

            sourceNewsSmall.addEventListener('click', async () => {
                const { forEach } = Array.prototype;
                document.querySelectorAll('.active')
                ::forEach(elem => elem.classList.remove('active'));
                sourceNewsSmall.classList.add('active');
                News.renderNews(await News.sendRequest(url));
            });

            sourceNews.addEventListener('click', async () => {
                document.querySelector(`.${source}-small`).classList.add('active');
                News.renderNews(await News.sendRequest(url));
            });
            return this;
        });
    }
}

const newsApp = new News();
newsApp.render();
