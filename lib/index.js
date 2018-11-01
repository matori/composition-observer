(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.CompositionObserver = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var canUseIsComposingOnInput = "InputEvent" in window && window.InputEvent.prototype.hasOwnProperty('isComposing');
  var canUseIsComposingOnKeyboard = window.KeyboardEvent.prototype.hasOwnProperty("isComposing");

  var CompositionObserver =
  /*#__PURE__*/
  function () {
    function CompositionObserver() {
      var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

      _classCallCheck(this, CompositionObserver);

      this._ctx = ctx;
      this._enabled = !canUseIsComposingOnInput || !canUseIsComposingOnKeyboard;
      this._observing = false;
      this._isComposing = false;

      if (this._enabled) {
        this._setHandlers();
      }
    }

    _createClass(CompositionObserver, [{
      key: "_onCompositionStart",
      value: function _onCompositionStart() {
        this._isComposing = true;
      }
    }, {
      key: "_onCompositionEnd",
      value: function _onCompositionEnd() {
        this._isComposing = false;
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
        ctx.removeEventListener("compositionend", this._onCompositionEnd, false);
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
        if (this._observing) {
          return;
        }

        this._observing = true;
        this._isComposing = false;

        this._attachEvents();
      }
    }, {
      key: "_stop",
      value: function _stop() {
        if (!this._observing) {
          return;
        }

        this._observing = false;
        this._isComposing = false;

        this._detachEvents();
      }
    }, {
      key: "start",
      value: function start() {
        if (this._enabled) {
          this._start();
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this._enabled) {
          this._stop();
        }
      }
    }, {
      key: "isComposing",
      value: function isComposing(event) {
        var eventType = event.type;

        if (eventType === "keydown" || eventType === "keyup") {
          return canUseIsComposingOnKeyboard ? event.isComposing : this._isComposing;
        }

        if (eventType === "input" || eventType === "beforeinput") {
          return canUseIsComposingOnInput ? event.isComposing : this._isComposing;
        }
      }
    }]);

    return CompositionObserver;
  }();

  var _default = CompositionObserver;
  _exports.default = _default;
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21wb3NpdGlvbk9ic2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sd0JBQXdCLEdBQUcsZ0JBQWdCLE1BQWhCLElBQTBCLE1BQU0sQ0FBQyxVQUFQLENBQWtCLFNBQWxCLENBQTRCLGNBQTVCLENBQTJDLGFBQTNDLENBQTNEO0FBQ0EsTUFBTSwyQkFBMkIsR0FBRyxNQUFNLENBQUMsYUFBUCxDQUFxQixTQUFyQixDQUErQixjQUEvQixDQUE4QyxhQUE5QyxDQUFwQzs7TUFFTSxtQjs7O0FBRUosbUNBQTBCO0FBQUEsVUFBZCxHQUFjLHVFQUFSLE1BQVE7O0FBQUE7O0FBQ3hCLFdBQUssSUFBTCxHQUFZLEdBQVo7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsQ0FBQyx3QkFBRCxJQUE2QixDQUFDLDJCQUE5QztBQUNBLFdBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUssWUFBTCxHQUFvQixLQUFwQjs7QUFFQSxVQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNqQixhQUFLLFlBQUw7QUFDRDtBQUNGOzs7OzRDQUVxQjtBQUNwQixhQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDs7OzBDQUVtQjtBQUNsQixhQUFLLFlBQUwsR0FBb0IsS0FBcEI7QUFDRDs7O3NDQUVlO0FBQ2QsWUFBTSxHQUFHLEdBQUcsS0FBSyxJQUFqQjtBQUNBLFFBQUEsR0FBRyxDQUFDLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxLQUFLLG1CQUE5QyxFQUFtRSxLQUFuRTtBQUNBLFFBQUEsR0FBRyxDQUFDLGdCQUFKLENBQXFCLGdCQUFyQixFQUF1QyxLQUFLLGlCQUE1QyxFQUErRCxLQUEvRDtBQUNEOzs7c0NBRWU7QUFDZCxZQUFNLEdBQUcsR0FBRyxLQUFLLElBQWpCO0FBQ0EsUUFBQSxHQUFHLENBQUMsbUJBQUosQ0FBd0Isa0JBQXhCLEVBQTRDLEtBQUssbUJBQWpELEVBQXNFLEtBQXRFO0FBQ0EsUUFBQSxHQUFHLENBQUMsbUJBQUosQ0FBd0IsZ0JBQXhCLEVBQTBDLEtBQUssaUJBQS9DLEVBQWtFLEtBQWxFO0FBQ0Q7OztxQ0FFYztBQUNiLGFBQUssbUJBQUwsR0FBMkIsS0FBSyxtQkFBTCxDQUF5QixJQUF6QixDQUE4QixJQUE5QixDQUEzQjtBQUNBLGFBQUssaUJBQUwsR0FBeUIsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUF6QjtBQUNEOzs7K0JBRVE7QUFDUCxZQUFJLEtBQUssVUFBVCxFQUFxQjtBQUNuQjtBQUNEOztBQUNELGFBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUssWUFBTCxHQUFvQixLQUFwQjs7QUFDQSxhQUFLLGFBQUw7QUFDRDs7OzhCQUVPO0FBQ04sWUFBSSxDQUFDLEtBQUssVUFBVixFQUFzQjtBQUNwQjtBQUNEOztBQUNELGFBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLGFBQUssWUFBTCxHQUFvQixLQUFwQjs7QUFDQSxhQUFLLGFBQUw7QUFDRDs7OzhCQUVPO0FBQ04sWUFBSSxLQUFLLFFBQVQsRUFBbUI7QUFDakIsZUFBSyxNQUFMO0FBQ0Q7QUFDRjs7OzZCQUVNO0FBQ0wsWUFBSSxLQUFLLFFBQVQsRUFBbUI7QUFDakIsZUFBSyxLQUFMO0FBQ0Q7QUFDRjs7O2tDQUVXLEssRUFBTztBQUNqQixZQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBeEI7O0FBQ0EsWUFBSSxTQUFTLEtBQUssU0FBZCxJQUEyQixTQUFTLEtBQUssT0FBN0MsRUFBc0Q7QUFDcEQsaUJBQU8sMkJBQTJCLEdBQUcsS0FBSyxDQUFDLFdBQVQsR0FBdUIsS0FBSyxZQUE5RDtBQUNEOztBQUNELFlBQUksU0FBUyxLQUFLLE9BQWQsSUFBeUIsU0FBUyxLQUFLLGFBQTNDLEVBQTBEO0FBQ3hELGlCQUFPLHdCQUF3QixHQUFHLEtBQUssQ0FBQyxXQUFULEdBQXVCLEtBQUssWUFBM0Q7QUFDRDtBQUNGOzs7Ozs7aUJBSVksbUIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgY2FuVXNlSXNDb21wb3NpbmdPbklucHV0ID0gXCJJbnB1dEV2ZW50XCIgaW4gd2luZG93ICYmIHdpbmRvdy5JbnB1dEV2ZW50LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnaXNDb21wb3NpbmcnKTtcbmNvbnN0IGNhblVzZUlzQ29tcG9zaW5nT25LZXlib2FyZCA9IHdpbmRvdy5LZXlib2FyZEV2ZW50LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShcImlzQ29tcG9zaW5nXCIpO1xuXG5jbGFzcyBDb21wb3NpdGlvbk9ic2VydmVyIHtcblxuICBjb25zdHJ1Y3RvcihjdHggPSB3aW5kb3cpIHtcbiAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgdGhpcy5fZW5hYmxlZCA9ICFjYW5Vc2VJc0NvbXBvc2luZ09uSW5wdXQgfHwgIWNhblVzZUlzQ29tcG9zaW5nT25LZXlib2FyZDtcbiAgICB0aGlzLl9vYnNlcnZpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9pc0NvbXBvc2luZyA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NldEhhbmRsZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgX29uQ29tcG9zaXRpb25TdGFydCgpIHtcbiAgICB0aGlzLl9pc0NvbXBvc2luZyA9IHRydWU7XG4gIH1cblxuICBfb25Db21wb3NpdGlvbkVuZCgpIHtcbiAgICB0aGlzLl9pc0NvbXBvc2luZyA9IGZhbHNlO1xuICB9XG5cbiAgX2F0dGFjaEV2ZW50cygpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLl9jdHg7XG4gICAgY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJjb21wb3NpdGlvbnN0YXJ0XCIsIHRoaXMuX29uQ29tcG9zaXRpb25TdGFydCwgZmFsc2UpO1xuICAgIGN0eC5hZGRFdmVudExpc3RlbmVyKFwiY29tcG9zaXRpb25lbmRcIiwgdGhpcy5fb25Db21wb3NpdGlvbkVuZCwgZmFsc2UpO1xuICB9XG5cbiAgX2RldGFjaEV2ZW50cygpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLl9jdHg7XG4gICAgY3R4LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb21wb3NpdGlvbnN0YXJ0XCIsIHRoaXMuX29uQ29tcG9zaXRpb25TdGFydCwgZmFsc2UpO1xuICAgIGN0eC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29tcG9zaXRpb25lbmRcIiwgdGhpcy5fb25Db21wb3NpdGlvbkVuZCwgZmFsc2UpO1xuICB9XG5cbiAgX3NldEhhbmRsZXJzKCkge1xuICAgIHRoaXMuX29uQ29tcG9zaXRpb25TdGFydCA9IHRoaXMuX29uQ29tcG9zaXRpb25TdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uQ29tcG9zaXRpb25FbmQgPSB0aGlzLl9vbkNvbXBvc2l0aW9uRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBfc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuX29ic2VydmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vYnNlcnZpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2lzQ29tcG9zaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fYXR0YWNoRXZlbnRzKCk7XG4gIH1cblxuICBfc3RvcCgpIHtcbiAgICBpZiAoIXRoaXMuX29ic2VydmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vYnNlcnZpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9pc0NvbXBvc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuX2RldGFjaEV2ZW50cygpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuX2VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5fZW5hYmxlZCkge1xuICAgICAgdGhpcy5fc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzQ29tcG9zaW5nKGV2ZW50KSB7XG4gICAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcbiAgICBpZiAoZXZlbnRUeXBlID09PSBcImtleWRvd25cIiB8fCBldmVudFR5cGUgPT09IFwia2V5dXBcIikge1xuICAgICAgcmV0dXJuIGNhblVzZUlzQ29tcG9zaW5nT25LZXlib2FyZCA/IGV2ZW50LmlzQ29tcG9zaW5nIDogdGhpcy5faXNDb21wb3Npbmc7XG4gICAgfVxuICAgIGlmIChldmVudFR5cGUgPT09IFwiaW5wdXRcIiB8fCBldmVudFR5cGUgPT09IFwiYmVmb3JlaW5wdXRcIikge1xuICAgICAgcmV0dXJuIGNhblVzZUlzQ29tcG9zaW5nT25JbnB1dCA/IGV2ZW50LmlzQ29tcG9zaW5nIDogdGhpcy5faXNDb21wb3Npbmc7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRpb25PYnNlcnZlcjtcbiJdfQ==