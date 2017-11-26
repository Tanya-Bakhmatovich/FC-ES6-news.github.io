const URL_START = 'https://newsapi.org/v2/top-headlines?sources=';
const URL_END = '&apiKey=081377ca5b314ef4b45a9331d41406c4';
const sources = ['national-geographic', 'bbc-news', 'the-wall-street-journal'];

class News {

  sendRequest(url) {

    fetch(url)
      .then(response => response.json())
      .then(data => this.renderNews(data))
      .catch(error => error)
  }

  createElement({
    parent = document.body,
    tagName = 'div',
    attrs,
    props
  }) {
    let element = document.createElement(tagName);
    if (attrs) {
      Object.keys(attrs).forEach(attr => {
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


  renderNews({ articles }) {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-small').style.display = 'block';

    if (document.querySelector('.main-section')) {
      document.body.removeChild(document.querySelector('.main-section'));
    }

    const main = this.createElement({ attrs: { class: 'main-section' } });

    articles.forEach((article) => {
      const { author, description, publishedAt, source: { id, name }, title, url, urlToImage } =
      article;

      const articleBlock = this.createElement({ parent: main, tagName: 'article' });

      const titleBlock = this.createElement({
        parent: articleBlock,
        tagName: 'a',
        attrs: { class: 'title', href: `${url}`, target: '_blank' },
        props: { innerHTML: `${title}` }
      });

      const imageBlock = this.createElement({
        parent: articleBlock,
        attrs: { class: 'preview', style: { backgroundImage: `url(${urlToImage})` } }
      });

      const infoBlock = this.createElement({
        parent: articleBlock,
        attrs: { class: 'info' }
      });

      const authorBlock = this.createElement({
        parent: infoBlock,
        tagName: 'span',
        attrs: { class: 'author' },
        props: { innerHTML: `${author}` }
      });

      const dateBlock = this.createElement({
        parent: infoBlock,
        tagName: 'span',
        attrs: { class: 'date' },
        props: { innerHTML: `${publishedAt.slice(0, 10)}` }
      });

      const timeBlock = this.createElement({
        parent: infoBlock,
        tagName: 'span',
        attrs: { class: 'time', title: `${url}`
        },
        props: { innerHTML: `${publishedAt.slice(12, -1)}` }
      });

      const descriptionBlock = this.createElement({
        parent: infoBlock,
        attrs: { class: 'description' },
        props: { innerHTML: `${description}` }
      });

      const readMoreBlock = this.createElement({
        parent: infoBlock,
        tagName: 'a',
        attrs: { class: 'read-more', href: `${url}`, target: '_blank' },
        props: { innerHTML: 'Read more...' }
      });
    })
  }

  render() {

    const header = this.createElement({
      attrs: { class: 'header' },
      props: { innerHTML: 'Stay tuned!' }
    });

    const menu = this.createElement({ attrs: { class: 'menu' } });

    const menuSmall = this.createElement({ attrs: { class: 'menu-small' } });

    sources.map(source => {

      const url = `${URL_START}${source}${URL_END}`;

      const sourceNews = this.createElement({
        parent: menu,
        attrs: { class: `${source}` },
        props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` }
      });

      const logo = this.createElement({
        parent: sourceNews,
        tagName: 'img',
        attrs: { style: { width: '320px', height: '200px' }, src: `img/${source}.png` }
      });

      const sourceNewsSmall = this.createElement({
        parent: menuSmall,
        attrs: { class: `${source}-small` },
        props: { innerHTML: `${source.split('-').join(' ').toUpperCase()}` }
      });

      sourceNewsSmall.addEventListener('click', () => {
        document.querySelectorAll('.active').forEach(elem => elem.classList.remove('active'));
        sourceNewsSmall.classList.add('active');
        this.sendRequest(url);
      });

      sourceNews.addEventListener('click', () => {
        document.querySelector(`.${source}-small`).classList.add('active');
        this.sendRequest(url);
      });
    })
  }
}

const newsApp = new News();
newsApp.render();
