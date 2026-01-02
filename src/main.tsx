/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-23 23:02:23
 * @LastEditTime: 2025-12-30 22:26:55
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\main.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { router } from './router/config'
import './i18n/config'; // 引入i18n配置
import './assets/style/app.scss'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);