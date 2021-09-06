## 开始

本示例代码将展示企业微信小程序特有的 `jsapi` 能力接口，关于企业微信小程序相关的更多信息请查阅 [小程序开发](https://work.weixin.qq.com/api/doc/90000/90136/92455)。

## 接口列表

在本示例代码中，主要涉及到以下场景和接口：

* 登录接口
    - wx.qy.login
    - code2session
    - wx.qy.checkSession
* 用户信息
    - wx.qy.getEnterpriseUserInfo
    - wx.qy.getAvatar
    - wx.qy.getQrCode
    - wx.qy.getMobile
    - wx.qy.getEmail
* 企业通讯录与会话
    - wx.qy.selectEnterpriseContact
    - wx.qy.openEnterpriseChat
    - wx.qy.selectExternalContact
    - wx.qy.getCurExternalContact
    - wx.qy.openUserProfile
* NFC接口
    - wx.qy.getNFCReaderState
    - wx.qy.startNFCReader
    - wx.qy.stopNFCReader
* 系统设置
    - wx.qy.getSystemInfo
    - wx.getSystemInfoSync
    - wx.getSystemInfo
    - wx.qy.version    

## 使用指南

#### 1. 下载本示例代码

推荐使用 `git` 将代码包下载到本地 
``` dash
git clone https://github.com/WecomTeam/MiniProgramSample.git
```

#### 2. 导入小程序开发者工具

打开微信小程序开发者工具，将本示例代码导入工程，请注意须填写有效的 appid。

#### 3. 安装企业微信小程序模拟器

通过 **菜单 > 工具 > 插件** 安装**企业微信小程序模拟器**


#### 4. 切换至企业微信小程序模式

通过 **工具栏 > 模式** 选择 **企业微信小程序模式** 进行预览。



## 使用须知

#### 1. 接口授权

用户信息、通讯录、会话相关的 `jsapi` 须要先进行授权，具体使用细则参考[wx.qy.login](https://work.weixin.qq.com/api/doc/90000/90136/91506)。

> 调用前提：
>
> 1. 必须先调用过wx.qy.login，且session_key未过期，开发者可调用checkSession 检查当前登录态
> 2. 当前成员必须在应用的可见范围

#### 2. access_token

本示例为了简化演示，获取 `access_token` 的过程直接放在小程序内处理，实际线上请勿这样操作，具体使用请参考文档 [获取 access_token](https://work.weixin.qq.com/api/doc/90000/90135/91039)。`access_token` 须要在 Server 端进行获取和混存，不可将 `access_token` 传递到前端。