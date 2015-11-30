import { format } from 'util';
import expect from 'expect';
import posthtml from 'posthtml';
import postcss from 'postcss';
import inlineCss from '..';

const css = '.lead { font-size: 14px; color: blue }\n' +
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


    it('should inline CSS from <style>', () => {
        const cssParts = css.split('\n');
        const htmlTemplate = '<style>%s</style> %s <style>%s</style>';
        const htmlWithStyles = format(htmlTemplate, cssParts[0], html, cssParts[1]);
        const expectedHtmlWithStyle = format(htmlTemplate, cssParts[0], expectedHtml, cssParts[1]);

        return initPlugin(undefined, htmlWithStyles).then(html => {
            expect(html).toBe(expectedHtmlWithStyle);
        });
    });
});


function initPlugin(options, html) {
    return posthtml()
        .use(inlineCss(options))
        .process(html)
        .then(result => result.html);
}
