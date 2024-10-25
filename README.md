<h1 align="center">rsshub-never-die </h1>
<p>
  <img alt="Version" src="https://img.shields.io/github/package-json/v/CaoMeiYouRen/rsshub-never-die.svg" />
  <a href="https://github.com/CaoMeiYouRen/rsshub-never-die/actions?query=workflow%3ARelease" target="_blank">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/CaoMeiYouRen/rsshub-never-die/release.yml?branch=master">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-blue.svg" />
  <a href="https://github.com/CaoMeiYouRen/rsshub-never-die#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/rsshub-never-die/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/rsshub-never-die/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/rsshub-never-die?color=yellow" />
  </a>
</p>


> 一个基于 hono 的 RSSHub 代理服务，支持自动负载均衡、自动容错和反向代理 RSSHub 实例，支持 Node.js/Docker/Vercel/Cloudflare Workers 等方式部署。

## 🏠 主页

[https://github.com/CaoMeiYouRen/rsshub-never-die#readme](https://github.com/CaoMeiYouRen/rsshub-never-die#readme)


## 📦 依赖要求


- node >=18

## 🚀 部署

> 你可以在这里找到[更多公共实例](https://docs.rsshub.app/zh/guide/instances#公共实例)

### Cloudflare Workers 部署

1. 修改 `wrangler.toml` 配置文件。

```toml
name = "rsshub-never-die"
main = "dist/app.mjs"
minify = true
compatibility_date = "2024-10-20"
compatibility_flags = ["nodejs_compat"]

[vars]
# 超时时间(ms)
TIMEOUT = 60000
# 最大请求体大小(字节)，默认 100MB
MAX_BODY_SIZE = 104857600
# 缓存时间(秒)
CACHE_MAX_AGE = 300
# RSSHub 实例 的 URL 地址，，使用英文逗号分隔。
# 官方实例 https://rsshub.app 不用列出，默认添加。
RSSHUB_NODE_URLS = 'https://rsshub.rssforever.com, https://hub.slarker.me, https://rsshub.pseudoyu.com, https://rsshub.ktachibana.party, https://rsshub.woodland.cafe, https://rss.owo.nz, https://yangzhi.app, https://rsshub.henry.wang, https://rss.peachyjoy.top, https://rsshub.speednet.icu'
# 访问码，注意和 RSSHub 的 ACCESS_KEY 不是同一个。
# 留空则不做限制
# 启用后，在url中添加 authKey 参数即可，例如 authKey=yyyy
AUTH_KEY=''

```

2. 构建并部署到 `Cloudflare Workers`

```sh
npm run build && npm run deploy:wrangler
```

### Vercel 部署

点击以下按钮一键部署到 Vercel。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCaoMeiYouRen%2Frsshub-never-die.git)

### Docker 镜像

支持两种注册表：

- Docker Hub: [`caomeiyouren/rsshub-never-die`](https://hub.docker.com/r/caomeiyouren/rsshub-never-die)
- GitHub: [`ghcr.io/caomeiyouren/rsshub-never-die`](https://github.com/CaoMeiYouRen/rsshub-never-die/pkgs/container/rsshub-never-die)

支持以下架构：

- `linux/amd64`
- `linux/arm64`

有以下几种 tags：

| Tag            | 描述     | 举例          |
| :------------- | :------- | :------------ |
| `latest`       | 最新     | `latest`      |
| `{YYYY-MM-DD}` | 特定日期 | `2024-06-07`  |
| `{sha-hash}`   | 特定提交 | `sha-0891338` |
| `{version}`    | 特定版本 | `1.2.3`       |

### Docker Compose 部署

下载 [docker-compose.yml](https://github.com/CaoMeiYouRen/rsshub-never-die/blob/master/docker-compose.yml)

```sh
wget https://raw.githubusercontent.com/CaoMeiYouRen/rsshub-never-die/refs/heads/master/docker-compose.yml
```

检查有无需要修改的配置

```sh
vim docker-compose.yml  # 也可以是你喜欢的编辑器
```
> 在 `docker-compose.yml` 文件中修改 `RSSHUB_NODE_URLS` 字段即可修改 RSSHub 实例地址。

启动

```sh
docker-compose up -d
```

在浏览器中打开 `http://{Server IP}:3000` 即可查看结果

### Node.js 部署

确保本地已安装 Node.js 和 pnpm。

```sh
# 下载源码
git clone https://github.com/CaoMeiYouRen/rsshub-never-die.git  --depth=1
cd rsshub-never-die
# 安装依赖
pnpm i --frozen-lockfile
# 构建项目
pnpm build
# 启动项目
pnpm start
```

在浏览器中打开 `http://{Server IP}:3000` 即可查看结果。

> 在 `.env` 文件中修改 `RSSHUB_NODE_URLS` 字段即可修改 RSSHub 实例地址。

## 👨‍💻 使用

直接将原本的 `rsshub.app` 域名替换为部署的域名即可。

例如：

如果基础路径为 `https://example.vercel.app`，则原本

 `https://rsshub.app/github/activity/CaoMeiYouRen` 

路由的地址就是

`https://example.vercel.app/github/activity/CaoMeiYouRen`

### 配置项

```ini
# 运行端口
PORT=3000

# 超时时间(ms)
# 如果在 vercel 中运行，则还要修改 vercel.json 中的 maxDuration 字段(单位：秒)
TIMEOUT=60000

NODEJS_HELPERS=0
# 是否写入日志到文件
LOGFILES=false

# 日志级别
# LOG_LEVEL=http

# 最大请求体大小(字节)，默认 100MB
# MAX_BODY_SIZE=104857600

# RSSHub 实例 的 URL 地址，，使用英文逗号分隔。
# 官方实例 https://rsshub.app 不用列出，默认添加。
RSSHUB_NODE_URLS='https://rsshub.rssforever.com, https://hub.slarker.me, https://rsshub.pseudoyu.com, https://rsshub.ktachibana.party, https://rsshub.woodland.cafe, https://rss.owo.nz, https://yangzhi.app, https://rsshub.henry.wang, https://rss.peachyjoy.top, https://rsshub.speednet.icu'

# 缓存时间(秒)
CACHE_MAX_AGE=300

# 访问码，注意和 RSSHub 的 ACCESS_KEY 不是同一个。
# 留空则不做限制
# 启用后，在url中添加 authKey 参数即可，例如 authKey=yyyy
AUTH_KEY=''
```

## 📚FAQ

### 1. 在什么情况下应该使用本项目？

**适用情况：**

- **自动容错：** 默认情况下，本项目会从提供的 RSSHub 实例节点中随机挑选 5 个，加上官方实例，共计 6 个节点，并发请求，并返回最快 **成功** 的那个响应。即便有部分实例失效，也可以从其他正常的实例中返回最快的结果。
- **不需要配置项的路由：** 对于所有不需要配置项的路由，均可以正常访问。
- **反向代理：** 由于一些原因，你可能无法访问部分 RSSHub 实例，通过本项目作为代理，你可以正常访问到有效的 RSSHub 实例（需要准备一个有效的域名）。

### 2. 在什么情况下本项目不适用？

**不适用情况：**

- **需要配置项的路由：** 对于部分需要配置项才能正常工作的路由，由于公共实例并未提供相关配置，故这些路由均无法正常工作。

## 🛠️ 开发

```sh
pnpm run dev
```

## 🔧 编译

```sh
pnpm run build
```

## 🔍 Lint

```sh
pnpm run lint
```

## 💾 Commit

```sh
pnpm run commit
```


## 👤 作者


**CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd/](https://blog.cmyr.ltd/)

* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)


## 🤝 贡献

欢迎 贡献、提问或提出新功能！<br />如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/rsshub-never-die/issues). <br/>贡献或提出新功能可以查看[contributing guide](https://github.com/CaoMeiYouRen/rsshub-never-die/blob/master/CONTRIBUTING.md).

## 💰 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=CaoMeiYouRen/rsshub-never-die&type=Date)](https://star-history.com/#CaoMeiYouRen/rsshub-never-die&Date)

## 📝 License

Copyright © 2024 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/rsshub-never-die/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [cmyr-template-cli](https://github.com/CaoMeiYouRen/cmyr-template-cli)_
