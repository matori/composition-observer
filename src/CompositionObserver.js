"use strict";

const canUseIsComposingOnInput = "InputEvent" in window && "isComposing" in window.InputEvent.prototype;

class CompositionObserver {

  constructor(ctx = window) {

    this._ctx = ctx;
    this._observing = false;
    this._isComposing = false;

    if(!canUseIsComposingOnInput) {
      this._setHandlers();
    }
  }

  isComposing(evt) {
    return canUseIsComposingOnInput ? evt.isComposing : this._isComposing;
  }

  _onCompositionStart() {
    this._isComposing = true;
  }

  _onCompositionEnd(evt) {
    this._isComposing = false;
    const event = new Event("input", {
      bubbles: true,
      cancelable: true
    });
    evt.target.dispatchEvent(event);
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
    if (this._observing === true) {
      return;
    }
    this._observing = true;
    this._isComposing = false;
    this._attachEvents();
  }

  _stop() {
    if (this._observing === false) {
      return;
    }
    this._observing = false;
    this._isComposing = false;
    this._detachEvents();
  }

  start() {
    if (!canUseIsComposingOnInput) {
      this._start();
    }
  }

  stop() {
    if (!canUseIsComposingOnInput) {
      this._stop();
    }
  }
}

export default CompositionObserver;
