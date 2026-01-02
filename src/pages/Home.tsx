/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-30 21:42:29
 * @LastEditTime: 2026-01-03 01:25:22
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\pages\Home.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@components/Footer.tsx'

const Home: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <main>
                <div className="block">
                    <div className="home-header">
                        <h1>{t('home.title')}</h1>
                        <p>{t('home.subtitle')}</p>
                        <div className="button-group">
                            <div className="btn-gradient-default"><Link to={i18n.language === 'en' ? '/en/docs/start/quick-start' : '/docs/start/quick-start'}>{t('home.getStarted')}</Link></div>
                            <div className="btn-gradient-bright"><a href='https://github.com/epnz/docs' target="_blank" rel="noopener noreferrer"><i className="iconfont icon-github"></i> Github</a></div>
                        </div>
                        <div className="home-features">
                            <div className="feature-item">
                                <h3>{t('home.features.feature1.title')}</h3>
                                <p>{t('home.features.feature1.description')}</p>
                            </div>
                            <div className="feature-item">
                                <h3>{t('home.features.feature2.title')}</h3>
                                <p>{t('home.features.feature2.description')}</p>
                            </div>
                            <div className="feature-item">
                                <h3>{t('home.features.feature3.title')}</h3>
                                <p>{t('home.features.feature3.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;