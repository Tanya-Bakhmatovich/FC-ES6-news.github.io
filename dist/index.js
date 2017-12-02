'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL_START = 'https://newsapi.org/v2/top-headlines?sources=';
var URL_END = '&apiKey=081377ca5b314ef4b45a9331d41406c4';
var sources = ['national-geographic', 'bbc-news', 'the-wall-street-journal'];

var News = function () {
    function News() {
        _classCallCheck(this, News);
    }

    _createClass(News, [{
        key: 'render',
        value: function render() {
            var _this = this;

            News.createElement({
                attrs: { class: 'header' },
                props: { innerHTML: 'Stay tuned!' }
            });

            var menu = News.createElement({ attrs: { class: 'menu' } });

            var menuSmall = News.createElement({ attrs: { class: 'menu-small' } });

            sources.map(function (source) {
                var url = '' + URL_START + source + URL_END;

                var sourceNews = News.createElement({
                    parent: menu,
                    attrs: { class: '' + source },
                    props: { innerHTML: '' + source.split('-').join(' ').toUpperCase() }
                });

                News.createElement({
                    parent: sourceNews,
                    tagName: 'img',
                    attrs: { style: { width: '320px', height: '200px' }, src: 'img/' + source + '.png' }
                });

                var sourceNewsSmall = News.createElement({
                    parent: menuSmall,
                    attrs: { class: source + '-small' },
                    props: { innerHTML: '' + source.split('-').join(' ').toUpperCase() }
                });

                sourceNewsSmall.addEventListener('click', function () {
                    var _context;

                    var forEach = Array.prototype.forEach;

                    (_context = document.querySelectorAll('.active'), forEach).call(_context, function (elem) {
                        return elem.classList.remove('active');
                    });
                    sourceNewsSmall.classList.add('active');
                    News.sendRequest(url);
                });

                sourceNews.addEventListener('click', function () {
                    document.querySelector('.' + source + '-small').classList.add('active');
                    News.sendRequest(url);
                });
                return _this;
            });
        }
    }], [{
        key: 'sendRequest',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var response, data;
                return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return fetch(url);

                            case 3:
                                response = _context2.sent;
                                _context2.next = 6;
                                return response.json();

                            case 6:
                                data = _context2.sent;

                                News.renderNews(data);
                                _context2.next = 12;
                                break;

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2['catch'](0);

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee, this, [[0, 10]]);
            }));

            function sendRequest(_x) {
                return _ref.apply(this, arguments);
            }

            return sendRequest;
        }()
    }, {
        key: 'createElement',
        value: function createElement(_ref2) {
            var _ref2$parent = _ref2.parent,
                parent = _ref2$parent === undefined ? document.body : _ref2$parent,
                _ref2$tagName = _ref2.tagName,
                tagName = _ref2$tagName === undefined ? 'div' : _ref2$tagName,
                attrs = _ref2.attrs,
                props = _ref2.props;

            var element = document.createElement(tagName);
            if (attrs) {
                Object.keys(attrs).forEach(function (attr) {
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
    }, {
        key: 'renderNews',
        value: function renderNews(_ref3) {
            var articles = _ref3.articles;

            document.querySelector('.menu').style.display = 'none';
            document.querySelector('.menu-small').style.display = 'block';

            if (document.querySelector('.main-section')) {
                document.body.removeChild(document.querySelector('.main-section'));
            }

            var main = News.createElement({ attrs: { class: 'main-section' } });

            articles.forEach(function (article) {
                var author = article.author,
                    description = article.description,
                    publishedAt = article.publishedAt,
                    title = article.title,
                    url = article.url,
                    urlToImage = article.urlToImage;


                var articleBlock = News.createElement({ parent: main, tagName: 'a', attrs: { href: '' + url, target: '_blank', class: 'article' } });

                News.createElement({
                    tagName: 'img',
                    parent: articleBlock,
                    attrs: { class: 'preview', src: '' + urlToImage, style: { height: '200px' } }
                });

                News.createElement({
                    parent: articleBlock,
                    tagName: 'h1',
                    attrs: { class: 'title', href: '' + url, target: '_blank' },
                    props: { innerHTML: '' + title }
                });

                News.createElement({
                    parent: articleBlock,
                    attrs: { class: 'author' },
                    props: { innerHTML: '' + author }
                });

                var dateTimeBlock = News.createElement({
                    parent: articleBlock,
                    attrs: { class: 'date-time' }
                });

                News.createElement({
                    parent: dateTimeBlock,
                    attrs: { class: 'date' },
                    props: { innerHTML: '' + publishedAt.slice(0, 10) }
                });

                News.createElement({
                    parent: dateTimeBlock,
                    attrs: { class: 'time', title: '' + url },
                    props: { innerHTML: '' + publishedAt.slice(12, -1) }
                });

                News.createElement({
                    parent: articleBlock,
                    attrs: { class: 'description' },
                    props: { innerHTML: '' + description }
                });
            });
        }
    }]);

    return News;
}();

var newsApp = new News();
newsApp.render();