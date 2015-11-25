import postcss from 'postcss';
import matchHelper from 'posthtml-match-helper';
import { extendStyle } from './helpers';


export default css => {
    return function inlineCss(tree) {
        var postcssObj = css.then ? css : postcss().process(css);

        return postcssObj.then(result => {
            return result.root.each(cssNode => {
                tree.match(matchHelper(cssNode.selector), htmlNode => {
                    return extendStyle(htmlNode, cssNode);
                });
            });
        });
    };
};
