# FlClash 分流覆写

`config-flclash.js` 由 `config-mihomo.yaml` 转换，原文件未修改。

## 已确认的实现途径

核对 FlClash 官方仓库 main 提交 `be84736605527034689c95bf27828ff27d912c5e`（pubspec 版本 0.9.3+2026110401）：

- 订阅扩展支持标准模式和脚本模式；脚本模式调用 JavaScript 的 `main(config)`，返回配置对象。
- 脚本管理支持新建、文件导入和 URL 导入；导入后须在目标订阅的扩展中选中脚本。
- 执行顺序：读取订阅 → 执行脚本 → 应用客户端设置及附加规则 → 交给内核。因此 DNS、TUN 等客户端设置仍可能覆盖脚本结果，附加规则也可能排在脚本规则之前。
- 客户端最终强制 `profile.store-selected = false`，本脚本没有照搬源文件中无法生效的 `true`。

源码：

- [脚本模板](https://github.com/chen08209/FlClash/blob/be84736605527034689c95bf27828ff27d912c5e/lib/common/constant.dart#L199)
- [脚本导入管理](https://github.com/chen08209/FlClash/blob/be84736605527034689c95bf27828ff27d912c5e/lib/views/config/scripts.dart)
- [订阅绑定脚本](https://github.com/chen08209/FlClash/blob/be84736605527034689c95bf27828ff27d912c5e/lib/views/profiles/extend/script.dart)
- [应用配置顺序](https://github.com/chen08209/FlClash/blob/be84736605527034689c95bf27828ff27d912c5e/lib/providers/actions/setup.dart#L502)
- [客户端最终处理](https://github.com/chen08209/FlClash/blob/be84736605527034689c95bf27828ff27d912c5e/lib/common/task.dart#L279)

## 使用

1. 先导入提供节点的正常订阅。
2. 打开该订阅的覆写/扩展，选择「脚本」。
3. 进入脚本管理，使用「文件导入」导入 `config-flclash.js`；也可新建脚本后粘贴完整内容并保存。
4. 返回该订阅扩展，选中导入的脚本，然后应用配置。具体菜单名称以所装版本为准；本说明依据上述 main 源码，未核对用户安装版本。
5. 查看生效配置，确认出现「选择代理」「新加坡自动」「美国自动」「香港自动」「AI服务」，最终规则为 `MATCH,选择代理`。如已有附加规则，应检查其优先级。

## 转换行为

- 保留订阅 `proxies`、`proxy-providers` 及其他未涉及字段。
- 整体替换 `proxy-groups` 和 `rules`；合并 `rule-providers`，同名项由本脚本覆盖。
- 保留地区名称过滤、测速参数、图标、规则 URL 和规则顺序；未匹配地区节点时沿用 `empty-fallback: REJECT`。
- 节点地区按名称判断，并非实际地理位置验证。
- 如果订阅中的节点或 provider 通过 `dialer-proxy` 等字段引用原策略组，整体替换策略组后需要另行调整这些引用。

已用 Node 检查 JavaScript 语法，并验证与源 YAML 的策略组/规则一致、订阅字段保留、同名规则集覆盖、引用完整及重复执行结果一致。尚未在 FlClash 实机加载，也未验证远程规则集下载和所装内核对全部字段的支持。
