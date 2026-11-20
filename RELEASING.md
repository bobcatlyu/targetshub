# 发布更新

网站 HTML 是静态文件，打开后会由 `assets/app.js` 和 `assets/data.js` 重新渲染。线上资源可能仍在浏览器或 CDN 缓存中，因此每次发布前需要同步资源版本号。

1. 若修改了靶点数据，先生成受影响页面，例如 `node tools/render-target-sections.cjs il13`。此命令同时更新全站的资源版本号。
2. 若只修改了共享脚本或样式，运行 `node tools/version-assets.cjs`。
3. 运行 `node tools/version-assets.cjs --check`，随后提交并推送修改过的 HTML 和资源文件。

新增靶点或调整首页筛选分类时，运行 `node tools/render-site.cjs`，同步生成全部靶点页、首页、静态导航和收录数字。它保留各页的 head 和站点页脚，并自动更新资源版本号。2026-11-20 新增十个靶点的可编辑内容位于 `tools/new-targets-20261120.cjs`；修改后先运行 `node tools/add-targets-20261120.cjs`，再运行全站生成命令。`node tools/verify-new-targets-20261120.cjs` 可检查新增内容及与本地修改前备份的一致性。

版本号来自文件内容的 SHA-256 摘要。内容变化时请求地址随之变化；Windows 与线上使用不同换行符时仍产生同一版本。不要手动填写日期或随机版本号。

若线上仍显示旧版，先用 Ctrl+F5 强制刷新。不要仅给页面 URL 添加参数：页面内的脚本和数据也必须引用新版本。`_headers` 声明的缓存策略是否生效，应以线上响应头为准。
