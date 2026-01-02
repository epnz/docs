/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-23 23:02:23
 * @LastEditTime: 2025-12-30 02:24:41
 * @LastEditors: 故乡情
 * @FilePath: \docs\vite.config.ts
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
    }
  },
  // 添加对 .md 文件的支持
  assetsInclude: ['**/*.md']
})
