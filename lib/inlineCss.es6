import 'babel-polyfill';
import postcss from 'postcss';
import matchHelper from 'posthtml-match-helper';
import { extendStyle } from './helpers';


export default function inlineCss(css) {
    return tree => {
        postcss.parse(css).each(cssNode => {
            tree.match(matchHelper(cssNode.selector), htmlNode => {
                return extendStyle(htmlNode, cssNode);
            });
        });
    };
}
