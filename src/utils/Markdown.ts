/*
 * @Author: 故乡情 epnz@163com
 * @Date: 2025-12-30 01:51:58
 * @LastEditTime: 2025-12-30 03:25:14
 * @LastEditors: 故乡情
 * @FilePath: \docs\src\utils\Markdown.ts
 * @Description: Markdown 工具类，用于遍历并导入 md 目录下的 .md 文件
 * Copyright (c) 2025 by epnz.com, All Rights Reserved.
 */
import { marked } from 'marked';

// 定义 Markdown 文件类型
export interface MarkdownFile {
    name: string;
    path: string;
    content: string;
    html?: string;
}

/**
 * 遍历并导入 md 目录下的所有 .md 文件
 * 使用 Vite 的 import.meta.glob 功能实现动态导入
 */
export const importMarkdownFiles = async (): Promise<MarkdownFile[]> => {
    // 使用 Vite 的 import.meta.glob 匹配 md 目录下的所有 .md 文件
    const markdownFiles = import.meta.glob('/md/**/*.md', {
        eager: false,     // 延迟加载
        query: '?raw',    // 作为原始文本导入
        import: 'default' // 导入默认导出
    }) as Record<string, () => Promise<string>>;

    const files: MarkdownFile[] = [];

    // 遍历所有匹配的文件路径
    for (const [path, importFn] of Object.entries(markdownFiles)) {
        try {
            // 提取文件名（不包含扩展名）
            const fileName = path.split('/').pop()?.replace('.md', '') || '';

            // 导入文件内容
            const content = await importFn();

            // 解析为 HTML
            const html = await marked(content);

            // 添加到文件列表
            files.push({
                name: fileName,
                path,
                content,
                html
            });
        } catch (error) {
            console.error(`Failed to import markdown file: ${path}`, error);
        }
    }

    // 按文件名排序
    return files.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * 将 Markdown 文本转换为 HTML
 * @param markdown Markdown 文本
 * @returns 解析后的 HTML 字符串
 */
export const markdownToHtml = async (markdown: string): Promise<string> => {
    return await marked(markdown);
};

/**
 * 获取单个 Markdown 文件
 * @param fileName 文件名（不包含扩展名）
 * @returns MarkdownFile 对象或 undefined
 */
export const getMarkdownFile = async (fileName: string): Promise<MarkdownFile | undefined> => {
    try {
        const markdownFiles = import.meta.glob('/md/**/*.md', {
            eager: false,
            query: '?raw',
            import: 'default'
        }) as Record<string, () => Promise<string>>;

        for (const [path, importFn] of Object.entries(markdownFiles)) {
            if (path.includes(fileName) || path.endsWith(`${fileName}.md`)) {
                try {
                    const content = await importFn();
                    const html = await marked(content);

                    return {
                        name: fileName,
                        path,
                        content,
                        html
                    };
                } catch (error) {
                    console.error(`Failed to parse markdown file: ${path}`, error);
                }
            }
        }

        console.warn(`Markdown file not found: ${fileName}`);
        return undefined;
    } catch (error) {
        console.error(`Error while fetching markdown files: ${fileName}`, error);
        return undefined;
    }
};

// 导出 marked 实例，方便自定义配置
export { marked };