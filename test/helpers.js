import expect from 'expect';
import { sortCSSNodesBySpecificity } from '../lib/helpers';

describe('Helpers', () => {
    it('sortCSSNodesBySpecificity()', () => {
        const cssNodes = [{selector: '#foo'}, {selector: '.bar'}, {selector: 'div'}];
        const sortedCssNodes = [{selector: 'div'}, {selector: '.bar'}, {selector: '#foo'}];

        expect(sortCSSNodesBySpecificity(cssNodes)).toEqual(sortedCssNodes);
    });
});
