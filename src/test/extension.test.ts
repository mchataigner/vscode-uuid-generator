import * as assert from "assert";
import * as vscode from "vscode";
import { activate } from "../extension";

// UUID regex pattern: 8-4-4-4-12 hexadecimal characters
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(uuid: string): boolean {
  return UUID_REGEX.test(uuid);
}

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Extension should activate", async () => {
    const context = {
      subscriptions: [] as vscode.Disposable[],
    } as vscode.ExtensionContext;

    activate(context);
    assert.strictEqual(
      context.subscriptions.length,
      2,
      "Should register 2 commands"
    );
  });

  test("Generate UUID v4 command should be registered", async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(
      commands.includes("uuid-generator.generateV4"),
      "Command uuid-generator.generateV4 should be registered"
    );
  });

  test("Generate UUID v7 command should be registered", async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(
      commands.includes("uuid-generator.generateV7"),
      "Command uuid-generator.generateV7 should be registered"
    );
  });

  test("Generate UUID v4 should generate valid UUID v4", async () => {
    // Store original clipboard content
    const originalClipboard = await vscode.env.clipboard.readText();

    // Execute the command
    await vscode.commands.executeCommand("uuid-generator.generateV4");

    // Wait a bit for async operations
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Read from clipboard
    const clipboardContent = await vscode.env.clipboard.readText();

    // Verify it's a valid UUID v4 format
    assert.ok(isValidUUID(clipboardContent), "Generated UUID should be valid");
    assert.strictEqual(
      clipboardContent.length,
      36,
      "UUID should be 36 characters long"
    );
    assert.strictEqual(
      clipboardContent[14],
      "4",
      "UUID v4 should have version 4 in position 14"
    );

    // Restore original clipboard content
    await vscode.env.clipboard.writeText(originalClipboard);
  });

  test("Generate UUID v7 should generate valid UUID v7", async () => {
    // Store original clipboard content
    const originalClipboard = await vscode.env.clipboard.readText();

    // Execute the command
    await vscode.commands.executeCommand("uuid-generator.generateV7");

    // Wait a bit for async operations
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Read from clipboard
    const clipboardContent = await vscode.env.clipboard.readText();

    // Verify it's a valid UUID v7 format
    assert.ok(isValidUUID(clipboardContent), "Generated UUID should be valid");
    assert.strictEqual(
      clipboardContent.length,
      36,
      "UUID should be 36 characters long"
    );
    assert.strictEqual(
      clipboardContent[14],
      "7",
      "UUID v7 should have version 7 in position 14"
    );

    // Restore original clipboard content
    await vscode.env.clipboard.writeText(originalClipboard);
  });

  test("Generate UUID v4 should copy different UUIDs on each call", async () => {
    // Store original clipboard content
    const originalClipboard = await vscode.env.clipboard.readText();

    // Generate first UUID
    await vscode.commands.executeCommand("uuid-generator.generateV4");
    await new Promise((resolve) => setTimeout(resolve, 100));
    const uuid1 = await vscode.env.clipboard.readText();

    // Generate second UUID
    await vscode.commands.executeCommand("uuid-generator.generateV4");
    await new Promise((resolve) => setTimeout(resolve, 100));
    const uuid2 = await vscode.env.clipboard.readText();

    // They should be different
    assert.notStrictEqual(
      uuid1,
      uuid2,
      "Each call should generate a different UUID"
    );

    // Restore original clipboard content
    await vscode.env.clipboard.writeText(originalClipboard);
  });

  test("Generate UUID v7 should copy different UUIDs on each call", async () => {
    // Store original clipboard content
    const originalClipboard = await vscode.env.clipboard.readText();

    // Generate first UUID
    await vscode.commands.executeCommand("uuid-generator.generateV7");
    await new Promise((resolve) => setTimeout(resolve, 100));
    const uuid1 = await vscode.env.clipboard.readText();

    // Generate second UUID
    await vscode.commands.executeCommand("uuid-generator.generateV7");
    await new Promise((resolve) => setTimeout(resolve, 100));
    const uuid2 = await vscode.env.clipboard.readText();

    // They should be different
    assert.notStrictEqual(
      uuid1,
      uuid2,
      "Each call should generate a different UUID"
    );

    // Restore original clipboard content
    await vscode.env.clipboard.writeText(originalClipboard);
  });
});
