"use strict";

const canUseIsComposingOnInput = "InputEvent" in window && window.InputEvent.prototype.hasOwnProperty('isComposing');
const canUseIsComposingOnKeyboard = window.KeyboardEvent.prototype.hasOwnProperty("isComposing");

class CompositionObserver {

  constructor(ctx = window) {
    this._ctx = ctx;
    this._enabled = !canUseIsComposingOnInput || !canUseIsComposingOnKeyboard;
    this._observing = false;
    this._isComposing = false;

    if (this._enabled) {
      this._setHandlers();
    }
  }

  _onCompositionStart() {
    this._isComposing = true;
  }

  _onCompositionEnd() {
    this._isComposing = false;
  }

  _attachEvents() {
    const ctx = this._ctx;
    ctx.addEventListener("compositionstart", this._onCompositionStart, false);
    ctx.addEventListener("compositionend", this._onCompositionEnd, false);
  }

  _detachEvents() {
    const ctx = this._ctx;
    ctx.removeEventListener("compositionstart", this._onCompositionStart, false);
    ctx.removeEventListener("compositionend", this._onCompositionEnd, false);
  }

  _setHandlers() {
    this._onCompositionStart = this._onCompositionStart.bind(this);
    this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }

  _start() {
    if (this._observing) {
      return;
    }
    this._observing = true;
    this._isComposing = false;
    this._attachEvents();
  }

  _stop() {
    if (!this._observing) {
      return;
    }
    this._observing = false;
    this._isComposing = false;
    this._detachEvents();
  }

  start() {
    if (this._enabled) {
      this._start();
    }
  }

  stop() {
    if (this._enabled) {
      this._stop();
    }
  }

  isComposing(event) {
    const eventType = event.type;
    if (eventType === "keydown" || eventType === "keyup") {
      return canUseIsComposingOnKeyboard ? event.isComposing : this._isComposing;
    }
    if (eventType === "input" || eventType === "beforeinput") {
      return canUseIsComposingOnInput ? event.isComposing : this._isComposing;
    }
  }

}

export default CompositionObserver;
