// StayLand 手动写入 token / refreshToken 脚本
// 用法：改下面 4 个常量，保存到 GitHub，Loon 里点“执行”一次即可。

// ======= 把下面 4 个值改成你自己的 =======
const MANUAL_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NDE3NzkzODQ3Mzc4NjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIxMS8yNS8yMDI1IDE0OjQzOjIwIiwiQ2xpZW50TmFtZSI6IldlQ2hhdE1pbmlQcm9ncmFtIiwiV3hPcGVuZElkIjoib0xIRXg1Y2dCaFNobGkzd1JVYTBOV3ZWRHdWNCIsInJvbGUiOiJNZW1iZXIiLCJuYmYiOjE3NjQwNjM4MDAsImV4cCI6MTc2NDA4MTgwMCwiaWF0IjoxNzY0MDYzODAwLCJpc3MiOiJ5eHVuaXZlcnNlLXdlaGNhdCIsImF1ZCI6Inl4dW5pdmVyc2Utd2VoY2F0In0.3EUYttkyKadidwwLeQ0jlc7WpV6DeJYwB5pB3lBB4Cc";
const MANUAL_REFRESH_TOKEN = "r5FXYbsQwnksFw4qzzto5wRqf0EovKnS3qmYuCUKVsU=";
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