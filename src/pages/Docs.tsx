/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-30 22:41:17
 * @LastEditTime: 2026-01-06 01:43:03
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\pages\Docs.tsx
 * @Description: EPNZ Docs
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMarkdownFile } from '../utils/Markdown'
import type { MarkdownFile } from '../utils/Markdown'

import Footer from '@components/Footer.tsx'

interface MenuItem {
    name: string;
    path?: string;
    children?: MenuItem[];
}

const Docs: React.FC = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null);
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
    const currentLang = i18n.language;

    // 定义文档菜单结构
    const docsMenu: MenuItem[] = [
        {
            name: t('docs.start'),
            children: [
                { name: t('docs.quickStart'), path: 'start/quick-start' },
            ]
        },
        { name: t('docs.changelog'), path: 'EPNZ' },
    ];

    // 从URL路径解析文档路径
    const getCurrentDocPath = () => {
        const pathname = location.pathname;
        // 提取/docs/之后的部分
        const docsIndex = pathname.indexOf('/docs/');
        if (docsIndex === -1) return 'EPNZ';

        const docPath = pathname.slice(docsIndex + 6); // 6是'/docs/'.length
        return docPath || 'EPNZ';
    };

    // 加载对应语言的Markdown文件
    useEffect(() => {
        const currentDocPath = getCurrentDocPath();
        loadChangeMd(currentDocPath);
    }, [currentLang, location.pathname]);

    // 基于当前URL路径设置菜单展开状态
    useEffect(() => {
        const currentDocPath = getCurrentDocPath();
        const newExpanded = findAndExpandParentMenus(currentDocPath);
        if (JSON.stringify(Array.from(newExpanded)) !== JSON.stringify(Array.from(expandedMenus))) {
            setExpandedMenus(newExpanded);
        }
    }, [location.pathname]);

    // 查找并展开包含当前文档的所有父菜单
    const findAndExpandParentMenus = (docPath: string): Set<string> => {
        const expanded = new Set<string>();

        const findParent = (items: MenuItem[], path: string) => {
            for (const item of items) {
                if (item.children) {
                    const hasMatchingChild = item.children.some(child =>
                        child.path && path.startsWith(child.path)
                    );

                    if (hasMatchingChild) {
                        expanded.add(item.name);
                        findParent(item.children, path);
                    }
                }
            }
        };

        findParent(docsMenu, docPath);
        return expanded;
    };

    // 修复active标记判断逻辑
    const isMenuItemActive = (item: MenuItem) => {
        if (!item.path) return false;

        const currentDocPath = getCurrentDocPath();
        // 精确匹配路径，确保只有当前选中的菜单项才会被标记为active
        return currentDocPath === item.path;
    };

    const loadChangeMd = async (fileName: string) => {
        const file = await getMarkdownFile(`/${currentLang}/${fileName}`);
        setSelectedFile(file || null);
        console.log(selectedFile);
    };

    // 处理菜单项点击
    const handleMenuItemClick = (path: string | undefined) => {
        if (path) {
            const basePath = currentLang === 'en' ? '/en/docs' : '/docs';
            navigate(`${basePath}/${path}`);
        }
    };

    // 切换菜单展开状态
    const toggleMenuExpand = (menuName: string) => {
        const newExpanded = new Set(expandedMenus);
        if (newExpanded.has(menuName)) {
            newExpanded.delete(menuName);
        } else {
            newExpanded.add(menuName);
        }
        setExpandedMenus(newExpanded);
    };

    // 递归渲染菜单
    const renderMenu = (items: MenuItem[]) => {
        return items.map((item) => {
            const isActive = isMenuItemActive(item); // 使用修复后的active判断

            if (item.children) {
                const isExpanded = expandedMenus.has(item.name);
                const hasActiveChild = item.children.some(isMenuItemActive);

                return (
                    <li key={item.name} className="docs-menu-item">
                        <div
                            className={`menu-item-header ${hasActiveChild ? 'active' : ''}`}
                            onClick={() => toggleMenuExpand(item.name)}
                        >
                            {item.name}
                            <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                                <i className={`iconfont ${isExpanded ? 'icon-down' : 'icon-right'}`}></i>
                            </span>
                        </div>
                        {isExpanded && (
                            <ul className="docs-submenu">
                                {renderMenu(item.children)}
                            </ul>
                        )}
                    </li>
                );
            } else {
                return (
                    <li
                        key={item.name}
                        className={`docs-menu-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick(item.path)}
                    >
                        {item.name}
                    </li>
                );
            }
        });
    };

    return (
        <main>
            <div className='layout-menu'>
                <ul className="docs-menu p-3">
                    {renderMenu(docsMenu)}
                </ul>
            </div>
            <div className='layout-content'>
                <div className='block-full p-3'>
                    {selectedFile ? (
                        <>
                            <div className="markdown-content">
                                <div dangerouslySetInnerHTML={{ __html: selectedFile.html || '' }} />
                            </div>
                            <div className='modified'>
                                {t('docs.lastUpdated')}{selectedFile.lastModified?.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'zh-CN', {
                                    year: "numeric", 
                                    month: "long", 
                                    day: "2-digit", 
                                    hour: "numeric", 
                                    minute: "numeric", 
                                    hour12:false 
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="no-content">
                            <p>请从左侧选择一个文档查看。</p>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </main>
    );
};

export default Docs;