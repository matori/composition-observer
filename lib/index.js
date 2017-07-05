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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21wb3NpdGlvbk9ic2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSwyQkFBMkIsZ0JBQWdCLE1BQWhCLElBQTBCLGlCQUFpQixPQUFPLFVBQVAsQ0FBa0IsU0FBOUY7O01BRU0sbUI7QUFFSixtQ0FBMEI7QUFBQSxVQUFkLEdBQWMsdUVBQVIsTUFBUTs7QUFBQTs7QUFFeEIsV0FBSyxJQUFMLEdBQVksR0FBWjtBQUNBLFdBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUssWUFBTCxHQUFvQixLQUFwQjs7QUFFQSxVQUFHLENBQUMsd0JBQUosRUFBOEI7QUFDNUIsYUFBSyxZQUFMO0FBQ0Q7QUFDRjs7OztrQ0FFVyxHLEVBQUs7QUFDZixlQUFPLDJCQUEyQixJQUFJLFdBQS9CLEdBQTZDLEtBQUssWUFBekQ7QUFDRDs7OzRDQUVxQjtBQUNwQixhQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDs7O3dDQUVpQixHLEVBQUs7QUFDckIsYUFBSyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsWUFBTSxRQUFRLElBQUksS0FBSixDQUFVLE9BQVYsRUFBbUI7QUFDL0IsbUJBQVMsSUFEc0I7QUFFL0Isc0JBQVk7QUFGbUIsU0FBbkIsQ0FBZDtBQUlBLFlBQUksTUFBSixDQUFXLGFBQVgsQ0FBeUIsS0FBekI7QUFDRDs7O3NDQUVlO0FBQ2QsWUFBTSxNQUFNLEtBQUssSUFBakI7QUFDQSxZQUFJLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxLQUFLLG1CQUE5QyxFQUFtRSxLQUFuRTtBQUNBLFlBQUksZ0JBQUosQ0FBcUIsZ0JBQXJCLEVBQXVDLEtBQUssaUJBQTVDLEVBQStELEtBQS9EO0FBQ0Q7OztzQ0FFZTtBQUNkLFlBQU0sTUFBTSxLQUFLLElBQWpCO0FBQ0EsWUFBSSxtQkFBSixDQUF3QixrQkFBeEIsRUFBNEMsS0FBSyxtQkFBakQsRUFBc0UsS0FBdEU7QUFDQSxZQUFJLG1CQUFKLENBQXdCLGdCQUF4QixFQUEwQyxLQUFLLGlCQUEvQyxFQUFrRSxLQUFsRTtBQUNEOzs7cUNBRWM7QUFDYixhQUFLLG1CQUFMLEdBQTJCLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBM0I7QUFDQSxhQUFLLGlCQUFMLEdBQXlCLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBekI7QUFDRDs7OytCQUVRO0FBQ1AsWUFBSSxLQUFLLFVBQUwsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUI7QUFDRDtBQUNELGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUssWUFBTCxHQUFvQixLQUFwQjtBQUNBLGFBQUssYUFBTDtBQUNEOzs7OEJBRU87QUFDTixZQUFJLEtBQUssVUFBTCxLQUFvQixLQUF4QixFQUErQjtBQUM3QjtBQUNEO0FBQ0QsYUFBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsYUFBSyxhQUFMO0FBQ0Q7Ozs4QkFFTztBQUNOLFlBQUksQ0FBQyx3QkFBTCxFQUErQjtBQUM3QixlQUFLLE1BQUw7QUFDRDtBQUNGOzs7NkJBRU07QUFDTCxZQUFJLENBQUMsd0JBQUwsRUFBK0I7QUFDN0IsZUFBSyxLQUFMO0FBQ0Q7QUFDRjs7Ozs7O29CQUdZLG1CIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGNhblVzZUlzQ29tcG9zaW5nT25JbnB1dCA9IFwiSW5wdXRFdmVudFwiIGluIHdpbmRvdyAmJiBcImlzQ29tcG9zaW5nXCIgaW4gd2luZG93LklucHV0RXZlbnQucHJvdG90eXBlO1xuXG5jbGFzcyBDb21wb3NpdGlvbk9ic2VydmVyIHtcblxuICBjb25zdHJ1Y3RvcihjdHggPSB3aW5kb3cpIHtcblxuICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICB0aGlzLl9vYnNlcnZpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9pc0NvbXBvc2luZyA9IGZhbHNlO1xuXG4gICAgaWYoIWNhblVzZUlzQ29tcG9zaW5nT25JbnB1dCkge1xuICAgICAgdGhpcy5fc2V0SGFuZGxlcnMoKTtcbiAgICB9XG4gIH1cblxuICBpc0NvbXBvc2luZyhldnQpIHtcbiAgICByZXR1cm4gY2FuVXNlSXNDb21wb3NpbmdPbklucHV0ID8gZXZ0LmlzQ29tcG9zaW5nIDogdGhpcy5faXNDb21wb3Npbmc7XG4gIH1cblxuICBfb25Db21wb3NpdGlvblN0YXJ0KCkge1xuICAgIHRoaXMuX2lzQ29tcG9zaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIF9vbkNvbXBvc2l0aW9uRW5kKGV2dCkge1xuICAgIHRoaXMuX2lzQ29tcG9zaW5nID0gZmFsc2U7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJpbnB1dFwiLCB7XG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGV2dC50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBfYXR0YWNoRXZlbnRzKCkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuX2N0eDtcbiAgICBjdHguYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBvc2l0aW9uc3RhcnRcIiwgdGhpcy5fb25Db21wb3NpdGlvblN0YXJ0LCBmYWxzZSk7XG4gICAgY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJjb21wb3NpdGlvbmVuZFwiLCB0aGlzLl9vbkNvbXBvc2l0aW9uRW5kLCBmYWxzZSk7XG4gIH1cblxuICBfZGV0YWNoRXZlbnRzKCkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuX2N0eDtcbiAgICBjdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbXBvc2l0aW9uc3RhcnRcIiwgdGhpcy5fb25Db21wb3NpdGlvblN0YXJ0LCBmYWxzZSk7XG4gICAgY3R4LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb21wb3NpdGlvbkVuZFwiLCB0aGlzLl9vbkNvbXBvc2l0aW9uRW5kLCBmYWxzZSk7XG4gIH1cblxuICBfc2V0SGFuZGxlcnMoKSB7XG4gICAgdGhpcy5fb25Db21wb3NpdGlvblN0YXJ0ID0gdGhpcy5fb25Db21wb3NpdGlvblN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Db21wb3NpdGlvbkVuZCA9IHRoaXMuX29uQ29tcG9zaXRpb25FbmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIF9zdGFydCgpIHtcbiAgICBpZiAodGhpcy5fb2JzZXJ2aW5nID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29ic2VydmluZyA9IHRydWU7XG4gICAgdGhpcy5faXNDb21wb3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9hdHRhY2hFdmVudHMoKTtcbiAgfVxuXG4gIF9zdG9wKCkge1xuICAgIGlmICh0aGlzLl9vYnNlcnZpbmcgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29ic2VydmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2lzQ29tcG9zaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAoIWNhblVzZUlzQ29tcG9zaW5nT25JbnB1dCkge1xuICAgICAgdGhpcy5fc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICghY2FuVXNlSXNDb21wb3NpbmdPbklucHV0KSB7XG4gICAgICB0aGlzLl9zdG9wKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvc2l0aW9uT2JzZXJ2ZXI7XG4iXX0=