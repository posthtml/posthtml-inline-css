import objectAssign from 'object-assign';
import specificity from 'specificity';


export function extendStyle(htmlNode, cssNode) {
    htmlNode.attrs = htmlNode.attrs || {};
    htmlNode.attrs.style = htmlNode.attrs.style || '';

    const htmlNodeCss = parseCssFromStyle(htmlNode.attrs.style);
    const cssNodeCss = parseCssFromNode(cssNode);
    const newCss = objectAssign({}, htmlNodeCss, cssNodeCss);
    htmlNode.attrs.style = stringifyCss(newCss);

    return htmlNode;
}


export function sortCSSNodesBySpecificity(nodes) {
    // Sort CSS nodes by specificity (ascending): div - .foo - #bar
    return nodes.sort((a, b) => {
        a = getSpecificity(a.selector);
        b = getSpecificity(b.selector);

        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    });
}


var specificityCache = {};
function getSpecificity(selector) {
    if (specificityCache[selector] !== undefined) {
        return specificityCache[selector];
    }

    const specificityResult = specificity.calculate(selector)[0];
    const specificityParts = specificityResult.specificity.split(',').reverse();
    // Convert "0,1,3,2" to 132 (2*1 + 3*10 + 1*100 + 0*1000)
    const totalSpecificity = specificityParts.reduce((totalSpecificity, specificity, i) => {
        specificity = parseInt(specificity, 10);
        return totalSpecificity + (specificity * Math.pow(10, i));
    }, 0);

    specificityCache[selector] = totalSpecificity;

    return totalSpecificity;
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
