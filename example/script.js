(function () {

  function convertNumberOnly(text) {
    text = text.replace(/[０-９]/g, function (str) {
      return String.fromCharCode(str.charCodeAt(0) - 0xFEE0);
    });
    return text.replace(/[^0-9]/g, "");
  }

  function convertValue(evt) {
    var input = evt.target;
    input.value = convertNumberOnly(input.value);
  }

  //------------//

  function handler1(evt) {
    convertValue(evt);
  }

  document.getElementById("input1").addEventListener("input", handler1, false);

  //------------//

  var compositionObserver = new window.CompositionObserver();
  compositionObserver.start();

  function handler2(evt) {
    if (compositionObserver.isComposing(evt)) {
      return;
    }
    convertValue(evt);
  }

  document.getElementById("input2").addEventListener("input", handler2, false);
})();
