import objectAssign from 'object-assign';


export function extendStyle(htmlNode, cssNode) {
    htmlNode.attrs = htmlNode.attrs || {};
    htmlNode.attrs.style = htmlNode.attrs.style || '';

    const htmlNodeCss = parseCssFromStyle(htmlNode.attrs.style);
    const cssNodeCss = parseCssFromNode(cssNode);
    const newCss = objectAssign({}, htmlNodeCss, cssNodeCss);
    htmlNode.attrs.style = stringifyCss(newCss);

    return htmlNode;
}


function stringifyCss(css) {
    const styles = Object.keys(css).map(prop => prop + ': ' + css[prop]);
    return styles.join('; ');
}


function parseCssFromStyle(style) {
    var css = {};
    style.split(';').forEach(cssRule => {
        const cssRuleParts = cssRule.split(':');
        if (cssRuleParts.length < 2) {
            return;
        }

        const cssRuleProp = cssRuleParts[0].trim();
        const cssRuleValue = cssRuleParts.slice(1).join(':').trim();

        css[cssRuleProp] = cssRuleValue;
    });

    return css;
}


function parseCssFromNode(cssNode) {
    var css = {};
    cssNode.nodes.forEach(node => {
        css[node.prop] = node.value;
    });

    return css;
}
