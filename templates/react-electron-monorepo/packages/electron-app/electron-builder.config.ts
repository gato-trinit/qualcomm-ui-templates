import type {Configuration} from "electron-builder"

const config: Configuration = {
  appId: "com.project.electron-app",
  artifactName: "${productName}-${version}-${os}-${arch}.${ext}",

  compression: "store",

  directories: {
    buildResources: "libs",
    output: "out",
  },
  extraMetadata: {
    main: "dist/main.cjs",
  },
  files: [
    "dist/**/*",
    // Exclude everything else since it's bundled
    "!node_modules/**/*",
    "!src/**/*",
    "!scripts/**/*",
    "!out/**/*",
    "!tsconfig*.json",
    "!test*",
  ],

  linux: {
    category: "Utility",
    executableName: "electron-app",
  },

  productName: "electron-app",

  publish: null,
}

export default config
