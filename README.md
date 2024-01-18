# Copy On Select

This extension automatically copies the selected text in the editor when you select it, without having to hit CTRL+C.

[![Installs](https://img.shields.io/visual-studio-marketplace/i/dinhani.copy-on-select?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=dinhani.copy-on-select&ssr=false)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/dinhani.copy-on-select?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=dinhani.copy-on-select&ssr=false#review-details)
[![Version](https://img.shields.io/visual-studio-marketplace/v/dinhani.copy-on-select?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=dinhani.copy-on-select&ssr=false#version-history)

## Example

The selected text is automatically copied when selected with the mouse first, then with the keyboard.

![Copy On Select example](https://raw.githubusercontent.com/dinhani/vscode-copy-on-select/master/images/vscode-copy-on-select.gif)

## Configuration

```javascript
// Should copy the selected text when it was selected using the keyboard?
"copyOnSelect.copyOnKeyboardSelection": false

// Should copy the selected text when it was selected using the mouse?
"copyOnSelect.copyOnMouseSelection": true

// Should trim the start of the copied text?
"copyOnSelect.trimStart": false

// Should trim the end of the copied text?
"copyOnSelect.trimEnd": true
```

## Feedback

Request features and report bugs using [GitHub](https://github.com/dinhani/vscode-copy-on-select).