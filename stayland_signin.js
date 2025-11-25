// StayLand 自动刷新 + 自动签到脚本（远程版）

const KEY_TOKEN = "STAYLAND_TOKEN";
const KEY_REFRESH = "STAYLAND_REFRESH_TOKEN";
const KEY_EXPIRES = "STAYLAND_TOKEN_EXPIRES";
const KEY_REFRESH_EXPIRES = "STAYLAND_REFRESH_EXPIRES";

const BASE = "https://api.stayland.club";

function log(msg) {
  console.log("[StayLand] " + msg);
}

function notify(title, sub, body) {
  $notification.post(title, sub, body);
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

// 读取本地存储
let token = $persistentStore.read(KEY_TOKEN);
let refreshToken = $persistentStore.read(KEY_REFRESH);
let expires = Number($persistentStore.read(KEY_EXPIRES) || "0");
let refreshExpires = Number($persistentStore.read(KEY_REFRESH_EXPIRES) || "0");
let now = nowSeconds();

if (!token || !refreshToken || !expires || !refreshExpires) {
  log("未找到完整的 token 信息，请先手动登录一次以捕获 token。");
  notify("StayLand 签到失败", "", "本地没有 token，请打开小程序登录一次。");
  $done();
} else if (now >= refreshExpires) {
  // refreshToken 过期
  log("refreshToken 已过期，需要重新登录小程序以获取新的 token。");
  notify("StayLand 签到失败", "", "refreshToken 已过期，请重新登录小程序。");
  $done();
} else if (now >= expires) {
  // token 过期，但 refreshToken 有效
  log("token 已过期，开始调用刷新接口...");
  refreshTokenThenSignin();
} else {
  // token 仍然有效
  log("token 仍然有效，直接签到。");
  signin(token);
}

// 刷新 token 再签到
function refreshTokenThenSignin() {
  const url = BASE + "/api/v200/user/WeChatUser/refreshToken";
  const body = {
    token: token,
    refreshToken: refreshToken
  };

  const options = {
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-ClientId": "STAYLand"
    },
    body: JSON.stringify(body)
  };

  $httpClient.post(options, function (error, response, data) {
    if (error) {
      log("刷新接口请求失败: " + error);
      notify("StayLand 刷新失败", "", String(error));
      $done();
      return;
    }

    try {
      let obj = JSON.parse(data);
      if (obj && obj.code === 0 && obj.data && obj.data.token) {
        let d = obj.data;

        token = d.token;
        refreshToken = d.refreshToken;
        expires = d.expires;
        refreshExpires = d.refreshTokenExpiresAt;

        $persistentStore.write(token, KEY_TOKEN);
        $persistentStore.write(refreshToken, KEY_REFRESH);
        $persistentStore.write(String(expires), KEY_EXPIRES);
        $persistentStore.write(String(refreshExpires), KEY_REFRESH_EXPIRES);

        log("刷新 token 成功，新的过期时间: " + expires);
        signin(token);
      } else {
        log("刷新接口返回异常: " + data);
        notify("StayLand 刷新失败", "", "接口返回异常，查看日志。");
        $done();
      }
    } catch (e) {
      log("解析刷新接口响应失败: " + e);
      notify("StayLand 刷新失败", "", "解析响应失败。");
      $done();
    }
  });
}

// 使用当前 token 调用签到接口
function signin(currentToken) {
  const ts = Date.now(); // 毫秒时间戳
  const url = BASE + "/api/v200/user/signinactivity/signin?ts=" + ts;

  const options = {
    url: url,
    method: "GET",
    headers: {
      "X-ClientId": "STAYLand",
      "Authorization": "Bearer " + currentToken,
      "Content-Type": "application/json"
    }
  };

  $httpClient.get(options, function (error, response, data) {
    if (error) {
      log("签到请求失败: " + error);
      notify("StayLand 签到失败", "", String(error));
      $done();
      return;
    }

    try {
      let obj = JSON.parse(data);
      if (obj && obj.code === 0 && obj.data === true) {
        log("签到成功。");
        notify("StayLand 签到成功", "", "今日签到已完成。");
      } else {
        log("签到返回异常: " + data);
        notify("StayLand 签到失败", "", "返回值异常，查看日志。");
      }
    } catch (e) {
      log("解析签到响应失败: " + e);
      notify("StayLand 签到失败", "", "解析响应失败。");
    }

    $done();
  });
}