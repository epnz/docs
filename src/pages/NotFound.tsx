/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-30 21:43:50
 * @LastEditTime: 2026-01-03 02:39:21
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\pages\NotFound.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2026 by epnz.com, All Rights Reserved.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>{t('notFound.title')}</h2>
            <p>{t('notFound.description')}</p>
            <Link to="/" className="back-home-btn">
                {t('notFound.backToHome')}
            </Link>
        </div>
    );
};

export default NotFound;