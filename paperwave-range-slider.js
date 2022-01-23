/**
@license
Copyright (c) 2019 Tim Horn. All rights reserved.
This code may only be used under the BSD-3-Clause license found at
https://opensource.org/licenses/BSD-3-Clause
author: Tim Horn
contact: https://paperwave.xyz
*/
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-slider/paper-slider.js'

/**
`paperwave-range-slider`  (Polymer 3) allows users to select a sub-range of a given wider range by moving the slider knobs.

Material design:

[Sliders](https://www.google.com/design/spec/components/sliders.html)
Use `min` and `max` to specify the slider range.  Default is 0 to 100.

Example:

    `<paperwave-range-slider min="10" max="80"></paperwave-range-slider>`

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--paper-slider-knob-color-min` | The min knob color | `--paper-blue-700`
`--paper-slider-knob-color-max` | The max knob color | `--paper-blue-700` 
`--paper-slider-pin-color-min` | The min pin color | `--paper-blue-700`
`--paper-slider-pin-color-max` | The max pin color | `--paper-blue-700` 
`--paper-slider-container-color` | The background color of the bar | `--paper-grey-400`
`--paper-slider-bar-color` | The background color of the slider | `transparent`
`--paper-slider-active-color` | The progress bar color | `--google-blue-700`
`--paper-slider-secondary-color` | The secondary progress bar color | `--google-blue-300`
`--paper-slider-knob-color` | The knob color | `--google-blue-700`
`--paper-slider-disabled-knob-color` | The disabled knob color | `--paper-grey-400`
`--paper-slider-pin-color` | The pin color | `--google-blue-700`
`--paper-slider-disabled-active-color` | The disabled progress bar color | `--paper-grey-400`
`--paper-slider-disabled-secondary-color` | The disabled secondary progress bar color | `--paper-grey-400`
`--paper-slider-knob-start-color` | The fill color of the knob at the far left | `transparent`
`--paper-slider-knob-start-border-color` | The border color of the knob at the far left | `--paper-grey-400`
`--paper-slider-pin-start-color` | The color of the pin at the far left | `--paper-grey-400`
`--paper-slider-height` | Height of the progress bar | `2px`

@element paperwave-range-slider
@demo demo/index.html
 */
class PaperwaveRangeSlider extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --paper-slider-container-color: var(--paper-grey-400);
        }
        #min-slider {
          position: absolute;
          --paper-slider-active-color: var(--paper-slider-container-color);
          --paper-slider-knob-color: var(--paper-slider-knob-color-min);
          --paper-slider-pin-color: var(--paper-slider-pin-color-min);
        }
        #max-slider {
          --paper-slider-knob-color: var(--paper-slider-knob-color-max);
          --paper-slider-pin-color: var(--paper-slider-pin-color-max);
        }

      </style>
      <paper-slider part="min-slider" id="min-slider" 
          min={{min}}
          max={{max}}
          disabled="{{disabled}}"
          pin="{{pin}}"
          step="{{step}}"
          immediate-value={{lowValue}}
          value={{lowValue}}>
      </paper-slider>
      <paper-slider part="max-slider" id="max-slider" 
          min={{min}}
          max={{max}}
          disabled="{{disabled}}"
          pin="{{pin}}"
          step="{{step}}"
          immediate-value={{highValue}}
          value={{highValue}}>
      </paper-slider>
    `;
  }

  static get properties() {
    return {
      /**
       * The minimum interval between the min- and max value
       */
      minInterval: {
        type: Number,
        value: 1,
        observer: '_minIntervalChanged',
        notify: true
      },
      /**
       * The lowest vaue of the selected interval
       */
      lowValue: {
        type: Number,
        value: 0,
        observer: '_lowValueChange',
        notify: true
      },
      /**
       * The highest value of the selected interval
       */
      highValue: {
        type: Number,
        value: 100,
        observer: '_highValueChange',
        notify: true
      },
      /**
       * The maximum value of the range
       */
      max: {
        type: Number,
        value: 100,
        observer: '_maxChanged',
        notify: true
      },
      /**
       * The minimum value of the range
       */
      min: {
        type: Number,
        value: 0,
        observer: '_minChanged',
        notify: true
      },
      /**
       * Disables the element
       */
      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged',
        notify: true
      },
      /**
       * If true, a pin with numeric value label is shown when the slider thumb
       * is pressed. Use for settings for which users need to know the exact
       * value of the setting.
       */
      pin: {
        type: Boolean,
        value: false,
        notify: true
      },
      /**
       * The step size which the slider can be moved
       */
      step: {
        type: Number,
        value: 1,
        observer: '_stepChanged',
        notify: true
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.maxSlider = this.shadowRoot.querySelector('#max-slider');
    this.minSlider = this.shadowRoot.querySelector('#min-slider')
    // enable min slider clicking
    this.maxSlider.$.sliderBar.style.pointerEvents = 'none';
    this.minSlider.$.sliderKnob.style.zIndex = '100';
    this.minSlider.$.sliderBar.$.primaryProgress.style.zIndex = '100';
  }

  // --- OBSERVERS ---

  _lowValueChange(e) {
    if ( this.lowValue + this.minInterval > this.highValue ) {
      let toValue = this.lowValue + this.minInterval;
      if ( toValue < 0 ) toValue = 0;
      this.maxSlider.immediateValue = toValue;
      this.maxSlider.value = toValue;
    }
    this.dispatchEvent(new CustomEvent('low-value-changed', {detail: this.lowValue}));
  }

  _highValueChange(e) {
    if (this.highValue - this.minInterval < this.lowValue ) {
      let toValue = this.highValue - this.minInterval;
      if ( toValue < 0 ) toValue = 0;
      this.minSlider.immediateValue = toValue;
      this.minSlider.value = toValue;
    }
    this.dispatchEvent(new CustomEvent('high-value-changed', {detail: this.highValue}));
  }

  _minIntervalChanged(e) {
    this.dispatchEvent(new CustomEvent('min-interval-changed', {detail: this.minInterval}));
  }

  _maxChanged(e) {
    this.dispatchEvent(new CustomEvent('max-changed', {detail: this.max}));
  }

  _minChanged(e) {
    this.dispatchEvent(new CustomEvent('min-changed', {detail: this.min}));
  }

  _disabledChanged(e) {
    this.dispatchEvent(new CustomEvent('disabled-changed', {detail: this.disabled}));
  }

  _stepChanged(e) {
    this.dispatchEvent(new CustomEvent('step-changed', {detail: this.step}));
  }

  /**
   * ### events 
   * events pass their updated data in the <event>.detail attribtue e.g:
   * '''
   * <paperwave-range-slider on-low-value-changed="_lowValueChanged"></paperwave-range-slider>
   * <!--...-->
   * _lowValueChanged(e) {
   *  newLowValue = e.detail:
   * }
   * '''
   */

  /**
   * Fired when the lowValue changed
   * @event low-value-changed
   */

  /**
   * Fired when the highValue changed
   * @event high-value-changed
   */

  /**
   * Fired when the minInterval changed
   * @event min-interval-changed
   */

  /**
   * Fired when the max changed
   * @event max-changed
   */

  /**
   * Fired when the min changed
   * @event min-changed
   */

  /**
   * Fired when disabled changed
   * @event disabled-changed
   */

  /**
   * Fired when the step size changed
   * @event step-changed
   */
}

window.customElements.define('paperwave-range-slider', PaperwaveRangeSlider);
