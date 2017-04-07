'use strict';

import * as vscode from 'vscode';
const clipboardy = require('clipboardy');
const debounce = require('debounce');

// =============================================================================
// EXTENSION INTERFACE
// =============================================================================
export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(debounce(event => {
        if (shouldCopy(event)) {
            let text = generateTextToCopy(event);
            copyToClipboard(text);
        }
    }, 300))
}

export function deactivate() {
}

// =============================================================================
// FUNCIONS
// =============================================================================
let config = vscode.workspace.getConfiguration("copyOnSelect");

function shouldCopy(event: vscode.TextEditorSelectionChangeEvent): boolean {

    // do not copy when text was selected by command
    if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
        return false;
    }

    // check keyboard copies
    let copyOnKeyboard = config.get("copyOnKeyboardSelection", false);
    if (event.kind === vscode.TextEditorSelectionChangeKind.Keyboard && !copyOnKeyboard) {
        return false;
    }

    // check mouse copies
    let copyOnMouse = config.get("copyOnMouseSelection", true);
    if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse && !copyOnMouse) {
        return false;
    }

    // do not copy
    return true;
}

function generateTextToCopy(event: vscode.TextEditorSelectionChangeEvent): string {
    // generate text from selections
    let eol = event.textEditor.document.eol == vscode.EndOfLine.LF ? '\n' : '\r\n';
    var text = event.selections.map(selection => event.textEditor.document.getText(selection)).join(eol);

    // do trimming if necessary
    if (config.get("trimStart", false)) {
        text = text.replace(/^\s+/, '');
    }
    if (config.get("trimEnd", true)) {
        text = text.replace(/\s+$/, '');
    }

    return text;
}

function copyToClipboard(text: string) {
    // do not copy empty text
    if (text.trim() === '') {
        return;
    }

    // copy
    clipboardy.writeSync(text);
}