import React from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import reactJsx from 'vite-react-jsx'

import AutoImportResolver from './resolver'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '@/': `${resolve(__dirname)}/`,
    },
  },
  plugins: [
    React(),
    reactJsx(),
    WindiCSS(),
    AutoImport({
      // output dir + name of the d.ts file
      dts: './src/auto-imports.d.ts',
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      resolvers: [
        // Forma components auto import resolver
        AutoImportResolver({
          module: '@contentful/forma-36-react-components',
          componentPrefix: 'forma', // i.e. you use the components as <FormaComponent />, feel free to use your preferred prefix
          enabledComponents: [], // which components you actually want to enable, useful if you want to explicitly include/exclude something
        }),
      ],
      imports: [
        'react',
        {
          '@/resolver/utils': ['pascalize', 'camelToKebab', 'camelize', 'capitalize'],
        },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-use', '@contentful/app-sdk'],
  },
})
