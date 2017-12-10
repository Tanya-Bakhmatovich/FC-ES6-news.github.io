import createElement from './createElement';

export default function renderNews({ articles }) {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-small').style.display = 'block';

    if (document.querySelector('.main-section')) {
        document.body.removeChild(document.querySelector('.main-section'));
    }

    const main = createElement({ attrs: { class: 'main-section' } });

    articles.forEach((article) => {
        const {
            author,
            description,
            publishedAt,
            title,
            url,
            urlToImage,
        } = article;
        const articleBlock = createElement({ parent: main, tagName: 'a', attrs: { href: `${url}`, target: '_blank', class: 'article' } });

        createElement({
            tagName: 'img',
            parent: articleBlock,
            attrs: { class: 'preview', src: `${urlToImage}`, style: { height: '200px' } },
        });

        createElement({
            parent: articleBlock,
            tagName: 'h1',
            attrs: { class: 'title', href: `${url}`, target: '_blank' },
            props: { innerHTML: `${title}` },
        });

        createElement({
            parent: articleBlock,
            attrs: { class: 'author' },
            props: { innerHTML: `${author}` },
        });

        const dateTimeBlock = createElement({
            parent: articleBlock,
            attrs: { class: 'date-time' },
        });

        createElement({
            parent: dateTimeBlock,
            attrs: { class: 'date' },
            props: { innerHTML: `${publishedAt.slice(0, 10)}` },
        });

        createElement({
            parent: dateTimeBlock,
            attrs: { class: 'time', title: `${url}` },
            props: { innerHTML: `${publishedAt.slice(12, -1)}` },
        });

        createElement({
            parent: articleBlock,
            attrs: { class: 'description' },
            props: { innerHTML: `${description}` },
        });
    });
}
