module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@/assets": "./assets",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@ui": "./src/ui",
            "@storage": "./src/storage",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@routes": "./src/routes",
            "@config": "./src/config",
            "@constants": "./src/constants",
            "@utils": "./src/utils",
            "@theme": "./src/theme",
            "@data": "./src/data",
            "@domain": "./src/domain",
            "@stores": "./src/stores",
          },
        },
      ],
      "react-native-worklets/plugin",
      "@realm/babel-plugin",
    ],
  };
};
