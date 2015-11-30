import expect from 'expect';
import { sortCssNodesBySpecificity } from '../lib/helpers';

describe('Helpers', () => {
    it('sortCssNodesBySpecificity()', () => {
        const cssNodes = [{selector: '#foo'}, {selector: '.bar'}, {selector: 'div'}];
        const sortedCssNodes = [{selector: 'div'}, {selector: '.bar'}, {selector: '#foo'}];

        expect(sortCssNodesBySpecificity(cssNodes)).toEqual(sortedCssNodes);
    });
});
