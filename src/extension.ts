'use strict';

import * as vscode from 'vscode';
const clipboardy = require('clipboardy');

// ============================================================================
// EXTENSION INTERFACE
// ============================================================================
export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(selection => {
        let currentSelection = selection.selections[0];
        let text = selection.textEditor.document.getText(currentSelection);
        clipboardy.writeSync(text);
    })
}

export function deactivate() {
}