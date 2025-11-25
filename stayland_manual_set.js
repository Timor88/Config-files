// StayLand 手动写入 token / refreshToken 脚本
// 用法：改下面 4 个常量，保存到 GitHub，Loon 里点“执行”一次即可。

// ======= 把下面 4 个值改成你自己的 =======
const MANUAL_TOKEN = "在这里粘贴 Bearer 里的 token（去掉前面的 Bearer 空格）";
const MANUAL_REFRESH_TOKEN = "在这里粘贴 refreshToken";
const MANUAL_EXPIRES = 1764046153;          // token 过期时间（秒时间戳）
const MANUAL_REFRESH_EXPIRES = 1764287353;  // refreshToken 过期时间（秒时间戳）
// =======================================

const KEY_TOKEN = "STAYLAND_TOKEN";
const KEY_REFRESH = "STAYLAND_REFRESH_TOKEN";
const KEY_EXPIRES = "STAYLAND_TOKEN_EXPIRES";
const KEY_REFRESH_EXPIRES = "STAYLAND_REFRESH_EXPIRES";

function log(msg) {
  console.log("[StayLand] " + msg);
}

if (!MANUAL_TOKEN || !MANUAL_REFRESH_TOKEN) {
  log("MANUAL_TOKEN 或 MANUAL_REFRESH_TOKEN 为空，请先在脚本里填好再运行。");
  $notification.post("StayLand 手动写入失败", "", "请先编辑脚本，填上 token / refreshToken。");
  $done();
} else {
  $persistentStore.write(MANUAL_TOKEN, KEY_TOKEN);
  $persistentStore.write(MANUAL_REFRESH_TOKEN, KEY_REFRESH);
  if (MANUAL_EXPIRES) {
    $persistentStore.write(String(MANUAL_EXPIRES), KEY_EXPIRES);
  }
  if (MANUAL_REFRESH_EXPIRES) {
    $persistentStore.write(String(MANUAL_REFRESH_EXPIRES), KEY_REFRESH_EXPIRES);
  }

  log("已手动写入 token / refreshToken。");
  $notification.post("StayLand 手动写入成功", "", "token / refreshToken 已保存。");
  $done();
}