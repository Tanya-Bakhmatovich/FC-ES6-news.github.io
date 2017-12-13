webpackJsonp([0],{

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderNews;

var _createElement = __webpack_require__(44);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderNews(_ref) {
    var articles = _ref.articles;

    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-small').style.display = 'block';

    if (document.querySelector('.main-section')) {
        document.body.removeChild(document.querySelector('.main-section'));
    }

    var main = (0, _createElement2.default)({ attrs: { class: 'main-section' } });

    articles.forEach(function (article) {
        var author = article.author,
            description = article.description,
            publishedAt = article.publishedAt,
            title = article.title,
            url = article.url,
            urlToImage = article.urlToImage;

        var articleBlock = (0, _createElement2.default)({ parent: main, tagName: 'a', attrs: { href: '' + url, target: '_blank', class: 'article' } });

        (0, _createElement2.default)({
            tagName: 'img',
            parent: articleBlock,
            attrs: { class: 'preview', src: '' + urlToImage, style: { height: '200px' } }
        });

        (0, _createElement2.default)({
            parent: articleBlock,
            tagName: 'h1',
            attrs: { class: 'title', href: '' + url, target: '_blank' },
            props: { innerHTML: '' + title }
        });

        (0, _createElement2.default)({
            parent: articleBlock,
            attrs: { class: 'author' },
            props: { innerHTML: '' + author }
        });

        var dateTimeBlock = (0, _createElement2.default)({
            parent: articleBlock,
            attrs: { class: 'date-time' }
        });

        (0, _createElement2.default)({
            parent: dateTimeBlock,
            attrs: { class: 'date' },
            props: { innerHTML: '' + publishedAt.slice(0, 10) }
        });

        (0, _createElement2.default)({
            parent: dateTimeBlock,
            attrs: { class: 'time', title: '' + url },
            props: { innerHTML: '' + publishedAt.slice(12, -1) }
        });

        (0, _createElement2.default)({
            parent: articleBlock,
            attrs: { class: 'description' },
            props: { innerHTML: '' + description }
        });
    });
}

/***/ })

});
//# sourceMappingURL=0.bundle.js.map