/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-30 21:41:18
 * @LastEditTime: 2026-01-03 02:38:47
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\router\config.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2026 by epnz.com, All Rights Reserved.
 */
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Docs from '../pages/Docs'
import NotFound from '../pages/NotFound'
import { LanguageDetector } from '../i18n/LanguageDetector'

// 共享的路由配置
const sharedRoutes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: 'docs',
        element: <Docs />,
        children: [
            {
                path: ':docPath/*', // 添加动态参数支持
                element: <Docs />,
            }
        ]
    }
];

export const router = createBrowserRouter([
    // 默认中文路由
    {
        path: '/',
        element: <LanguageDetector><App /></LanguageDetector>,
        children: sharedRoutes,
    },
    // 英文路由
    {
        path: '/en',
        element: <LanguageDetector><App /></LanguageDetector>,
        children: sharedRoutes,
    },
    // 404页面
    {
        path: '*',
        element: <NotFound />,
    },
]);