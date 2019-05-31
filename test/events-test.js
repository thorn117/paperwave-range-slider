import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../paperwave-range-slider.js'

/**
 * @customElement
 * @polymer
 */
class EventsTest extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

      </style>

      <paperwave-range-slider on-high-value-changed="_handle" on-low-value-changed="_handle"></paperwave-range-slider>
    `;
  }

  _handle(e) {
      console.log(e.detail);
  }

}

window.customElements.define('paper-test', EventsTest);
