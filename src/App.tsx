/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-23 23:02:23
 * @LastEditTime: 2026-01-03 02:39:51
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\App.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/Header.tsx'


function App() {
    // 加载Markdown文件
    useEffect(() => {

    }, []);

    return (
        <>
            <Header />
            {/* 路由出口 - 这里会渲染当前匹配的路由组件 */}
            <Outlet />
        </>
    )
}

export default App