const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, "assets", "logo64x64.png"),
    extraResource: [
      path.resolve(__dirname, "assets", "logo64x64.png"),
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "chaotic_kumo_client",
        setupIcon: path.resolve(__dirname, "assets", "logo64x64.png")
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: path.resolve(__dirname, "assets", "logo64x64.png")
        }
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          icon: path.resolve(__dirname, "assets", "logo64x64.png")
        }
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "jmullercuber",
          name: "chaotic-kumo",
        },
        prerelease: true,
      },
    },
  ],
};
