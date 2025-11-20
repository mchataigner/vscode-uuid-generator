// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { v4, v7 } from 'uuid';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('UUID Generator extension is now active!');

	// Register command to generate UUID v4
	const generateV4Disposable = vscode.commands.registerCommand('uuid-generator.generateV4', async () => {
		const uuid = v4();
		await vscode.env.clipboard.writeText(uuid);
		vscode.window.showInformationMessage(`UUID v4 copied to clipboard: ${uuid}`);
	});

	// Register command to generate UUID v7
	const generateV7Disposable = vscode.commands.registerCommand('uuid-generator.generateV7', async () => {
		const uuid = v7();
		await vscode.env.clipboard.writeText(uuid);
		vscode.window.showInformationMessage(`UUID v7 copied to clipboard: ${uuid}`);
	});

	context.subscriptions.push(generateV4Disposable, generateV7Disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
