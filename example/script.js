(function () {

  function convertToNumberOnly(text) {
    text = text.replace(/[０-９]/g, function (str) {
      return String.fromCharCode(str.charCodeAt(0) - 0xFEE0);
    });
    return text.replace(/[^0-9]/g, "");
  }

  function convertValue(event) {
    var input = event.target;
    input.value = convertToNumberOnly(input.value);
  }

  //------------//

  function onIputHandler1(event) {
    convertValue(event);
  }

  document.getElementById("input1").addEventListener("input", onIputHandler1, false);

  //------------//

  var compositionObserver = new window.CompositionObserver.default();
  compositionObserver.start();

  function onInputHandler2(event) {
    if (compositionObserver.isComposing(event)) {
      return;
    }
    convertValue(event);
  }

  function onCompositionend(event) {
    convertValue(event);
  }

  document.getElementById("input2").addEventListener("input", onInputHandler2, false);
  document.getElementById("input2").addEventListener("compositionend", onCompositionend, false);
})();
