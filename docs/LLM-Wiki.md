> 此功能为 [同步助手 1.5.1 版](Sync) 功能，如低于此版本 [请升级](Sync?id=下载)。

# 简悦 Andrej Karpathy LLM Wiki 方案

## 描述

专门用于 [简悦 Andrej Karpathy LLM Wiki 方案](https://github.com/Kenshin/simpread-karpathy-llm-wiki-compiler) 可以将 [通过搜索](https://github.com/Kenshin/simpread/discussions/3864#discussioncomment-2969403) 得到的稍后读合导出到指定位置。

## 写在前面

这套框架旨在弥合 “稍后阅读（Read-it-Later）” 与 “永远不读（Read-it-Never）” 之间的鸿沟。

使用这套框架，让我 **非常方便的管理着通过简悦 (SimpRead) 收集的数千个深度阅读内容（稍后读）**。

它不只是简单的存储，而是通过一套 **协议驱动型架构**，将本地快照（稍后读） 增量编译为具备高度逻辑性、可回溯、且带有本地快照链接的结构化维基。

这部分功能仅仅是针对如何导出稍后读的说明，这套框架的 👉 [具体使用方案](https://github.com/Kenshin/simpread-karpathy-llm-wiki-compiler)

## 设置

同步助手（主窗体） → 导出  → Karpathy LLM Wiki（LLM RAG）方案

![](https://res.cloudinary.com/simpread/image/upload/v1776670088/config/ce7ec3c419b47006391c86f25f3d5941.png)

## 功能说明

1. 导出位置

    >  配合 Karpathy LLM Wiki 理念的话，一般是在 `raw/` 目录，如不设置此目录会自动导出到本地快照的目录 `output/`

2.  最大行数

    > LLM 在读取文本文件时，因为上下文的限制，所以需要设置一个最大行数，这样方便 LLM
    
    - `n` 任意数字（默认值为 `1000` ，不建议修改，如需修改的话，建议可以咨询你的 LLM

    -  `-1` 合并为一个文件

    - `0` 不合并（按照稍后读的数量直接保存）
    
3.  导出时可选 `全文` 或 `标注`

    > 除非你经常喜欢标注，否则建议选择 `全文`
    
## 如何使用

打开 [稍后读 · 极速版 2.0](http://localhost:7026/unread/) 右上角位置（如图）

![image-20260420160110987](https://res.cloudinary.com/simpread/image/upload/v1776672074/config/bd96450a5a010ddcdc9a2825d017a304.png)

当通过右上角搜索得到一些稍后读合集后，就可以点击此按钮下载了（前提需要设置 `导出目录` ）

### 操作过程

![](https://res.cloudinary.com/simpread/image/upload/v1776670224/config/11750bdd3a9cddf667743eff14ec2355.png)