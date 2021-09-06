
var codeCache = '';

var showMsg = function (content) {
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: false
    });
}

Page({
    data: {
  
    },
    onBindQyLogin: function (e) {
        wx.qy.login({
            success: function(res) {
                codeCache = res.code;
                console.log('login:succ:%o', res);
                showMsg('企业微信登陆成功');
            },
            fail: function (res) {
                console.log('login:fail:%o', res);  
                showMsg('企业微信登陆失败');
            },
            complete: function (res) {
                console.log('login:complete:%o', res);  
            }
        })
    },
    onBindCodeToSession: function () {        
        if (codeCache) {
            wx.showLoading();

            wx.request({
                url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wwd6caf1ae7fe4633e&corpsecret=r0HDvR0R2e20A3MF8lCEGXll-MHXPEbvp0HhVLtMK70',
                success: function(res) {
                    wx.hideLoading();

                    wx.request({
                        url: `https://qyapi.weixin.qq.com/cgi-bin/miniprogram/jscode2session?access_token=${res.data.access_token}&js_code=${codeCache}&grant_type=authorization_code`,
                        success: function(res) {
                            if(res.data.errcode == 0) {                               
                                showMsg('session转换成功');
                            } else {                                                              
                                showMsg('session转换失败');
                            }
                        }
                    });
                }
            });
        } else {
            showMsg('请先调用wx.qy.login');
        }        
    },
    onBindCheckSession: function (e) {
        wx.qy.checkSession({
            success: function(res) {
                showMsg('session验证成功');
            },
            fail: function (res) {
                showMsg('session验证失败：未登陆或者登陆过期'); 
            },
            complete: function (res) {
                console.log('checkSession:complete:%o', res);  
            }
        })
    },
    onBindGetEnterpriseUserInfo: function(e) {
         wx.qy.getEnterpriseUserInfo({
            success: function(res) {
                console.log('getEnterpriseUserInfo:succ:%o', res);
                showMsg('用户信息获取成功');
            },
            fail: function (res) {
                console.log('getEnterpriseUserInfo:fail:%o', res);
                showMsg('用户信息获取失败'); 
            },
            complete: function (res) {
                console.log('getEnterpriseUserInfo:complete:%o', res);  
            }
        })
    },
    onBindGetAvatar: function(e) {
         wx.qy.getAvatar({
            success: function(res) {
                console.log('getAvatar:succ:%o', res);
                showMsg('头像获取成功');
            },
            fail: function (res) {
                console.log('getAvatar:fail:%o', res);
                showMsg('头像获取失败'); 
            },
            complete: function (res) {
                console.log('getAvatar:complete:%o', res);  
            }
        })
    },
    onBindGetQrCode: function(e) {
         wx.qy.getQrCode({
            success: function(res) {
                console.log('getQrCode:succ:%o', res);
                showMsg('个人二维码获取成功');
            },
            fail: function (res) {
                console.log('getQrCode:fail:%o', res);
                showMsg('个人二维码获取失败'); 
            },
            complete: function (res) {
                console.log('getQrCode:complete:%o', res);  
            }
        })
    },
    onBindGetMobile: function(e) {
         wx.qy.getMobile({
            success: function(res) {
                console.log('getMobile:succ:%o', res);
                showMsg('获取手机号成功');
            },
            fail: function (res) {
                console.log('getMobile:fail:%o', res);
                showMsg('获取手机号失败'); 
            },
            complete: function (res) {
                console.log('getMobile:complete:%o', res);  
            }
        })
    },
    onBindGetEmail: function(e) {
        wx.qy.getEmail({
            success: function(res) {
                console.log('getEmail:succ:%o', res);
                showMsg('邮箱获取成功');
            },
            fail: function (res) {
                console.log('getEmail:fail:%o', res);
                showMsg('邮箱获取失败'); 
            },
            complete: function (res) {
                console.log('getEmail:complete:%o', res);  
            }
        })
    },
    onBindGetNFCReaderState: function (e){
        wx.qy.getNFCReaderState({
            success: function(res) {
                console.log('getNFCReaderState:succ:%o', res);
                showMsg('获取NFC接口状态成功');
            },
            fail: function (res) {
                console.log('getNFCReaderState:fail:%o', res);                
            },
            complete: function (res) {
                console.log('getNFCReaderState:complete:%o', res);  
            }
        })
    },
    onBindStartNFCReader: function (e) {
        wx.qy.startNFCReader({
            success: function(res) {
                console.log('startNFCReader:succ:%o', res);
                showMsg('开始NFC接口成功');
            },
            fail: function (res) {
                console.log('startNFCReader:fail:%o', res);                
            },
            complete: function (res) {
                console.log('startNFCReader:complete:%o', res);  
            }
        })
    },
     onBindStopNFCReader: function (e) {
        wx.qy.stopNFCReader({
            success: function(res) {
                console.log('stopNFCReader:succ:%o', res);
                showMsg('停止NFC接口成功');
            },
            fail: function (res) {
                console.log('stopNFCReader:fail:%o', res);                
            },
            complete: function (res) {
                console.log('stopNFCReader:complete:%o', res);  
            }
        })
    },    
    onBindGetSDKVersion: function (e) {
        var info = wx.qy.version;

        showMsg('企业微信SDK版本：' + info.version);
    },
    onBindGetSystemInfo: function (e) {
        wx.qy.getSystemInfo({
            success: function(res) {
                console.log('qywx:%o', res);   
                showMsg('当前企业微信版本：' + res.version);              
            }
        });  
    },
    onBindGetWxSystemInfoSync: function(e) {
        var wxinfo = wx.getSystemInfoSync();
        console.log('wx:sync:%o', wxinfo);  
        
        if(wxinfo.environment && wxinfo.environment == 'wxwork') {
            showMsg('企业微信环境');
        } else {
            showMsg('微信环境');
        }             
    },
    onBindGetWxSystemInfo: function (e) {
        wx.getSystemInfo({
            success: function(res) {
                console.log('%o', res)
                
                if(res.environment && res.environment == 'wxwork') {
                    showMsg('企业微信环境');
                } else {
                    showMsg('微信环境');
                }
            }
        });
    },
    onBindSelectEnterpriseContact: function (e) {  
        wx.showActionSheet({
            itemList: ['单人', '多人', '单部门' ,'多部门'],
            success(res) {
                var index = res.tapIndex;

                wx.qy.selectEnterpriseContact({
                    fromDepartmentId: -1,// 必填，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始
                    mode: (index == 1 || index == 3) ? "multi" : "single",
                    type: [index > 1 ? "department" : "user"],
                    success: function(res) {
                        console.log('selectEnterpriseContact suc:%o', res);                
                        var department = res.result.departmentList;
                        var userList = res.result.userList;

                        if(department.length > 0) {
                            department = department.map(function(item) {
                                return item.name;
                            });
                            
                            showMsg('已选择部门：' + department.join('、'));
                        }

                        if(userList.length > 0) {
                            userList = userList.map(function(item) {
                                return item.name;
                            });
                            
                            showMsg('已选择人员：' + userList.join('、'));
                        }
                    },
                    fail: function (res) {
                        console.log('selectEnterpriseContact fail:%o', res);                        
                    }
                });           
            },
            fail(res) {
                console.log(res.errMsg)
            }
        })                      
    },
    onBindOpenEnterpriseChat: function (e) {
        wx.qy.openEnterpriseChat({            
            userIds: 'lggzhou;borgzheng', 
            groupName: '测试群',
            success: function(res) {
                console.log('openEnterpriseChat:succ:%o', res);
            },
            fail: function(res) {
                console.log('openEnterpriseChat:fail:%o', res);
            }
        });    
    },
    onBindSelectExternalContact: function (e) {
        wx.qy.selectExternalContact({            
            filterType: 0,
            success: function(res) {
                showMsg('已选择外部联系人userid：' + res.userIds.join('、'));
            },
            fail: function(res) {
                console.log('selectExternalContact:fail:%o', res);
            }
        });  
    },
    onBindGetCurExternalContact: function (e) {
        wx.qy.getCurExternalContact({
            success: function(res) {
                console.log('getCurExternalContact:succ:%o', res);
            },
            fail: function(res) {
                console.log('getCurExternalContact:fail:%o', res);
            }
        });
    },
    onBindOpenUserProfile: function(e) {
        wx.qy.openUserProfile({            
            type: 1,
            userid: 'borgzheng',
            success: function(res) {
                console.log('openUserProfile:succ:%o', res);
            },
            fail: function(res) {
                console.log('openUserProfile:fail:%o', res);
            }
        });
    }
});
