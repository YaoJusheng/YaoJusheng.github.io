---
title: Python（十一）- 命令行参数选项解析
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
abbrlink: 2d2f30d0
date: 2020-04-11 23:42:18
tags:
  - 命令行解析
categories:
  - [编程]
  - [Python]
---

Python中模块和库比较丰富，这里记录一下关于命令行解析相关的模块。

<!-- more -->

## 1.`sys` 系统模块

通常，初学者都会使用 `sys.argv`收集命令行参数（执行py文件的参数选项，得到一个参数列表，
通过切片和索引可以获取相应的选项和参数，继而去做相应的业务逻辑处理。

## 2.`docopt` 模块
docopt 是一个参数解析的库，与众不同的是在代码的最开头使用"""文档注释的形式写出符合要求的文档，会自动生成对应的parse。

以 docopt_parse.py 文件为例:
```python
"""
Usage:
    docopt_parse.py (-h | --help)
    docopt_parse.py (-v | --version)
    docopt_parse.py (-i | --input) <infile>
    docopt_parse.py (-o | --output) <outfile>
    docopt_parse.py info
    docopt_parse.py list <names>...

Arguments:
    infile            optional input file
    outfile           optional output file
    names             many names

Options:
    -h, --help           Show help
    -v, --version        Show version
    -i, --input          Input of file
    -o, --output         Output to file
    info                 Get object information
    list                 Get some files list

Examples:
    docopt_parse.py -i filename
"""

from docopt import docopt

if __name__ == '__main__':
    args = docopt(__doc__, version='1.0.0')
    # print(args)
    print('---------------------------------------')
    kwargs = {
        'info': args['info'],
        'get_list': args['list'],
        'names': args['<names>'],
        'outfile': args['<outfile>'],
        'infile': args['<infile>'],
        'help': args['--help'],
        'version': args['--version'],
    }
    print(kwargs)

```

**Tips**:
- 分段显示，段落之间空一行，避免模块解析错误

**其中**：
- `Usage` 为用法示例，
- `Arguments` 为参数说明，
- `Options` 为选项说明，
- `Examples` 为样例

**运行示例**:
```bash
python docopt_parse.py -o out-test.txt
```
**结果**：
```txt
{'info': False, 'get_list': False, 'get_count': False, 'names': [], 'suffix_name': None, 'outfile': 'out-test.txt', 'infile': None, 'help': False, 'version'
: False}
```

> 用得好的话，这会是一个不错的选择。

## 3.`getopt` 模块
该模块有两个主要函数，两个属性（主要用来抛出错误信息）。
+ 函数：
  - getopt.getopt
  - getopt.gnu_getopt

+ 属性：
  - getopt.error
  - getopt.GetoptError

这里主要说一下 `getopt.getopt()` 函数

> opts, args = getopt.getopt(args, shortopts, longopts=[])函数

**参数解释**：
- `args` 指的是当前脚本接收的参数，它是一个列表，可通过 `sys.argv` 获得
- `shortopts` 是短选项格式，即："-" 号后面要紧跟一个选项字母。如：`-h`
- `longopts` 是长选项格式，即："--" 号后面跟一个完整单词。如果选项含有附加参数，后面要紧跟 "="，再加上参数，且 "=" 号前后不能有空格。

**返回值**：
- `opts`：解析出的格式信息，为一个两元组（选项+参数）组成的列表。
- `args`：格式信息之外的剩余命令行参数组成的列表。

**Tips**：
- 当选项后面是带一个附加参数时，在分析串中写入选项字符同时后面加一个":"号。如：`getopt.getopt(sys.argv[1:], 'ho:', ['help','output='])`，其中：`h` 和 `o:` 表示两个选项，对应短选项 `-h` 和 `-o`。

**示例**：
```python
import getopt
import sys


def test():
    print(sys.argv[1:])
    print('----------------------')
    opts, args = getopt.getopt(sys.argv[1:], 'ho:', ['help','output='])
    print('opts: ', opts)
    print('args: ', args)


if __name__ == '__main__':
    test()
```

**运行示例**:
```bash
python getopt_parse.py -h amazing why mytest
```
**结果**：
```txt
['-h', 'amazing', 'why', 'mytest']
----------------------
opts:  [('-h', '')]
args:  ['amazing', 'why', 'mytest']
```

## 4.`optparse` 模块
`optparse` 是 python 内置模块，功能也很强大。

### 4.1.基本用法
使用 `OptionParser` 类来解析：
- 导入
```python
from optparse import OptionParser
```
- 构造解析器
```python
parser = OptionParser(usage='自定义帮助信息')
```

- 添加解析规则
```python
parser.add_option(*args, **kwargs)
# or
parser.add_options(option_list)
```

- 调用解析函数
```python
opts, params = parser.parse_args(args=None, values=None)
```
**返回值**：
- `opts`: 一个Python字典，`add_option` 中添加规则的 **`dest`** 参数值为 key，**`default`** 值 或 **用户输入参数值** 作为 value。
- `params`: 用户传入的规则之外的 **剩余参数** 组成的列表。

### 4.2.案例

```python
import optparse


def opt_func(uargs=None):
    """命令行解析"""
    # 创建解析类
    usage = '\n\t--- 帮助信息 ---\n\t' \
            'program_name.py (-v | --version)\n\t' \
            'program_name.py (-h | --help)\n\t' \
            'program_name.py (-f | --file) filename\n\t' \
            ' \n' \
            'Examples: \n\tpython program_name.py [options] <params>'
    parser = optparse.OptionParser(usage=usage)
    # 添加解析规则
    parser.add_option('-f', '--file', action='store', type='string', dest='filename', help='-f 操作文件（参数说明信息）')
    parser.add_option('-v', '--version', action='store_false', dest='version', default='1.0.0', help='-v 版本信息（参数说明信息）')
    return parser.parse_args(uargs)


def test():
    """测试"""
    # 无参
    opts, params = opt_func()
    print('opts-1: ', opts)
    print('params-1: ', params)
    print('-------------------------')

    # 用户输入
    args = ['-f', 'file.txt', '-v', 'this is a test', 'last arg']
    opts, params = opt_func(args)
    print('opts-2: ', opts)
    print('params-2: ', params)
    print('-------------------------')

    # 帮助信息
    opt_func(['-h'])


if __name__ == '__main__':
    test()
```

**`option`中参数的含义**：
- type：用于检测命令行入参的数据类型
- action：告诉程序在遇到指定选项时，如何处理
- dest：用于保存入参选项的值，通过 `options` 访问
- default：dest的默认值，在用户未输入时分配
- help：生成帮助说明信息

**运行示例**：
```bash
python optparse_test.py
```

**结果**：
```text
opts-1:  {'filename': None, 'version': '1.0.0'}
params-1:  []
-------------------------
opts-2:  {'filename': 'file.txt', 'version': False}
params-2:  ['this is a test', 'last arg']
-------------------------
Usage: 
	--- 帮助信息 ---
	program_name.py (-v | --version)
	program_name.py (-h | --help)
	program_name.py (-f | --file) filename
	 
Examples: 
	python program_name.py [options] <params>

Options:
  -h, --help            show this help message and exit
  -f FILENAME, --file=FILENAME
                        -f 操作文件（参数说明信息）
  -v, --version         -v 版本信息（参数说明信息）

```

---