import objectAssign from 'object-assign';
import specificity from 'specificity';
import parseAttrs from 'posthtml-attrs-parser';


export function extendStyle(htmlNode, cssNode) {
    var attrs = parseAttrs(htmlNode.attrs);
    const cssNodeCss = parseCssFromNode(cssNode);
    attrs.style = objectAssign(attrs.style || {}, cssNodeCss);
    htmlNode.attrs = attrs.compose();

    return htmlNode;
}


export function sortCssNodesBySpecificity(nodes) {
    // Sort CSS nodes by specificity (ascending): div - .foo - #bar
    return nodes.sort((a, b) => {
        a = typeof a.selector == 'string' ? getSpecificity(a.selector) : 0;
        b = typeof b.selector == 'string' ? getSpecificity(b.selector) : 0;

        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    });
}


export function getCssFromStyleTags(htmlTree) {
    var css = [];
    htmlTree.match({tag: 'style'}, tag => {
        css = css.concat(tag.content || []);
        return tag;
    });

    return css.join(' ');
}


var specificityCache = {};
function getSpecificity(selector) {
    if (specificityCache[selector] !== undefined) {
        return specificityCache[selector];
    }

    const specificityResult = specificity.calculate(selector)[0];
    const specificityParts = specificityResult.specificity.split(',').reverse();
    // Convert "0,1,3,2" to 10302 (2*1 + 3*100 + 1*10'000 + 0*1'000'000)
    const totalSpecificity = specificityParts.reduce((totalSpecificity, specificity, i) => {
        specificity = parseInt(specificity, 10);
        return totalSpecificity + (specificity * Math.pow(10, i * 2));
    }, 0);

    specificityCache[selector] = totalSpecificity;

    return totalSpecificity;
}


function parseCssFromNode(cssNode) {
    var css = {};
    cssNode.nodes.forEach(node => {
        css[node.prop] = node.value;
    });

    return css;
}
