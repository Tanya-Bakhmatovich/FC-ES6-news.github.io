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

                sourceNewsSmall.addEventListener('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _context;

                    var forEach;
                    return regeneratorRuntime.wrap(function _callee$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    forEach = Array.prototype.forEach;

                                    (_context = document.querySelectorAll('.active'), forEach).call(_context, function (elem) {
                                        return elem.classList.remove('active');
                                    });
                                    sourceNewsSmall.classList.add('active');
                                    _context2.t0 = News;
                                    _context2.next = 6;
                                    return News.sendRequest(url);

                                case 6:
                                    _context2.t1 = _context2.sent;

                                    _context2.t0.renderNews.call(_context2.t0, _context2.t1);

                                case 8:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee, _this);
                })));

                sourceNews.addEventListener('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    document.querySelector('.' + source + '-small').classList.add('active');
                                    _context3.t0 = News;
                                    _context3.next = 4;
                                    return News.sendRequest(url);

                                case 4:
                                    _context3.t1 = _context3.sent;

                                    _context3.t0.renderNews.call(_context3.t0, _context3.t1);

                                case 6:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee2, _this);
                })));
                return _this;
            });
        }
    }], [{
        key: 'sendRequest',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
                return regeneratorRuntime.wrap(function _callee3$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return fetch(url);

                            case 3:
                                return _context4.abrupt('return', _context4.sent.json());

                            case 6:
                                _context4.prev = 6;
                                _context4.t0 = _context4['catch'](0);

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee3, this, [[0, 6]]);
            }));

            function sendRequest(_x) {
                return _ref3.apply(this, arguments);
            }

            return sendRequest;
        }()
    }, {
        key: 'createElement',
        value: function createElement(_ref4) {
            var _ref4$parent = _ref4.parent,
                parent = _ref4$parent === undefined ? document.body : _ref4$parent,
                _ref4$tagName = _ref4.tagName,
                tagName = _ref4$tagName === undefined ? 'div' : _ref4$tagName,
                attrs = _ref4.attrs,
                props = _ref4.props;

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
        value: function renderNews(_ref5) {
            var articles = _ref5.articles;

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