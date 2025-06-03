## 部署到 Heroku（适用于 Full Stack Open Part 3）

以下步骤假设你的后端位于 `part3/phonebook_backend`，前端位于 `part2/phonebook_exercise`，并使用 Vite 构建。

---

### 0. 安装 Heroku CLI（首次使用）

```bash
npm install -g heroku
# 全局安装 Heroku 命令行工具
```

```bash
heroku login
# 登录 Heroku，浏览器将弹出进行身份验证
```

---

### 1. 构建前端并复制到后端

```bash
cd part2/phonebook_exercise
npm run build
# 使用 Vite 构建前端，生成 dist 文件夹
```

```bash
cp -r dist ../part3/phonebook_backend/build
# 将构建好的前端复制到后端的 build 文件夹中
```

---

### 2. 配置后端项目

确保你已经在后端代码中添加了以下两项：

```js
app.use(express.static('build'))
# 用于托管前端的静态资源
```

```js
const PORT = process.env.PORT || 3001
# Heroku 会自动设置 PORT 环境变量
```

---

### 3. 创建 `Procfile`

```bash
echo "web: node index.js" > Procfile
# 告诉 Heroku 如何启动你的后端服务
```

---

### 4. 添加 `.gitignore`

确保在后端目录中包含 `.gitignore` 文件，忽略如下内容：

```
node_modules
.env
```

---

### 5. 初始化 Git 仓库并提交

创建新 GitHub 仓库
打开 GitHub：https://github.com/new



```bash
cd ../part3/phonebook_backend
git init
# 初始化 Git 仓库
git remote add origin https://github.com/Eric-1892/phonebook-backend.git
#远程连接
```

```bash
git add .
git commit -m "Prepare backend for Heroku deployment"
# 提交当前项目到版本控制
```

---

### 6. 创建 Heroku 应用

```bash
heroku create
# 创建一个新的 Heroku 应用，并自动设置 git remote
```

---

### 7. 部署到 Heroku

```bash
git push heroku main
# 将当前 main 分支推送到 Heroku（如果你使用 master 分支请替换为 master）
```

---

### 8. 打开已部署应用

```bash
heroku open
# 在默认浏览器中打开 Heroku 部署的网址
```

---

### 可选：优化前端 baseUrl 设置

```js
const baseUrl='/api/persons'

---

### 注意事项

- 每次修改前端后需要重新 `npm run build` 并复制到后端。
- 确保 build 文件夹未被 `.gitignore` 忽略。
- Heroku 会自动运行 `node index.js` 启动你的后端服务。
