module.exports = {
    extends: ["../../packages/eslint-config/server.json"],
    parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
};
