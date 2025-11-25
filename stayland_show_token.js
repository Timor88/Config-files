// StayLand 查看当前 token / refreshToken

const KEY_TOKEN = "STAYLAND_TOKEN";
const KEY_REFRESH = "STAYLAND_REFRESH_TOKEN";
const KEY_EXPIRES = "STAYLAND_TOKEN_EXPIRES";
const KEY_REFRESH_EXPIRES = "STAYLAND_REFRESH_EXPIRES";

function log(msg) {
  console.log("[StayLand] " + msg);
}

let token = $persistentStore.read(KEY_TOKEN);
let refreshToken = $persistentStore.read(KEY_REFRESH);
let expires = $persistentStore.read(KEY_EXPIRES);
let refreshExpires = $persistentStore.read(KEY_REFRESH_EXPIRES);

if (!token && !refreshToken) {
  log("当前本地没有保存任何 token，请先登录或手动写入。");
  $notification.post("StayLand token 信息", "", "未找到任何本地 token。");
  $done();
} else {
  log("当前 token: " + (token || "无"));
  log("当前 refreshToken: " + (refreshToken || "无"));
  log("token 过期时间戳: " + (expires || "无"));
  log("refreshToken 过期时间戳: " + (refreshExpires || "无"));

  const summary =
    "token: " + (token || "无") +
    "\n\nrefreshToken: " + (refreshToken || "无") +
    "\n\nexpires: " + (expires || "无") +
    "\nrefreshExpires: " + (refreshExpires || "无");

  // 通知里可长按复制
  $notification.post("StayLand token 信息", "", summary);
  $done();
}