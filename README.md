# React Native macOS Starter Kit

A starter template for building native macOS desktop applications using React Native and Expo packages.

## Prerequisites

- Node.js 18+
- Xcode (with macOS development tools)
- CocoaPods (`sudo gem install cocoapods`)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install CocoaPods dependencies

```bash
cd macos
pod install
cd ..
```

### 3. Run the app in development mode

```bash
npm run dev
```

This will build and launch the macOS app with the Metro bundler running.

### 4. Build a release version

To build a release version, open the Xcode workspace and use Product > Archive:

```bash
open macos/reactNativeExpoMacosStarter.xcworkspace
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Build and run the app in development mode |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Jest |

## macOS-Compatible Packages

The following packages have been tested and work on macOS:

| Package | Min macOS | Description |
|---------|-----------|-------------|
| `expo-asset` | - | Asset management for images and fonts |
| `expo-constants` | - | System information constants |
| `expo-file-system` | - | Local file system access |
| `expo-font` | - | Custom font loading |
| `expo-keep-awake` | - | Prevent screen from sleeping |
| `expo-sqlite` | - | SQLite database |
| `react-native-reanimated` | 10.14 | Animations library |
| `@react-navigation/native` | - | Navigation framework |
| `@react-navigation/stack` | - | JS-based stack navigator |
| `react-native-svg` | 10.14 | SVG rendering |
| `react-native-webview` | 10.13 | Web content display |
| `lottie-react-native` | 10.15 | Lottie animations |
| `react-native-keychain` | 10.13 | Secure credential storage |
| `@react-native-community/netinfo` | 10.14 | Network information |
| `@react-native-async-storage/async-storage` | 10.15 | Key-value storage |
| `react-native-localize` | 10.15 | Localization utilities |
| `react-native-safe-area-context` | 10.15 | Safe area insets |
| `react-native-document-picker-macos` | - | File and directory picker |

> **Tip:** To check if a package supports macOS, look for `osx` or `macos` in its `.podspec` file under `s.platforms` or `s.osx.deployment_target`.

## Installing Libraries

### Expo packages

You can use `npx expo install` to install packages that are compatible with the Expo managed ecosystem. This ensures you get versions that are compatible with your current Expo SDK version:

```bash
npx expo install expo-package-name
```

Many Expo packages work on macOS thanks to shared Apple frameworks between iOS and macOS. Check the [Expo documentation](https://docs.expo.dev) to see available packages.

### JavaScript-only libraries

Pure JavaScript libraries (no native code) will work without any issues. Simply install them with npm:

```bash
npm install library-name
```

### Native libraries

Libraries with native code may or may not work on macOS. Most React Native libraries are developed primarily for iOS and Android, and may not include macOS support.

**Before installing a native library:**
1. Check the library's documentation or GitHub repository for macOS support
2. Look for `react-native-macos` in their supported platforms
3. Check if the library uses iOS APIs that are also available on macOS

**After installing a native library:**

You must reinstall CocoaPods and rebuild the app:

```bash
npm install library-name
cd macos
pod install
cd ..
npm run dev
```

> **Note:** If a native library doesn't support macOS, it may fail during pod install or cause runtime crashes. In some cases, iOS-targeted libraries may work on macOS due to shared Apple frameworks, but this is not guaranteed.

## Using Drizzle ORM with SQLite

For better database organization and type safety, you can pair `expo-sqlite` with [Drizzle ORM](https://orm.drizzle.team/docs/connect-expo-sqlite).

> **Note:** Make sure to check version compatibility between `drizzle-orm`, `expo-sqlite`, and your Expo SDK version. Breaking changes between versions may cause integration issues.

## Renaming the Project

To rename the project to your own app name, update the following files:

### 1. `app.json`
Update the `name` and `displayName` fields:
```json
{
  "name": "YourAppName",
  "displayName": "Your App Name"
}
```

### 2. `package.json`
Update the `name` field:
```json
{
  "name": "your-app-name"
}
```

### 3. `macos/Podfile`
Update the target name:
```ruby
target 'YourAppName-macOS' do
```

### 4. macOS native files
Rename the following folders and files in the `macos/` directory:
- `reactNativeExpoMacosStarter-macOS/` → `YourAppName-macOS/`
- `reactNativeExpoMacosStarter.xcodeproj/` → `YourAppName.xcodeproj/`
- `reactNativeExpoMacosStarter.xcworkspace/` → `YourAppName.xcworkspace/`
- `reactNativeExpoMacosStarter-macOS/reactNativeExpoMacosStarter.entitlements` → `YourAppName-macOS/YourAppName.entitlements`

### 5. `macos/YourAppName-macOS/Base.lproj/Main.storyboard`
Update the menu titles (app menu, About, Hide, Quit, Help) that reference the app name. Search and replace `reactNativeExpoMacosStarter` with your app name.

### 6. Xcode project settings
Open the `.xcodeproj` in Xcode and update:
- Product name
- Bundle identifier
- Scheme names

### 7. Reinstall dependencies
After renaming, reinstall CocoaPods:
```bash
cd macos
rm -rf Pods Podfile.lock
pod install
cd ..
```

## Project Structure

```
├── App.tsx              # Main application component
├── index.js             # Entry point
├── macos/               # macOS native project files
│   ├── Podfile          # CocoaPods dependencies
│   └── *.xcworkspace    # Xcode workspace
└── package.json         # Project configuration
```

## Troubleshooting

### Build fails with CocoaPods errors

```bash
cd macos
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Clean build

```bash
cd macos
rm -rf build
cd ..
```

## Learn More

- [React Native](https://reactnative.dev) - Learn more about React Native
- [React Native macOS](https://microsoft.github.io/react-native-windows/docs/rnm-getting-started) - React Native for macOS documentation
- [Expo](https://docs.expo.dev) - Expo documentation


Pull requests are welcome and appreciated! If you have improvements, bug fixes, or new features to add, feel free to open a PR.
