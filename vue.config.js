const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeModulesPath: ['./node_modules'],
      externals: ['better-sqlite3']
    }
  },
  configureWebpack: config => {
    config.externals = {
      'better-sqlite3': 'commonjs better-sqlite3'
    };
  },
})
