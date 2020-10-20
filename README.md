# 关于 Git 的学习

Git 是一个分布式的版本控制软件，操作方式主要有 **命令行模式（GitBash）** 和**GUI 模式（TprtposeGit）**。以下主要使用 Git Bash来操作。

使用文档：https://git-scm.com/book/zh/v2

版本控制就是记录一个或多个文件的改动。可以记录很多历史数据以供回看时对比和查验，或出现问题时快速回退。

版本控制主要有三种：

1. 本地版本控制系统，如**RCS** 原理是在硬盘上保存补丁集（修改前后的变化），来进行恢复。主要是为了本地文件的回退。
2. 集中化的版本控制（Centralized Version Control Systems 简称 CVCS），主要是为了集体协作，有一个远端服务来提供版本控制，个人只有现有版本，连接服务来获取最新版本和提交更新。好处是可以轻松控制权限，但是一旦远端出问题立刻就会导致预期之外的结果,一般会同步保存到备用服务器，开销较大，但是代码安全性高。代表 **SVN**
3. 分布式版本控制系统（Distributed Version Control System，简称 DVCS），也是为了集体协作，有远端控制，但是本地也有完整的记录，不管远端还是本地出现问题都是可以用其他的镜像来恢复。相对集中式的优势：可以根据需要设定不同的协作流程，比如层次模型式的工作流。代表 **Git**

## Git

Git 和其他的软件不同，它保存文件的快照，当文件没有改变时指向之前存储的链接。一些软件使用的是保存文件的变更列表，一个基本文件和随时间积累的差异。

Git 像一个小型的文件系统，并提供很多的工具，并开发出来一些界面话的操作工具。

- Git 几乎所有的操作都是在本地，因此会非常的快。

- Git 使用 SHA-1 散列来计算校验和，并用校验和来引用。

- Git 一般只添加数据，一旦提交就几乎不会丢失数据

Git 有三种状态：

1. 已修改（modified）：修改了文件但是没有保存到数据库中。
2. 已暂存（staged）：已经对已修改的文件做了标记，市值包含在下次提交的快照中
3. 已提交（committed）：已经将数据保存到了本地数据库中

三种状态分别处于不同的工作区域：

1. 工作目录（Working Directory）
2. 暂存区域（Staging Area）
3. Git 仓库（.git direcroty）

基本流程：在工作目录中修改文件 => 暂存文件，将文件快照放入暂存区 => 提交更新，将快照永久性的存储到 Git 仓库目录

## 安装

1. https://git-scm.com/ Git 官网下载安装
2. Github 安装自带 命令行Git ，http://windows.github.com 或 http://mac.github.com
3. 其他如 TprtposeGit 等

## 使用

```sh
# 配置 git,单独项目配置去掉 --global
git config --global user.name "xxxx"
git config --global user.email "xxx@xxx.xxx"
# 查看配置
git config --list
git config user.name
# 查看帮助
git help <命令>
git <命令> --help
# 初始化一个仓库
git init
# 添加新增文件和修改到缓冲区
git add 文件名或者文件匹配符
# 添加所有
git add . 
git add *
git add *.js
# 提交到仓库
git commit -m "xxxxxx"
# 克隆远端，会创建一个文件夹并初始化一个 .git 文件夹 并拉取所有数据，去除最新的文件
# git 支持 https、git://、ssh 等协议
git clone 仓库地址 自定义文件夹名默认远端仓库名
# 文件有两种状态，一种已跟踪一种是未跟踪。未跟踪的文件是新建的为存储过的文件
# 检查文件状态
git status
# 处于 master 分支，没有提交到版本库，已经暂存处于暂存区
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   gitbook.md
# 状态简览
git status -s 
git status --short 
#详细的修改 当前文件和暂存区快照之间的差异
git diff
# 查看已暂存的将要添加到下次提交里的内容
git diff --cached
# version > 1.6.1
git diff --staged
# 查看可以使用的 Git Diff 插件
git difftool --tool-help
# 使用插件输出结果
git difftool
# 提交，打开提交信息编辑器，编辑器中填充有 git status 的信息
git commit
# 增加文件修改的信息，在打开的编辑器中
git commit -v
# 提交信息放在同一行
git commit -m "xxxxxx"
# 跳过暂存区，将所有已经跟踪过的文件暂存并提交
git commit -a
# 移除文件,手动删除文件后使用 git rm xxx 删除删除的记录
# 如果删除钱修改过并且已经放到暂存区，需要加 -f 的参数 force 迫使，强行的意思
git rm
# 从存储库和暂存区删除但是保留工作目录的当前文件
git rm --cached xxx
# git rm 可以使用 glob 模式
# 删除 log/ 目录下的扩展名为 .log 的所有文件
git rm log/\*.log
# 删除所有以 ~ 结尾的文件
git rm \*~
# 移动文件
# 改名
git mv file_from file_to
# 相当于
mv file_from file_to
git rm file_from
git add file_to
# 查看提交历史
git log
# 显示提交差异
git log -p
# 显示最近两条
git log -2
# 显示修改的简略信息
git log --stat
# 显示不同的格式展示提交信息 oneline short full fuller 等模式可用
git log --pretty=oneline
#其他定制类型
# 具体请查看 https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2#log_options
# https://git-scm.com/docs/git-log
git log --pretty=format:"%h - %an, %ar : %s"
git log --pretty=format:"%h %s" --graph
# 限制输出长度，最近两周内的提交,可以使用 "2020-10-19"、"2 years 1 day 3 minutes ago"
git log --since=2.weeks
#将暂存区的文件提交并覆盖前一次的提交结果 git commit --amend
git commit -m "initial commit"
git add frorgotten_file 
git commit --amend 
#取消暂存文件
git reset
# 撤销操作，谨慎使用,会造成工作丢失
git checkout -- xxxx
```

### 忽略文件

如果不需要将一些文件纳入管理范围，就可以使用 .gitignore 文件来设置忽略规则。

规则：

- 所有的空行和 # 开头的行都会被忽略
- 可以使用标准的glob模式匹配
- 匹配模式可以使用以 / 开头防止递归
- 匹配模式可以使用 / 结尾来指定目录
- 要忽略指定模式以外的文件或目录，可以在模式钱加上 ! 来取反

```sh
# glob模式指的是shell所使用的简化的正则表达式。
# * 匹配零个或多个任意字符 
# [abc]匹配任何一个方括号中的字符；
# ? 只匹配一个任意字符
# ** 表示匹配人以中间目录
# 忽略 test.js 文件
test.js
# 忽略以.doc 结尾的文件
*.doc
# 跟踪 lib.doc 文件，即使上边忽略所有 .doc 文件
!lib.doc
# 仅忽略当前文件夹下的 dist 文件夹，不忽略子文件夹下的dist文件夹
/dist
# 忽略 dist 文件夹下的所有文件
dist/
# 忽略doc文件夹下的所有的 .pdf 文件
doc/**/*.pdf
```

> Github上有一个库 https://github.com/github/gitignore 可以查看对饮规则的运用

## 远程仓库

```sh
# 如果已经配置了远程仓库，可以看到远程服务器的简写
git remote
# 从远端新建复制分支到本地
git branch --track main origin/main
```





