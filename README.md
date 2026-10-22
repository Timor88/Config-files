# Config-files

个人使用的代理配置、规则列表与脚本合集。部分内容整理自网络，来源见配置内链接及文末说明。

## 文件索引

| 文件 | 用途 | 说明 |
| --- | --- | --- |
| [config-mihomo.yaml](config-mihomo.yaml) | Clash Verge / Mihomo 全局扩展覆写配置 | 当前主要维护的覆写配置，含地区自动选择、AI 手动选择及分流规则 |
| [user.yaml](user.yaml) | 基础全局扩展覆写配置 | 较早的精简版本，不含地区分组和独立 AI 分流 |
| [example.yaml](example.yaml) | 覆写示例 | 历史参考文件，使用前需自行检查和调整 |
| [Clash.yaml](Clash.yaml) | Clash / Mihomo 配置参考 | 含 Sub-Store 代理集合示例，需替换订阅地址并检查本机参数 |
| [adobe.txt](adobe.txt) | 域名拦截规则 | YAML `payload` 格式，包含 Adobe 与 Parallels 域名 |
| [BlockList](BlockList) | uBlacklist 规则 | 用于过滤搜索结果 |
| [李跳跳](%E6%9D%8E%E8%B7%B3%E8%B7%B3) | 李跳跳规则 | 按对应应用的导入方式使用 |
| [test_channels.m3u](test_channels.m3u) | IPTV 播放列表 | 频道可用性未知，使用前自行测试 |
| [docker.sh](docker.sh) | TRSS Yunzai Docker 安装脚本 | 使用前检查脚本中的目录、镜像及下载地址 |
| [stayland_capture.js](stayland_capture.js)、[stayland_manual_set.js](stayland_manual_set.js)、[stayland_show_token.js](stayland_show_token.js)、[stayland_signin.js](stayland_signin.js) | Stayland 小程序相关 Loon 脚本 | 历史归档，原签到功能已失效 |

## Clash Verge 全局覆写

### 使用方式

1. 在 Clash Verge 中导入自己的 Clash / Mihomo 订阅；可使用 Sub-Store 管理订阅。
2. 打开订阅页的“全局扩展覆写配置”，将 [config-mihomo.yaml](config-mihomo.yaml) 的内容完整粘贴并保存。
3. 重新激活当前订阅，检查生成的运行配置和日志，确认规则源加载成功。
4. 在代理页选择常规出口，并为“AI服务”选择合适的节点或地区自动组。

[查看覆写文件原文](https://raw.githubusercontent.com/Timor88/Config-files/main/config-mihomo.yaml)

**`config-mihomo.yaml` 是覆写片段，需要原订阅提供节点或代理集合，不能作为带节点的独立订阅使用。** 文件名沿用历史命名，当前用途以本说明为准。

`proxy-groups` 和 `rules` 列表会整体替换订阅中的对应列表，而非追加。若需要保留订阅专属策略组或规则，请先合并调整；订阅扩展和扩展脚本也可能影响最终结果。

端口、TUN 开关、运行模式等在 Clash Verge 界面设置。此覆写文件不单独配置 DNS 或 TUN，实际行为取决于订阅、应用设置及其他扩展，以最终运行配置为准。

### 策略组

| 分组 | 类型 | 可选择的出口 |
| --- | --- | --- |
| 选择代理 | 手动选择 | 全部订阅节点，以及新加坡、美国、香港三个自动组 |
| 新加坡自动 | 自动选择 | 名称匹配新加坡的节点 |
| 美国自动 | 自动选择 | 名称匹配美国的节点 |
| 香港自动 | 自动选择 | 名称匹配香港的节点 |
| AI服务 | 手动选择 | 仅美国、新加坡节点，以及“美国自动”“新加坡自动”两个组 |

- 五个分组均配置 Qure 图标，需要能够访问图标地址。
- 地区自动组使用 Cloudflare 检测地址，每 300 秒测速，切换容差为 50ms，启用懒惰测速。
- 地区识别依据节点名称中的中文、英文、代码或旗帜，不代表服务器的真实地理位置；订阅命名变化时可能需要调整筛选表达式。
- 地区自动组无匹配节点时使用 `REJECT`，避免意外直连。
- “AI服务”可选具体节点以保持出口相对稳定，也可选地区自动组；测速成功不代表目标 AI 服务可用。
- 已开启策略选择保存，重新加载后可能沿用之前选中的出口。

### 分流行为

规则从上到下匹配，先命中的规则决定出口：

1. 应用直连规则与两个历史面板域名直连。
2. Adobe / Parallels 域名拦截、私有域名直连及广告拦截。
3. iCloud、Apple 规则直连。
4. AI 规则进入“AI服务”。
5. Google 与通用代理规则进入“选择代理”。
6. 通用直连规则、局域网与国内 IP 直连；Telegram IP 走代理。
7. `gfw`、`tld-not-cn` 进入“选择代理”，未匹配流量最终也进入“选择代理”。

`gfw`、`tld-not-cn` 位于国内直连规则之后，保留前面的直连优先级。由于它们与最终兜底使用相同出口，当前主要用于明确规则匹配来源。

### AI 规则源

使用 [VPSDance/ai-proxy-rules](https://github.com/VPSDance/ai-proxy-rules) 的 [global.yaml](https://cdn.jsdelivr.net/gh/VPSDance/ai-proxy-rules@main/rules/clash/global.yaml)：

```yaml
rule-providers:
  AIProxy:
    type: http
    behavior: classical
    format: yaml
    url: https://cdn.jsdelivr.net/gh/VPSDance/ai-proxy-rules@main/rules/clash/global.yaml
    path: ./ruleset/AIProxy-global.yaml
    interval: 86400

rules:
  - RULE-SET,AIProxy,AI服务
```

以上仅展示接入方式，完整规则及顺序以 `config-mihomo.yaml` 为准。规则源每 24 小时更新，内容与数量可能随上游变化。

该规则集包含域名、进程名、IP 和 ASN 规则，部分应用或共享基础设施流量也可能进入 AI 组。前面的应用直连、广告和 Adobe 拦截仍然优先。例如 Adobe Firefly 域名会先命中 Adobe 拦截，若需使用，应自行增加精确例外或调整拦截范围。

## 使用与维护说明

- 先备份原配置，再应用修改。检查 YAML 格式及 Mihomo 配置校验结果，并查看实际连接命中的规则。
- 远程规则或图标加载失败时，检查下载日志、网络连通性和规则优先级；本地缓存可用不代表远程更新成功。
- 不要将订阅链接、Token、密码或其他个人凭据提交到公开仓库。
- IPTV、历史示例和归档脚本不保证持续可用，仓库中的文件也不代表适用于所有客户端版本和网络环境。

## 来源与致谢

- [Loyalsoldier/clash-rules](https://github.com/Loyalsoldier/clash-rules)：主要分流规则源。
- [VPSDance/ai-proxy-rules](https://github.com/VPSDance/ai-proxy-rules)：AI 聚合规则源。
- [Koolson/Qure](https://github.com/Koolson/Qure)：策略组图标。
- [Clash Verge Rev 文档](https://www.clashverge.dev/guide/extend.html)：扩展配置合并与设置优先级说明。
- [Mihomo 文档](https://wiki.metacubex.one/)：配置格式与规则说明。

其他规则和脚本的作者信息以文件内声明为准，请遵守各上游项目的许可与使用要求。如有署名或内容问题，欢迎通过本仓库 Issues 联系。
