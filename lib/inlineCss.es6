import 'babel-polyfill';
import postcss from 'postcss';
import matchHelper from 'posthtml-match-helper';
import { extendStyle } from './helpers';


export default css => {
    return function inlineCss(tree) {
        postcss.parse(css).each(cssNode => {
            tree.match(matchHelper(cssNode.selector), htmlNode => {
                return extendStyle(htmlNode, cssNode);
            });
        });
    };
};
