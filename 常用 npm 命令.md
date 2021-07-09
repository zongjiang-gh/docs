# 常用 npm 命令

```bash
# 查看所有的依赖，递归
npm list

└─┬ cowsay@1.3.1
  ├── get-stdin@5.0.1
  ├─┬ optimist@0.6.1
  │ ├── minimist@0.0.10
  │ └── wordwrap@0.0.3
  ├─┬ string-width@2.1.1
  │ ├── is-fullwidth-code-point@2.0.0
  │ └─┬ strip-ansi@4.0.0
  │   └── ansi-regex@3.0.0
  └── strip-eof@1.0.0
  
# 查看全局
npm list -g
# 指定深度
npm list --depth=0

└── cowsay@1.3.1

# 查看当前包最新的的可用版本 以下 cowsay 是一个 npm 库
npm view cowsay version
# 查看所有的可用版本
npm view cowsay versions
# 安装特定依赖版本
npm i cowsay@1.3.0
# 更新所有 不会更新主版本
npm update
# 更新 cowsay
npm update cowsay
# 需要更新主版本 x.y.x 主版本.次版本.补丁版本
# 当进行不兼容的 API 更改时，则升级主版本。
# 当以向后兼容的方式添加功能时，则升级次版本。
# 当进行向后兼容的缺陷修复时，则升级补丁版本。
npm i -g npm-check-updates
ncu -u
npm update # 升级主版本后更新

# 执行 npm版本 >= 5.2 从当前工程找到全局
npx cowsay
# 显示软件包的新版本
npm outdated
# 卸载包
npm uninstall cowsay
# -S ， -D dev
# 安装生产依赖
npm i --production
# npm i node@12
npx node@10 -v
# 执行远端，小心执行容易出事
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

