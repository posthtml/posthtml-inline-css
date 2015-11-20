# PostHTML CSS Inliner

```js
var posthtml = require('posthtml'),
    css = 'div { color: red }';

posthtml([require('posthtml-inline-css')(css)])
    .process('<div style="font-size: 14px">Hello!</div>')
    .then(function (result) {
        console.log(result.html);
    });

// <div style="font-size: 14px; color: red">Hello!</div>
```
