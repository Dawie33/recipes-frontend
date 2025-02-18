import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin, react: pluginReact },
    settings: {
      react: {
        version: 'detect', // ou remplace "detect" par la version de React, ex. "18.2.0"
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
