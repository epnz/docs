/*
 * @Author: 故乡情 s@epnz.com
 * @Date: 2025-12-12 02:20:10
 * @LastEditTime: 2025-12-12 02:20:19
 * @LastEditors: 故乡情
 * @FilePath: \tool\src\i18n\config.ts
 * @Description: MinMing electrician tool Web
 * Copyright (c) 2025 by 鸣鸣上门-MinMing, All Rights Reserved.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import zhTranslation from './locales/zh.json';
import enTranslation from './locales/en.json';

// 配置翻译资源
const resources = {
    zh: {
        translation: zhTranslation
    },
    en: {
        translation: enTranslation
    }
};

// 初始化i18n
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'zh', // 默认语言
        fallbackLng: 'zh', // 回退语言
        interpolation: {
            escapeValue: false // React已经处理了XSS
        }
    });

export default i18n;