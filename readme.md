# sheetify-jstransform

[![Greenkeeper badge](https://badges.greenkeeper.io/seangenabe/sheetify-jstransformer.svg)](https://greenkeeper.io/)

[jstransformer](https://www.npmjs.com/package/jstransformer) plugin for [sheetify](https://www.npmjs.com/package/sheetify).

## Usage

Example usage in [browserify](https://www.npmjs.com/package/browserify):

```javascript
b.transform('sheetify/transform', {
  use: [
    'sheetify-jstransformer',
    {
      use: require('jstransformer-autoprefixer')
    }
  ]
})
```

Multiple transformers to apply serially to the source:

```javascript
b.transform('sheetify/transform', {
  use: [
    'sheetify-jstransformer',
    {
      use: [
        require('jstransformer-less'),
        require('jstransformer-autoprefixer')
      ]
    }
  ]
})
```

### Options

* `use`: The transformer, or array of transformers, to use. *Required.*

  An element of or the single value of `use` may be:
  * A transformer instance
  * An array `[transformer, opts, optsCb]` with:
    * `transformer` - The transformer instance
    * `opts` - Options to pass to the transformer.
    * `optsCb(opts, filename)` - A function that can transform options to possibly incorporate the filename; return the new options to pass to the transformer. Default: identity function

## See also

* [jstransformer-sheetify](https://www.npmjs.com/package/jstransformer-sheetify) - The other way around.
