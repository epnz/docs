/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-26 01:09:18
 * @LastEditTime: 2026-01-04 16:41:17
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\components\Header.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { DocSearch } from '@docsearch/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import '@docsearch/css/dist/style.css'
import myLogo from '@assets/epnz/epnz-app-logo.svg'

export default function Header() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * 处理语言切换的函数
     * @param language - 要切换到的目标语言
     */
    const handleLanguageChange = (language: string) => {
        // 获取当前路径，去掉语言前缀
        const currentPath = location.pathname;
        const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, '');

        // 构建新的路径
        let newPath;
        if (language === 'en') {
            newPath = `/en${pathWithoutLang}`;
        } else {
            newPath = pathWithoutLang || '/';
        }

        // 切换语言并更新URL
        i18n.changeLanguage(language);
        navigate(newPath);

        // 关闭菜单
        setIsMenuOpen(false);
    };

    /**
     * 跳转到首页的函数
     * 通过修改window.location.href来实现页面跳转
     * 使用绝对路径'/'指向网站根目录
     */
    const toHome = () => {
        // 根据当前语言跳转到对应的首页
        const currentLang = i18n.language;
        const homePath = currentLang === 'en' ? '/en' : '/';
        navigate(homePath);
    }

    return (
        <header>
            <div className="header-block px-3 py-2">
                <div className="grid cursor-pointer user-select-none" onClick={() => toHome()}>
                    <div className="logo"><img src={myLogo} alt={t('header.epnzDocs')} /></div>
                    <div className="title">{t('header.epnzDocs')}</div>
                </div>
                <div className="grid">
                </div>
                <div className="grid">
                    <div className='secrch-box'>
                        <DocSearch
                            appId="PDXW62TF1M"
                            indices={["epnz"]}
                            apiKey="2c3390a9f3fa4d5babde145901507987"
                            askAi='8xmRzhmNm2JD'
                        />
                    </div>
                    <div className="nav-item">
                        <Link to={i18n.language === 'en' ? '/en/docs/start/quick-start' : '/docs/start/quick-start'} className="nav-link">{t('header.docs')}</Link>
                    </div>
                    <div
                        className="icon-item"
                        ref={dropdownRef}
                        onMouseOver={() => setIsMenuOpen(true)}
                        onMouseOut={() => setIsMenuOpen(false)}
                    >
                        <div className="language-icon cursor-pointer">
                            <i className={`iconfont ${i18n.language === 'zh' ? 'icon-chinese' : 'icon-english'}`}></i>
                        </div>

                        {/* 语言下拉菜单 */}
                        {isMenuOpen && (
                            <div className="language-dropdown absolute right-0 bg-white rounded shadow-lg z-10"
                                onMouseEnter={() => setIsMenuOpen(true)}
                                onMouseLeave={() => setIsMenuOpen(false)}
                            >
                                <div
                                    className={`language-item px-4 py-2 cursor-pointer ${i18n.language === 'zh' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('zh')}
                                >
                                    {t('language.zh')}
                                </div>
                                <div
                                    className={`language-item px-4 py-2 cursor-pointer ${i18n.language === 'en' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('en')}
                                >
                                    {t('language.en')}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="icon-item">
                        <a href="https://github.com/epnz/docs" className='icon-link' target="_blank">
                            <i className="iconfont icon-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}