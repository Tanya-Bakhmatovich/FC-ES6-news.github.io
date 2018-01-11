import sendRequest from './../src/request';

// Factory pattern

class ElementsCreationFactory {
    constructor(tagName) {
        this.tagName = tagName;
    }

    factory({
        parent = document.body,
        attrs,
        props,
    }) {
        const element = document.createElement(this.tagName);

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
}

// Prototype pattern

export const factoryDivElement = Object.create(new ElementsCreationFactory('div'));

export const factoryImgElement = Object.create(new ElementsCreationFactory('img'));

export const factoryArticleElement = Object.create(new ElementsCreationFactory('a'));

export const factoryHeaderElement = Object.create(new ElementsCreationFactory('h1'));

export const factoryButtonElement = Object.create(new ElementsCreationFactory('button'));

// Decorator pattern (adds string 'LAT NEWS' for news have been published in the last 12 hours)

export class FactoryHeaderElementDecorator extends ElementsCreationFactory {
    constructor() {
        super('h1');
    }

    factory({
        parent = document.body,
        attrs,
        props,
    }) {
        props.innerHTML = `(LAST NEWS!) ${props.innerHTML}`;

        return super.factory({ parent, attrs, props });
    }
}

// Proxy - makes request only if the page wasn't be loaded before,
// otherwise loads data from cache

export class RequestedPagesProxy {
    constructor() {
        this.loadedPage = {};
    }
    makeRequest({ url }) {
        if (Object.keys(this.loadedPage).includes(url)) {
            return this.loadedPage[url];
        }

        this.loadedPage[url] = sendRequest(url);

        return this.loadedPage[url];
    }

}

// Strategy pattern allows us to switch the algorithm loading of resource based upon the situation.

export async function onClickHandlerStrategy({ sourceNews, source, element, url }) {
    const requestProxy = new RequestedPagesProxy();

    if (sourceNews === 'sourceNewsSmall') {
        [...document.querySelectorAll('.active')]
        .forEach(elem => elem.classList.remove('active'));
        element.classList.add('active');

        (await import(
            /* webpackChunkName: "./renderNews" */
            /* webpackMode: "lazy" */
            './../src/renderNews')).default(await requestProxy.makeRequest({ url }));
    } else {
        document.querySelector(`.${source}-small`).classList.add('active');

        const [func] = await Promise.all([import(
            /* webpackChunkName: "./renderNews" */
            /* webpackMode: "lazy" */
            './../src/renderNews'),
            import(
                /* webpackChunkName: "./renderStyle" */
                /* webpackMode: "lazy" */
                './../css/render.css'),
        ]);

        func.default(await requestProxy.makeRequest({ sendRequest, url }));
    }
}
