import expect from 'expect';
import posthtml from 'posthtml';
import inlineCss from '..';


describe('Plugin', () => {
    it('should inline CSS', () => {
        const css = 'div { color: red; padding: 1px }' +
                    '.lead { font-size: 14px; color: blue }';

        const html = '<div style="margin: 0; color: blue">hello</div>' +
                     '<div class="lead">world</div>';

        const expectedHtml = '<div style="margin: 0; color: red; padding: 1px">hello</div>' +
                             '<div class="lead" style="color: blue; padding: 1px; font-size: 14px">world</div>';

        return initPlugin(css, html).then(html => expect(html).toBe(expectedHtml));
    });
});


function initPlugin(options, html) {
    return posthtml()
        .use(inlineCss(options))
        .process(html)
        .then(result => result.html);
}
