# Personal website source code

> use hexo(create) and github(store and deploy)

## 1. `hexo` 的 使用

> 前提

- 有一个github账号:
- 安装了node.js、npm，并了解相关的基础知识；
- 安装了git

### 1.1. 安装

- `npm install -g hexo`

### 1.2. 初始化

- `cd C:/code/hexo`
- `hexo init`

### 1.3. 生成html

- hexo g # 生成
- hexo s # 启动服务

### 1.4. 修改主题

> 参考： [主题列表](https://hexo.io/themes/)

- `cd C:/code/hexo/`
- `git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia`

### 1.5. 清空

- `hexo clean`

### 1.6. 部署配置

- `hexo deploy`

```yaml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: git@github.com:YaoJusheng/YaoJusheng.github.io.git
  branch: master
```

## 2. 部署deploy

> 赋权限：cacls deploy.sh /t /e /c /g jushe:f
> 执行: .\deploy.sh

## 3. 问题

### 3.1. hexo s 报错: `Error: EMFILE: too many open files`

- 解决： 修改系统的最大文件打开数限制
  - 提高系统句柄上限: `ulimit -n 8192`
  > 参考：[solution](https://hexo.io/docs/troubleshooting.html)
