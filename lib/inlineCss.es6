import postcss from 'postcss';
import matchHelper from 'posthtml-match-helper';
import { extendStyle, sortCssNodesBySpecificity, getCssFromStyleTags } from './helpers';


export default css => {
    return function inlineCss(tree) {
        if (! css) {
            css = getCssFromStyleTags(tree);
        }

        var postcssObj = css.then ? css : postcss().process(css);
        return postcssObj
            .then(result => sortCssNodesBySpecificity(result.root.nodes))
            .then(cssNodes => {
                cssNodes.forEach(cssNode => {
                    tree.match(matchHelper(cssNode.selector), htmlNode => {
                        return extendStyle(htmlNode, cssNode);
                    });
                });
            });
    };
};
