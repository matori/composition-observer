# CompositionObserver.js

InputEvent.isComposing（[MDN](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/isComposing)）に対応していない環境でも入力の変換中かどうかをチェックするためのものです。  

判定可能なイベントは

- keydown
- keyup
- beforeinput
- input

です。
それぞれ、対応している環境の場合はネイティブの値を返します。

## 使い方

実際の例は `example` ディレクトリーにあります。

```js
const compositionObserver = new CompositionObserver.default();
compositionObserver.start();

function inputHandler(event) {
  if (compositionObserver.isComposing(event)) {
    return;
  }
  // do something
}

someInputElement.addEventListener("input", inputHandler, false);
```

- `isComposing(event)` : 変換中かどうか
- `start()` : 監視を開始します
- `stop()` : 監視を停止します


## ライセンス

MIT
