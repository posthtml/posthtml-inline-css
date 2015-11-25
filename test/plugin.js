import expect from 'expect';
import posthtml from 'posthtml';
import postcss from 'postcss';
import inlineCss from '..';

const css = '.lead { font-size: 14px; color: blue }' +
            'div { color: red; padding: 1px }';

const html = '<div style="margin: 0; color: blue">hello</div>' +
             '<div class="lead">world</div>';

const expectedHtml = '<div style="margin: 0; color: red; padding: 1px">hello</div>' +
                     '<div class="lead" style="color: blue; padding: 1px; font-size: 14px">world</div>';

describe('Plugin', () => {
    it('should inline plain CSS', () => {
        return initPlugin(css, html).then(html => expect(html).toBe(expectedHtml));
    });


    it('should inline PostCSS', () => {
        return initPlugin(postcss().process(css), html).then(html => {
            expect(html).toBe(expectedHtml);
        });
    });
});


function initPlugin(options, html) {
    return posthtml()
        .use(inlineCss(options))
        .process(html)
        .then(result => result.html);
}
