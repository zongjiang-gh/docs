# 关于 Git 的学习 (基于 2.29.0.windows.1)

Git 是一个分布式的版本控制软件，操作方式主要有 **命令行模式（GitBash）** 和**GUI 模式（TprtposeGit）**。以下主要使用 Git Bash来操作。

使用文档：https://git-scm.com/book/zh/v2

更新 Git（windows） `git update-git-for-windows` ，2.17.1以下版本 `git update`

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

## 简单使用

```sh
# 配置 git,单独项目配置去掉 --global
git config --global user.name "xxxx"
git config --global user.email "xxx@xxx.xxx"
# 设置 git init 时创建默认分支的名称
git config --global init.defaultBranch main
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
# 详细的修改 当前文件和暂存区快照之间的差异
git diff
# 查看空行
git diff --check
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
#将暂存区的文件提交并覆盖前一次的提交结果 git commit --amend ,撤销后提交合并到远端需要强制提交 git push origin +main
git commit -m "initial commit"
git add frorgotten_file 
git commit --amend 
#取消暂存文件
git reset
# 撤销操作，谨慎使用,会造成工作丢失
git checkout -- xxxx
# 本地存储修改,本地存储当前修改以进行新问题的修改
# https://www.cnblogs.com/tocy/p/git-stash-reference.html
git stash
git stash save "xxxxxxxxx"
# 本地储藏的列表
git stash list
# 重新应用最新缓存的工作目录，并删除
git stash pop
# 只应用对应的 stash
git stash apply
# 删除存储
git stash drop stash@{0}# 这里是存储的名字，可以用list查看
git stash clear # 删除所有
# 查看diff -p 可以查看所有的diff
git stash show
# 从stash 创建分支
git stash branch testchanges
# 不会缓存新创建的文件，使用 -u 或者 -a 来缓存为跟踪的，或者所有文件
# 不缓存 untracked files、ignored files
```

## 忽略文件

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
git remote -v
# 查看远程引用的完整列表
git ls-remote
# 从远端新建复制分支到本地
git branch --track main origin/main
# 强制推送
git push origin +main
# 覆盖服务器上的提交历史
git push --force
# 添加源，使用简称来代替每次要输入的地址，减少使用难度
git remote add 分支名 源地址
git remote add pb https://github.com/paulboone/ticgit
# 拉取远端信息，拉完后可以在本地通过 pb/master 来访问当，可以合并到自己的某个分支中，想要查看可以从此分支创建一个本地分支
git fetch pb
# 从远端拉取并合并
git pull origin master
#查看远程仓库
git remote show origin
# 修改远端仓库的简写名 origin 是默认名
git remote rename pb paul
git remote
# 移除远程仓库 
git remote rm 

```

## 标签

标签主要有两种：轻量标签（lightweight）与附注标签（annotated）

- 轻量标签主要是临时标签，只是对特定提交的引用
- 附注标签有一系列关于标签的信息

```sh
# 查看标签
git tag
# 标签太多时，查看指定标签
git tag -l "v1.8.5*"
# 创建辅助标签
git tag -a v1.4 -m "my verison 1.4"
# 查看具体的标签信息
git show v1.4
# 创建轻量标签
git tag v1.5-lw
# 给以前的提交打标签,查看日志，使用校验和来打标签可以使用部分校验和
git log --pretty=oneline
git tag -a v1.2 9fceb02
# 推送标签到远端
git push origin v1.5
# 推送多个标签
git push origin --tags\
# 检出标签,创建一个分支 version2 基于 v2.0.0,此时 version2 就和 v2.0.0 标签内容一样
git checkout -b version2 v2.0.0
# 如果检出后的分支修改并提交的话需要小心合并
```

## Git 命令的别名

```sh
# 使用 git co 就是使用 git checkout 下同
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
# git reset HEAD -- fileA
$ git config --global alias.unstage 'reset HEAD --'
git unstage fileA
# 查看上一次提交的别名
$ git config --global alias.last 'log -1 HEAD'
git last
# 当需要执行外部命令时，需要在命令前加上!
$ git config --global alias.visual '!gitk'
```

## Git 的分支

Git 的优势在与它的分支的创建和切换都很轻量，很快。Git 的分支，其实本质上仅仅是指向提交对象的可变指针。

```sh
# git init 时会创建一个 master 分支
# 查看所有的分支
git branch
# 查看所有分支的最后一次提交
git branch -v
# 查看所有的跟踪分支的跟踪信息,先拉取一次所有的远端的信息
git fetch --all
git branch -vv
# 查看已经合并或尚未合并到当前分支的分支
git branch --merged
git branch --no-merged
# 创建分支, HEAD 指的是当前所在的分支
git branch dev
# 查看各个分支当前所指的对象
git log --oneline --decorate
# 切换分支
git checkout dev
# 在不同的分支开发并提交后，查看分叉历史,可以创建简写加快效率
git log --oneline --decorate --graph --all
# 合并分支
git merge dev
# 合并时使用图形工具
git mergetool
# 删除分支
git branch -d dev
# 跟踪分支,--track 是一个快捷方式，两个命令相同
git checkout --track origin/dev
git checkout -b dev origin/dev
# 设置跟踪或者修改正在耿总的上游分支
git branch -u origin/dev
git branch --set-upstream-to origin/dev
# 上游的快捷方式 @{upstream} 或者 @{u},以下两个命令等价
git merge origin/master
git merge @{u}
# 删除远程分支，只是删除指针，Git服务器会保留数据一段时间知道垃圾回收运行，可以进行恢复
git push origin --delete dev
# 变基，主要就是可以减少提交历史的分叉，看起来整洁一些
# 变基是将一系列提交引用到另一个分支上，合并是把最终结果合并到一起
git checkout dev
git rebase master
# 此时 dev 分支比较新 master 分支比较老 
git checkout master
git merge dev
# 合并完成后 master 和 dev 引用统一个指针
git branch -d dev
# 当从一个工作 server 分支新建一个分支 client 并想要将 client 分支和 server 分支不同的提交变基到 master 上并合并
git rebase --onto master server client
git checkout master
git merge client
# 不切换到 server 分支直接进行变基
git rebase master server
git checkout master
git merge server
git branch -d client
git branch -d server
```

> **注意**
>
> 不要对在你的仓库外有副本的分支执行变基，就是只对你本地的提交进行变基不要对远端提交变基后覆盖，这要会导致多人进行的任务爆炸性混乱。如果必须要要做，所有人都要执行 ：
>
> git pull --rebase

## 服务器上的 Git

> 关于在多种操作系统中生成 SSH 密钥的更深入教程，请参阅 GitHub 的 SSH 密钥指南https://help.github.com/articles/generating-ssh-keys。

具体操作根据个人需要，一般公司内部都是 gitlab



