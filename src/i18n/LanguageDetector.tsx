/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-30 22:12:50
 * @LastEditTime: 2026-01-05 18:25:50
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\i18n\LanguageDetector.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2026 by epnz.com, All Rights Reserved.
 */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from './config';

interface LanguageDetectorProps {
    children: React.ReactNode;
}

export const LanguageDetector: React.FC<LanguageDetectorProps> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // 从路由中提取语言代码
        const pathParts = location.pathname.split('/');
        const detectedLanguage = pathParts[1] === 'en' ? 'en' : 'zh';
        
        // 如果检测到的语言与当前语言不同，则切换语言
        if (detectedLanguage !== i18n.language) {
            i18n.changeLanguage(detectedLanguage);
        }

        // 更新HTML的lang属性
        document.documentElement.lang = detectedLanguage === 'en' ? 'en-US' : 'zh-CN';
    }, [location.pathname]);

    return <>{children}</>;
};