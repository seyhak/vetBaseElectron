module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: [
      "./resources/credentials.json",
      "./resources/credentials.public.json",
    ],
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {},
    // },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"],
    },
    // {
    //   name: "@electron-forge/maker-deb",
    //   config: {},
    // },
    // {
    //   name: "@electron-forge/maker-rpm",
    //   config: {},
    // },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
}
