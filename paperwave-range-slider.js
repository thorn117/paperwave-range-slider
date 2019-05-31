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
 * `paper-range-slider`
 * paper-range-slider allows users to select a range of a range by moving the slider thumbs.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
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
      <paper-slider id="min-slider" 
          min={{min}}
          max={{max}}
          disabled="{{disabled}}"
          pin="{{pin}}"
          step="{{step}}"
          immediate-value={{lowValue}}
          value={{lowValue}}>
      </paper-slider>
      <paper-slider id="max-slider" 
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
      minInterval: {
        type: Number,
        value: 1,
        observer: '_minIntervalChanged'
      },
      lowValue: {
        type: Number,
        value: 0,
        observer: '_lowValueChange'
      },
      highValue: {
        type: Number,
        value: 100,
        observer: '_highValueChange'
      },
      max: {
        type: Number,
        value: 100,
        observer: '_maxChanged'
      },
      min: {
        type: Number,
        value: 0,
        observer: '_minChanged'
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged'
      },
      pin: {
        type: Boolean,
        value: false
      },
      step: {
        type: Number,
        value: 1,
        observer: '_stepChanged'
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

}

window.customElements.define('paperwave-range-slider', PaperWaveRangeSlider);
