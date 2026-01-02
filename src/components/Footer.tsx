/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-26 01:28:31
 * @LastEditTime: 2025-12-28 23:36:15
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\components\Footer.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import { useTranslation } from 'react-i18next';
import packageJson from '../../package.json'; // 使用 ES 模块导入语法
export default function Footer() {
    const { t } = useTranslation();
    
    return (
        <footer className="p-3">
            <div className="block tc">
                <div className='copyright'>{t('footer.copyright', { version: packageJson.version })}</div>
                <div className='beian'><a href="https://beian.miit.gov.cn/" target="_blank">{t('footer.beian')}</a></div>
            </div>
        </footer>
    )
}