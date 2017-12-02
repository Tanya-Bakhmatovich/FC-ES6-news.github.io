module.exports = function () {
    return {
        name: 'remove-console.log',
        visitor: {
            CallExpression(path) {
                if (path.node.callee.type === 'MemberExpression'
                    && path.node.callee.object.name === 'console'
                    && path.node.callee.property.name === 'log') {
                    path.remove();
                }
            },
        },
    };
}
