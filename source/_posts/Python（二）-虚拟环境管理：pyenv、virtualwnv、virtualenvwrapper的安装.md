---
title: Python（二）- 虚拟环境管理：pyenv、virtualwnv、virtualenvwrapper的安装
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 9ceab481
date: 2020-03-13 21:44:31
tags:
  - 虚拟环境
categories:
  - [编程]
  - [Python]
---

> python 中使用虚拟环境

<!-- more -->

很多人都说Python是一门胶水语言，事实上，它的确很强大！
应用于很多领域，注重模块化，因此我们需要一种手段，能够帮助我们去区分和管理不同的模块集合（环境），适应不同需求，同时可以丢掉那些不必要且繁重的依赖（纯净）。
虚拟环境管理就是为这个而生的。

# 1. pyenv
> 针对python多版本的管理工具，可以自由切换不同版本，适应多种需求。
类似git的分支管理。
但不支持Windows，不过Windows下有一个替代品：`pywin`
```bash
# 安装curl 和 git
sudo apt-get install curl git-core
# 安装 (如果用的是 zsh 的话，则替换命令中的 bash)
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
or
# 安装到 ~/.pyenv 目录
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```
> 配置环境变量 (zsh则将 `~/.bashrc` 修改为 `/.zshrc` )
```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

> 一些基本操作：
```bash
pyenv update              # 更新
rm -fr ~/.pyenv           # 卸载：删除目录

pyenv install -list       # 显示可安装版本
pyenv versions            # 显示已有版本

pyenv install `版本号`     # 安装指定版本
pyenv uninstall `版本号`   # 卸载指定版本

# local：临时，global：永久
pyenv global `版本号`      # 指定全局版本
pyenv global system       # 恢复系统全局默认版本
pyenv local system        # 设置当前虚拟版本为系统默认的版本
pyenv local `版本号`		  # 指定本地默认版本
```

# 2. virtualenv
> virtualenv 提供了一种功能， 将一个目录建成一个python的虚拟环境， 用户可以建立多个虚拟环境， 可以指定每个环境中的python版本， 环境之间相互独立。

```bash
# 安装
pip install virtualenv
# 进入环境目录
cd `env_name`
# 创建虚拟环境
virtualenv [-p `python_path` --no-site-packages] `env_name`
# 切换不同的虚拟环境
source `env_name`/bin/activate
# 退出
deactivate
# 删除
rm `env_name`
```

# 3. virtualevnwapper
> 对virtualenv的强化和扩展，使管理更加方便简单。

```bash
# 安装
pip install virtualenv  # 依赖
pip install virtualenvwrapper
# 创建
mkvirtualenv [-p `python_path`] `env_name`
# 列出所有虚拟环境
workon 或 lsvirtualenv -b
# 切换
workon `env_name`
# 退出
deactive
# 删除
rmvirtualenv `env_name`
```


> 常用：
> `pyenv + virtualenv `  和  `virtualenv + virtualenvwrapper` 的组合
> 个人倾向于后者

现在可以随意地创建不同的虚拟环境，供不同项目使用和管理了。
当然，如果对docker熟悉的话，这也是一个很好的选择。

> 原文地址： CSDN博客 - [Python（二）- 虚拟环境管理：pyenv、virtualwnv、virtualenvwrapper的安装](https://blog.csdn.net/weixin_41599858/article/details/101801050)