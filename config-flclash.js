// FlClash 订阅扩展脚本：由 config-mihomo.yaml 转换。
// 在订阅的覆写/扩展中选择“脚本”，导入并绑定本文件。
// 保留订阅节点和 proxy-providers；替换策略组和 rules，合并 rule-providers。
// 地区按节点名筛选；筛选为空时由 empty-fallback: REJECT 处理。
// FlClash 最终会将 profile.store-selected 设为 false，选择状态由客户端管理。
function main(config) {
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("FlClash 未传入有效的订阅配置对象");
  }
  const overlay = 
{
  "proxy-groups": [
    {
      "name": "选择代理",
      "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
      "type": "select",
      "include-all": true,
      "proxies": [
        "新加坡自动",
        "美国自动",
        "香港自动"
      ]
    },
    {
      "name": "新加坡自动",
      "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)(新加坡|狮城|獅城|singapore|🇸🇬|(^|[^a-z])sg([^a-z]|$))",
      "empty-fallback": "REJECT",
      "url": "https://cp.cloudflare.com/generate_204",
      "interval": 300,
      "tolerance": 50,
      "lazy": true
    },
    {
      "name": "美国自动",
      "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)(美国|美國|united[ _-]?states|america|🇺🇸|🇺🇲|(^|[^a-z])us([^a-z]|$)|洛杉矶|洛杉磯|圣何塞|聖何塞|西雅图|西雅圖|硅谷|矽谷)",
      "empty-fallback": "REJECT",
      "url": "https://cp.cloudflare.com/generate_204",
      "interval": 300,
      "tolerance": 50,
      "lazy": true
    },
    {
      "name": "香港自动",
      "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png",
      "type": "url-test",
      "include-all": true,
      "filter": "(?i)(香港|hong[ _-]?kong|🇭🇰|(^|[^a-z])hk([^a-z]|$))",
      "empty-fallback": "REJECT",
      "url": "https://cp.cloudflare.com/generate_204",
      "interval": 300,
      "tolerance": 50,
      "lazy": true
    },
    {
      "name": "AI服务",
      "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png",
      "type": "select",
      "include-all": true,
      "filter": "(?i)(新加坡|狮城|獅城|singapore|🇸🇬|(^|[^a-z])sg([^a-z]|$)|美国|美國|united[ _-]?states|america|🇺🇸|🇺🇲|(^|[^a-z])us([^a-z]|$)|洛杉矶|洛杉磯|圣何塞|聖何塞|西雅图|西雅圖|硅谷|矽谷)",
      "empty-fallback": "REJECT",
      "proxies": [
        "美国自动",
        "新加坡自动",
        "REJECT"
      ]
    }
  ],
  "rule-providers": {
    "AIProxy": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "url": "https://cdn.jsdelivr.net/gh/VPSDance/ai-proxy-rules@main/rules/clash/global.yaml",
      "path": "./ruleset/AIProxy-global.yaml",
      "interval": 86400
    },
    "reject": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      "path": "./ruleset/reject.yaml",
      "interval": 86400
    },
    "adobe": {
      "type": "http",
      "behavior": "domain",
      "url": "https://raw.githubusercontent.com/Timor88/Config-files/refs/heads/main/adobe.txt",
      "path": "./ruleset/adobe.yaml",
      "interval": 86400
    },
    "icloud": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
      "path": "./ruleset/icloud.yaml",
      "interval": 86400
    },
    "apple": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
      "path": "./ruleset/apple.yaml",
      "interval": 86400
    },
    "google": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
      "path": "./ruleset/google.yaml",
      "interval": 86400
    },
    "proxy": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      "path": "./ruleset/proxy.yaml",
      "interval": 86400
    },
    "direct": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      "path": "./ruleset/direct.yaml",
      "interval": 86400
    },
    "private": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
      "path": "./ruleset/private.yaml",
      "interval": 86400
    },
    "gfw": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      "path": "./ruleset/gfw.yaml",
      "interval": 86400
    },
    "tld-not-cn": {
      "type": "http",
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
      "path": "./ruleset/tld-not-cn.yaml",
      "interval": 86400
    },
    "telegramcidr": {
      "type": "http",
      "behavior": "ipcidr",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      "path": "./ruleset/telegramcidr.yaml",
      "interval": 86400
    },
    "cncidr": {
      "type": "http",
      "behavior": "ipcidr",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      "path": "./ruleset/cncidr.yaml",
      "interval": 86400
    },
    "lancidr": {
      "type": "http",
      "behavior": "ipcidr",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
      "path": "./ruleset/lancidr.yaml",
      "interval": 86400
    },
    "applications": {
      "type": "http",
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      "path": "./ruleset/applications.yaml",
      "interval": 86400
    }
  },
  "rules": [
    "RULE-SET,applications,DIRECT",
    "DOMAIN,clash.razord.top,DIRECT",
    "DOMAIN,yacd.haishan.me,DIRECT",
    "RULE-SET,adobe,REJECT",
    "RULE-SET,private,DIRECT",
    "RULE-SET,reject,REJECT",
    "RULE-SET,icloud,DIRECT",
    "RULE-SET,apple,DIRECT",
    "RULE-SET,AIProxy,AI服务",
    "RULE-SET,google,选择代理",
    "RULE-SET,proxy,选择代理",
    "RULE-SET,direct,DIRECT",
    "RULE-SET,lancidr,DIRECT",
    "RULE-SET,cncidr,DIRECT",
    "RULE-SET,telegramcidr,选择代理",
    "GEOIP,LAN,DIRECT",
    "GEOIP,CN,DIRECT",
    "RULE-SET,gfw,选择代理",
    "RULE-SET,tld-not-cn,选择代理",
    "MATCH,选择代理"
  ]
};
  config["proxy-groups"] = overlay["proxy-groups"];
  config["rule-providers"] = Object.assign({}, config["rule-providers"] || {}, overlay["rule-providers"]);
  config.rules = overlay.rules;
  return config;
}
