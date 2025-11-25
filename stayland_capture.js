// StayLand 刷新接口响应拦截脚本
// 作用：在你手动登录 / 刷新时自动保存 token + refreshToken + 过期时间

let body = $response.body;

try {
  let obj = JSON.parse(body);

  if (obj && obj.data && obj.data.token) {
    let data = obj.data;

    let token = data.token;
    let refreshToken = data.refreshToken;
    let expires = data.expires; // 秒
    let refreshExpires = data.refreshTokenExpiresAt; // 秒

    if (token) {
      $persistentStore.write(token, "STAYLAND_TOKEN");
    }
    if (refreshToken) {
      $persistentStore.write(refreshToken, "STAYLAND_REFRESH_TOKEN");
    }
    if (expires) {
      $persistentStore.write(String(expires), "STAYLAND_TOKEN_EXPIRES");
    }
    if (refreshExpires) {
      $persistentStore.write(String(refreshExpires), "STAYLAND_REFRESH_EXPIRES");
    }

    console.log("[StayLand] 捕获 refreshToken 响应成功");
    console.log("[StayLand] token expires: " + expires);
    console.log("[StayLand] refreshToken expires: " + refreshExpires);
  } else {
    console.log("[StayLand] 响应中没有 data.token，可能接口返回异常");
  }
} catch (e) {
  console.log("[StayLand] 解析 refreshToken 响应失败: " + e);
}

// 必须把原始 body 继续返回给小程序
$done(body);