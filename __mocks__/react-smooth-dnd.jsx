const React = require('react');

module.exports.Container = function Container({children, onDrop}) {
    testOnDrops.push(onDrop);
    return React.createElement('div',{children});
}
module.exports.Draggable = function Draggable({children}) {
    return React.createElement('div',{children});
}
const testOnDrops = [];
module.exports.testOnDrops = testOnDrops;