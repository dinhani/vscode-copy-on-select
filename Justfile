# List available tasks
default:
    @just --list --unsorted

# Run extension in VSCode
[group('dev')]
run: clean
    @echo "Running extension in VSCode..."
    npm run compile
    code --extensionDevelopmentPath={{justfile_directory()}}

# Remove generated artifacts
[group('dev')]
clean:
    @echo "Cleaning..."
    rm -rf out .vscode-test *.vsix

# Lint code
[group('quality')]
lint:
    @echo "Linting code..."
    npx tsc -p . --noEmit

# Package extension as .vsix
[group('release')]
package: clean
    @echo "Packaging extension..."
    npm run compile
    npx vsce package

# Publish extension to VSCode Marketplace
[group('release')]
publish-vscode: package
    @echo "Publishing extension to VSCode Marketplace..."
    npx vsce publish

# Publish extension to Open VSX
[group('release')]
publish-openvsx: package
    @echo "Publishing extension to Open VSX..."
    npx ovsx publish *.vsix

# Install extension in VSCode
[group('release')]
install: package
    @echo "Installing extension..."
    code --install-extension *.vsix
