[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

## \<paper-range-slider\>

\<paper-range-slider\> allows users to select a sub-range by moving the slider knobs. It builds up on the official paper-slider component and provides all its the styling properties. The interactive nature of the slider makes it a great choice for picking price ranges.

## Usage

### Installation
```
npm install --save @TODO
```
### In a html file
```html
<html>
  <head>
    <script type="module">
      import '@TODO/paper-range-slider/paper-range-slider.js';
    </script>
  </head>
  <body>
    <paper-range-slider
        min="0"
        max="150"
        lowValue="30"
        highValue="90"
        minInterval="20">
    </paper-range-slider>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@TODO/paper-slider/paper-slider.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-range-slider
        min="0"
        max="150"
        lowValue="30"
        highValue="90"
        minInterval="20">
    </paper-range-slider>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Thank you for your interest :)