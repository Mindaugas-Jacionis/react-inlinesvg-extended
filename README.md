# react-inlinesvg-extended

This is extended version of [`react-inlinesvg`](https://www.npmjs.com/package/react-inlinesvg). I recommend on reviewing available `props` list and if none of needed have "(extended)" next to their name then I would recommend on using original [package](https://www.npmjs.com/package/react-inlinesvg).

Usage
----
First install it.

`npm install --save react-inlinesvg`

And import it into your code:


```jsx
import SVG  from 'react-inlinesvg';

<SVG
    src="/path/to/myfile.svg"
    preload={<Loader />}
    onLoad={(src) => {
        myOnLoadHandler(src);
    }}
>
  Here's some optional content for browsers that don't support XHR or inline
  SVGs. You can use other React components here too. Here, I'll show you.
  <img src="/path/to/myfile.png" />
</SVG>
```


Props
----

**src** `string`
The SVG file you want to load. It can be an `url` or a string (base64 or encoded)

**wrapper** `function`
A React class or a function that returns a component instance to be used as the wrapper component. Defaults to `React.createFactory('span')`

**preloader** `node`
A component to be shown while the SVG is loading.

**cacheGetRequests** `boolean`
A boolean to only request SVGs once. Default is `false`.

**uniquifyIDs** `boolean`
A boolean that create unique IDs for each icon by hashing it. Default is `true`.

**uniqueHash** `string`
A string to use with `uniquifyIDs`. Default to a random 8 characters string `[A-Za-z0-9]`

**onLoad** `function`
A callback to be invoked upon successful load.
This will receive 2 arguments: the `src` prop and a `isCached` boolean

**onError** `function`
A callback to be invoked if loading the SVG fails.
This will receive a single argument:

- a xhr `RequestError` with:

```js
{
    ...,
    isHttpError: bool,
    status: number
}
```

- or an `InlineSVGError`, which has the following properties:

```js
{
    name: 'InlineSVGError',
    isSupportedBrowser: bool,
    isConfigurationError: bool,
    isUnsupportedBrowserError: bool,
    message: string
}
```

**remove** (`extended`) - `array`  
Sometimes you find yourself in need of removing some attributes from original svg(i.e. `height`) and you don't have control over that anywhere but your code.  
An array of attributes to remove from `<svg >` tag. Default `[]`(empty array).


Browser Support
----

Any browsers that support inlining SVGs and XHR will work. The component goes out of its way to handle IE9's weird XHR support so, IE9 and up get your SVG;
lesser browsers get the fallback.
We use [httpplease](https://github.com/matthewwithanm/httpplease.js) for XHR requests.

CORS
----

If loading SVGs from another domain, you'll need to make sure it allows [CORS].


XSS Warning
----

This component places the loaded file into your DOM, so you need to be careful
about XSS attacks. Only load trusted content, and don't use unsanitized user
input to generate the `src`!


[CORS]: https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS
[svg-use-external-source]: http://css-tricks.com/svg-use-external-source
[use-article]: http://taye.me/blog/svg/a-guide-to-svg-use-elements/
[use-support]: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#Browser_compatibility
