// StayLand 刷新接口响应拦截脚本（带通知版）

let body = $response.body;

function notify(title, sub, msg) {
  $notification.post(title, sub, msg);
}

try {
  let obj = JSON.parse(body);

  if (obj && obj.data && obj.data.token) {
    let data = obj.data;

    let token = data.token;
    let refreshToken = data.refreshToken;
    let expires = data.expires; 
    let refreshExpires = data.refreshTokenExpiresAt;

    $persistentStore.write(token, "STAYLAND_TOKEN");
    $persistentStore.write(refreshToken, "STAYLAND_REFRESH_TOKEN");
    $persistentStore.write(String(expires), "STAYLAND_TOKEN_EXPIRES");
    $persistentStore.write(String(refreshExpires), "STAYLAND_REFRESH_EXPIRES");

    let msg = 
      "token:\n" + token +
      "\n\nrefreshToken:\n" + refreshToken +
      "\n\nexpires: " + expires +
      "\nrefreshExpires: " + refreshExpires;

    console.log("[StayLand] 捕获 token 成功");
    notify("StayLand 捕获成功", "已保存 token", msg);

  } else {
    console.log("[StayLand] 响应中没有 token");
    notify("StayLand 捕获失败", "", "未找到 token 字段（可能接口异常）");
  }

} catch(e) {
  console.log("[StayLand] 捕获 token 解析失败: " + e);
  notify("StayLand 捕获失败", "", "JS 解析失败：" + e);
}

// Loon 正确写法
$done({ body });