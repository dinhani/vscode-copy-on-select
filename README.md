# Copy On Select

This extension automatically copies the selected text in the editor when you select it, without having to hit CTRL+C.

# Example

The selected text is automatically copied when selected with the mouse first, then with the keyboard.

![Copy On Select example](https://raw.githubusercontent.com/dinhani/vscode-copy-on-select/master/images/vscode-copy-on-select.gif)

# Configuration

```javascript
// Should copy the selected text when it was selected using the mouse?
"copyOnSelect.copyOnMouseSelection": true

// Should copy the selected text when it was selected using the keyboard?
"copyOnSelect.copyOnKeyboardSelection": true

// Should trim the start of the copied text?
"copyOnSelect.trimStart": true

// Should trim the end of the copied text?
"copyOnSelect.trimEnd": false
```

# Feedback

Request features and report bugs using [GitHub](https://github.com/dinhani/vscode-copy-on-select).