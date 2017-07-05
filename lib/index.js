(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.CompositionObserver = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var canUseIsComposingOnInput = "InputEvent" in window && "isComposing" in window.InputEvent.prototype;

  var CompositionObserver = function () {
    function CompositionObserver() {
      var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

      _classCallCheck(this, CompositionObserver);

      this._ctx = ctx;
      this._observing = false;
      this._isComposing = false;

      if (!canUseIsComposingOnInput) {
        this._setHandlers();
      }
    }

    _createClass(CompositionObserver, [{
      key: "isComposing",
      value: function isComposing(evt) {
        return canUseIsComposingOnInput ? evt.isComposing : this._isComposing;
      }
    }, {
      key: "_onCompositionStart",
      value: function _onCompositionStart() {
        this._isComposing = true;
      }
    }, {
      key: "_onCompositionEnd",
      value: function _onCompositionEnd(evt) {
        this._isComposing = false;
        var event = new Event("input", {
          bubbles: true,
          cancelable: true
        });
        evt.target.dispatchEvent(event);
      }
    }, {
      key: "_attachEvents",
      value: function _attachEvents() {
        var ctx = this._ctx;
        ctx.addEventListener("compositionstart", this._onCompositionStart, false);
        ctx.addEventListener("compositionend", this._onCompositionEnd, false);
      }
    }, {
      key: "_detachEvents",
      value: function _detachEvents() {
        var ctx = this._ctx;
        ctx.removeEventListener("compositionstart", this._onCompositionStart, false);
        ctx.removeEventListener("compositionEnd", this._onCompositionEnd, false);
      }
    }, {
      key: "_setHandlers",
      value: function _setHandlers() {
        this._onCompositionStart = this._onCompositionStart.bind(this);
        this._onCompositionEnd = this._onCompositionEnd.bind(this);
      }
    }, {
      key: "_start",
      value: function _start() {
        if (this._observing === true) {
          return;
        }
        this._observing = true;
        this._isComposing = false;
        this._attachEvents();
      }
    }, {
      key: "_stop",
      value: function _stop() {
        if (this._observing === false) {
          return;
        }
        this._observing = false;
        this._isComposing = false;
        this._detachEvents();
      }
    }, {
      key: "start",
      value: function start() {
        if (!canUseIsComposingOnInput) {
          this._start();
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!canUseIsComposingOnInput) {
          this._stop();
        }
      }
    }]);

    return CompositionObserver;
  }();

  exports.default = CompositionObserver;
  module.exports = exports["default"];
});
