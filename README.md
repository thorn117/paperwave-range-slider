[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/paperwave-range-slider)

## \<paperwave-range-slider\>

\<paperwave-range-slider\> allows users to select a sub-range by moving the slider knobs. It builds up on the official paper-slider component and provides most of its styling properties. The interactive nature of the slider makes it a great choice for picking price or year ranges.

[Demo](https://www.webcomponents.org/element/paperwave-range-slider/demo/demo/index.html)


## Usage

### Installation
```
npm install --save paperwave-range-slider
```
### In a html file
```html
<html>
  <head>
    <script type="module">
      import 'paperwave-range-slider/paperwave-range-slider.js';
    </script>
  </head>
  <body>
    <paperwave-range-slider
        min="0"
        max="150"
        lowValue="30"
        highValue="90"
        minInterval="20">
    </paperwave-range-slider>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import 'paperwave-range-slider/paperwave-range-slider.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paperwave-range-slider id="rangeSilder"
        min="0"
        max="150"
        lowValue="30"
        highValue="90"
        minInterval="20"
        pin
        on-low-value-changes="_lowValueHandler">
    </paperwave-range-slider>
    `;
  }
  _lowValueHandler (e) {
    console.log(e.detail);
  }
}
customElements.define('sample-element', SampleElement);
```

\<paperwave-range-slider\> supports most of the \<paper-slider\> style properties: [paper-slider docs](https://www.webcomponents.org/element/@polymer/paper-slider/elements/paper-slider)

The element is composed of two paper-slider elements. One for the low-value and one for the high-value. You can target them both individually: 
```js
// min-slider:
this.shadowRoot.querySelector('#<paperwave-range-slider ID>')
  .shadowRoot.querySelector('#min-slider');

// max-slider: 
this.shadowRoot.querySelector('#<paperwave-range-slider ID>')
  .shadowRoot.querySelector('#max-slider');

```

### Thank you for your interest :)

If you encounter any issues feel free to open an issue on github and I will try to fix them asap.