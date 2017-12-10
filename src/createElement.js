export default function createElement({
    parent = document.body,
    tagName = 'div',
    attrs,
    props,
}) {
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
