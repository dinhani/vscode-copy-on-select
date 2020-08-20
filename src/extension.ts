'use strict';

import * as vscode from 'vscode';
const debounce = require('debounce');

// =============================================================================
// EXTENSION INTERFACE
// =============================================================================
export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(debounce(async (event: vscode.TextEditorSelectionChangeEvent) => {
        if (shouldCopy(event)) {
            let text = generateTextToCopy(event);
            await copyToClipboard(text);
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
    // do not copy when event type cannot be determined
    if (typeof event.kind === "undefined" || event.kind === null) {
        return false;
    }

    // do not copy when text was selected by command
    if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
        return false;
    }

    // ignore clicks
    let sel0 = event.selections[0];
    if (sel0.anchor.line === sel0.active.line && sel0.anchor.character === sel0.active.character) {
        return false;
    }

    // check if should perform keyboard copy
    let copyOnKeyboard = config.get("copyOnKeyboardSelection", false);
    if (event.kind === vscode.TextEditorSelectionChangeKind.Keyboard && copyOnKeyboard) {
        return true;
    }

    // check if should perform mouse copy
    let copyOnMouse = config.get("copyOnMouseSelection", true);
    if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse && copyOnMouse) {
        return true;
    }

    // do copy in any other not foreseen case
    return false;
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

async function copyToClipboard(text: string) {
    // do not copy empty text
    if (text.trim() === '') {
        return;
    }

    // copy
    try {
        await vscode.env.clipboard.writeText(text);
    } catch (error) {
        vscode.window.showErrorMessage('copy-on-select failed. Error: ' + JSON.stringify(error));
    }
}
