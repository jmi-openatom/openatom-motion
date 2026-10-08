# JMI-OPENATOM · From Code to Community

江苏海事职业技术学院 · 开放原子开源社团品牌动画。

当前主版本：**82.5 秒 · 1920×1080 · 原生 60fps · 128 BPM**。主视觉采用纸白、墨黑、电光蓝；重切字体、弹性字形、贴纸标签、分片转场、三维原子和校园实景共同构成品牌动效。

品牌口号：**开源筑梦，海事启航**。中文为主，Git 高潮段保留英文。

![完整版结尾：JMI-OPENATOM 新 Logo 与品牌口号](docs/brand-outro.png)

完整成片可从 [GitHub Releases](https://github.com/jmi-openatom/openatom-motion/releases/latest) 下载。

## 预览与导出

```bash
git clone git@github.com:jmi-openatom/openatom-motion.git
cd openatom-motion
npm ci
npm run start
npm run render:film
```

完整版预览：<http://localhost:3000/JMI-BRAND-FILM>

- `npm run render:film`：1080p60，输出 `out/jmi-openatom-brand-film.mp4`。
- `npm run render:preview`：960×540、60fps 预览。
- `npm run render:brand`：保留已确认的 15 秒、30fps 风格样片。
- `npm run typecheck`：TypeScript 检查。
- `npm run verify`：验证文字/创意提示帧与实际音轨生成器记录的重音起始帧。
- `npm run stills`：导出拍点及拍间变形关键帧。

ANGLE 用于 WebGL 渲染。所有动画由帧号驱动，支持跳帧与并行渲染。

## 技术栈

视频通过 React 组件描述每一帧，由 Remotion 在 Chromium 中渲染，再编码为 MP4。二维文字与图形、三维原子、校园照片和原创音乐共同组成完整时间线；ImageGen 用于生成部分图片素材与封面主视觉。

| 层次 | 技术 | 在项目中的用途 |
| --- | --- | --- |
| 视频框架 | Remotion 4.0.532 | 注册 Composition、读取当前帧、组织画面与音频、Studio 预览、逐帧导出 |
| 组件与类型 | React 19.3.0、TypeScript 5.9.3 | 编写镜头、文字与图形组件，检查参数及时间线类型 |
| 二维画面 | SVG、CSS、CSS Transform / clip-path | 绘制轨道、节点、波浪、帆船、网格与遮罩，控制排版、位移、缩放和揭示动画 |
| 三维画面 | Three.js 0.186.1、React Three Fiber 9.8.1、@remotion/three | 渲染原子雕塑、金属与陶瓷材质、灯光、环境反射和相机；历史方案还包含代码隧道与设备场景 |
| 动效编排 | 自研 TypeScript 节拍与运动函数 | 从输出帧计算拍点，编排短距离飞入飞出、曲线路径、弹性收势、逐字形变和转场 |
| 时间线数据 | JSON + full-timeline.ts / sync.ts | 统一保存 128 BPM、176 拍、段落边界和文字提示，映射至原生 60fps 输出帧 |
| 字体与素材 | @remotion/fonts、Inter、Noto Sans SC、Remotion Img / staticFile | 等待字体加载，使用本地图片和原始 SVG Logo，保持中文排版与图标准确 |
| 图片生成 | OpenAI ImageGen | 生成透明底原子封面主视觉与历史探索图片，文字和正式 Logo 通过代码排版 |
| 原创音频 | Python、NumPy、wave；另保留 JavaScript 生成脚本 | 合成鼓点、贝斯、旋律、氛围与音效，按视觉提示的帧号写入 WAV |
| 渲染与编码 | @remotion/bundler、@remotion/renderer、Chromium / ANGLE、FFmpeg | 打包项目、渲染关键帧与整片、编码 H.264 / AAC / yuv420p；历史三维方案使用 @remotion/motion-blur |
| 验证 | tsc、Node.js 同步脚本、FFprobe、Python / NumPy | 检查类型、拍点边界、分辨率、帧率、帧数、时长，并以互相关检查编码后的音频偏移 |
| 开发与发布 | Node.js、npm、Git、GitHub Releases | 安装锁定依赖、运行预览与导出、版本管理、发布源码和 MP4；项目代码采用 MIT 许可 |

本次制作使用 Node.js 24。Python / NumPy 用于重新生成音乐和运行导出校验；已有 WAV 随源码提供，常规预览与渲染使用 npm 即可。

工作流程：**创作提示词 → 分镜与节拍表 → React / TypeScript 镜头组件 → SVG / Three.js / 图片素材 → 原创音轨 → Remotion 逐帧渲染 → MP4 与同步校验 → GitHub 发布**。

## 时间线

176 拍，4950 帧，82.5 秒。段落与音轨共同读取 `src/brand/full-score.json`。

| 时间 | 镜头 |
| --- | --- |
| 0–8.44s | CODE / OPEN 弹性大字、符号变原子、中文创造宣言 |
| 8.44–15.94s | Web / Server / AI / OpenHarmony |
| 15.94–27.19s | 社团系统图形变形；构建、测试、部署、上线 |
| 27.19–34.69s | 想法分叉、协作合并，让灵感汇成贡献 |
| 34.69–44.06s | 校园实景与音乐留白 |
| 44.06–51.56s | 代码折成帆船，开源筑梦、海事启航 |
| 51.56–59.06s | 学习、创造、分享、贡献；个人节点汇成社区 |
| 59.06–66.56s | 英文 Git 词汇、大字形变、颜色切换与节奏加速 |
| 66.56–74.06s | 中文开源宣言、波浪字形与分片退场 |
| 74.06–82.50s | 中文主题、扩展蓝色圆、Logo、slogan 和品牌定格 |

文字采用短距离位移、遮罩揭示、淡出交接与轻微收势。落点后保持清晰阅读姿态；移除持续波浪、夸张挤压、翻折与循环回弹。英文高潮保留拍点，但蓝、黑、纸白按段落切换，减少频繁闪变。

音轨为程序生成的原创节奏、旋律和音效，未采样参考视频音频。使用 Python + numpy 运行 `scripts/generate-brand-film-score.py` 可重新生成。WAV 已保存在 `public/audio/brand-film.wav`，预览和导出不依赖 Python。

`out/audio-onsets.json` 记录生成器真正写入的音效起始采样，`out/beat-sync.json` 记录视觉边界校验。数学同步检查不能替代带声音的连续播放审看。

## 素材与来源

参考用户提供的两段视频的节奏、文字变形及剪辑语言；成片的文案、图形、字体排版、帆船和音乐由本项目实现。

优先读取 `public/activities/` 图片，随后读取 `public/campus/`。当前活动目录没有活动实景照片，片中使用已有校园照片。项目模块、设备和 AI 跟踪为视觉设计演示。

完整版结尾 Logo：`public/logo/jmi-openatom-outro-white.svg`，来自用户提供的 JMI-OPENATOM Logo 素材包，使用白色透明底的齿轮、协作节点与海浪图标。原始矢量路径直接用于渲染，沿用结尾的蓝色背景与入场节奏。历史样片和封面使用的旧 Logo 保存在 `public/logo/jmi-openatom.png`。字体：Inter / Noto Sans SC，许可证保存在 `public/fonts/`。

## 主要实现

- `src/brand/BrandFilm.tsx`：完整版编排。
- `src/brand/full-score.json`、`sync.ts`：共享拍点与原生输出帧时钟。
- `src/brand/FlyingType.tsx`：曲线飞入飞出、翻折、遮罩。
- `src/brand/ElasticLetters.tsx`：逐字弹性变形与描边显露。
- `src/brand/MotionLanguage.tsx`：贴纸、网格、旋转星芒、字体叠影、分片快门。
- `src/brand/Imagination.tsx`：贡献与启航新增镜头。
- `src/brand/People.tsx`：校园、社区、英文高潮与中文宣言。
- `src/brand/BrandOutro.tsx`：连续品牌收尾。

`JMI-OPENATOM` 保留前期三维隧道方案；`JMI-BRAND-STUDY` 保留 15 秒风格样片。历史导出保存在 `out/`，最早版本源码保存在 `out/legacy-source-before-rebuild.zip`。

## 发布素材

`npm run covers` 导出 1080×1920 竖版封面和 1920×1080 横版封面。封面主视觉由内置 ImageGen 生成，文字、Logo 及配色由 Remotion 确定性排版。成品和抖音文案位于本地 `out/social/`；生成提示词见下方[视频创作提示词汇总](#视频创作提示词汇总)。

## 视频创作提示词汇总

以下根据原始创作需求、两次参考视频反馈、历次修改要求与项目中保存的图片提示词整理。总提示词和分项提示词是可复用的归纳版本；图片提示词原文单独保留。初始方案采用约 60–75 秒、30fps 的三维科技片，经过样片与多轮调整，最终确定为 **82.5 秒、60fps、音乐卡点驱动的品牌动画**。

### 1. 最终成片总提示词

```text
你是一名 Motion Designer、Creative Director、Cinematic Editor 和 Remotion Engineer。
请使用 Remotion、React、TypeScript、SVG 与适量 Three.js，制作一条可预览、可导出的
高校开源社团品牌动画。主题为江苏海事职业技术学院 · 开放原子开源社团，
英文品牌为 JMI-OPENATOM。

输出 1920×1080、16:9、原生 60fps、82.5 秒的 MP4。
围绕 128 BPM、176 拍组织音乐、镜头、文字与转场，视觉落点和音效重音准确对齐。
先确认短样片的风格，再扩展完整分镜，并检查带声音的连续播放效果。

整体采用纸白 #f1f0eb、墨黑 #101113、电光蓝 #1254ff。
以留白、大字重切、几何图形、原子轨道与短句形成现代、精致的品牌语言。
增加生动的文字飞入飞出、遮罩揭示、轻微形变和有重量的收势；动画克制，
到达拍点后让文字稳定可读，避免持续抖动、夸张挤压、循环回弹和频繁闪变。

内容包含代码与开源、Web、Server、AI、OpenHarmony、社团系统、构建发布、
校园、贡献、社区，以及“灵感汇成贡献”“代码折成帆船启航”的创意镜头。
后半段以中文为主，Git、commit、merge、build 等技术词汇适当保留英文。
活动段优先使用真实照片；目前使用项目已有的校园照片。

音乐使用原创节奏、贝斯、旋律、氛围与动作音效。
重切、文字落点、图形变化与转场由音乐推动，快段有冲击，慢段有呼吸。
参考视频提供节奏、文字变形与镜头衔接方向，成片使用本项目自己的文案和素材。

结尾从“从一行代码，到一个真正的开源社区”自然连续过渡：
标点扩展成蓝色背景，新版白色透明底 Logo、品牌标题与口号依次落定。
使用提供的齿轮、协作节点、海浪 SVG，保持原始轮廓与比例。
标题显示为 JMI - OPENATOM，短横线与两侧文字留出清晰间距。
加入“开源筑梦，海事启航”，展示学校、社团名称、官网与 GitHub 地址，最后淡出。

直接完成可运行项目、关键帧预览、完整视频导出与验证，并以 MIT 许可开源。
```

### 2. 分镜提示词

| 段落 | 提示词摘要 |
| --- | --- |
| 代码与开源开场 | 从光标和 CODE / OPEN 大字切入，用字符、尖括号和原子轨道完成图形转换；文字在重音上落定，迅速建立品牌节奏。 |
| 创造宣言 | 将“不止学习、动手创造”的短句与简洁图形结合，用短位移、遮罩和轻微收势增强动作感。 |
| 技术展示 | 依次表达 Web、Server、AI、OpenHarmony，通过浏览器、服务器、识别框、手机与技术词汇做节拍化图形转换。 |
| 社团系统 | 将成员、活动、项目、抽奖、表单、统计组织成关联的系统图形，让模块与数据流连续演化。 |
| 构建发布 | 跟随一次提交，经过 BUILD、TEST、DEPLOY、ONLINE，以拍点和动作音效表达从代码到上线的过程。 |
| 灵感与贡献 | 想法分叉、个人节点出现、协作线合并，最终汇成共同贡献；突出“灵感汇成贡献”。 |
| 校园与留白 | 使用已有真实校园照片，放慢镜头和节奏，给予照片与观众阅读空间，形成音乐呼吸段。 |
| 帆船启航 | 把代码与字符折成帆船，用海浪和航行动势连接“开源筑梦，海事启航”，延长内容并加入想象力。 |
| 社区 | 将学习、创造、分享、贡献的短句与个人节点连接起来，逐步汇成社区。 |
| Git 高潮 | 保留英文 Git 词汇与快速文字落点，适度增强形变、图形重切和节奏加速，控制背景颜色切换频率。 |
| 中文宣言 | 用中文短句表达学习、创造、贡献与归属，采用清晰的大字和连续的分片退场。 |
| 品牌收尾 | 中文主题转为扩展蓝色圆，Logo、JMI - OPENATOM、口号、学校与网址逐层呈现，保持转场连续和阅读清晰。 |

### 3. 视觉、运动与音乐提示词

```text
视觉：现代科技品牌动画；纸白、墨黑、电光蓝；大字、留白、原子轨道、节点、
网格、少量贴纸与分片转场；三维原子使用干净的棚拍光线和细腻材质。

运动：以音乐拍点组织动作；文字短距离飞入飞出；曲线与弧线路径；遮罩揭示；
适度弹性、惯性和收势；大小不同的物体具有不同重量；落点后保持稳定可读。
加强动效与文字变形时保持整体克制，移除反复波浪、翻折和持续挤压。

音乐：原创 128 BPM；由鼓点、贝斯、旋律和氛围组成；按乐句安排快段、留白和高潮。
Kick 强调重落点，Snare 强调文字切换，细节音效对应具体动作与转场。
为文字和创意提示记录实际音效起始帧，检查原生 60fps 与编码音轨的同步。

文案：中文为主、句子短；Git 与开发术语保留必要英文；突出“从一行代码，
到一个真正的开源社区”和“开源筑梦，海事启航”。

交付：提供可运行源码、短样片、完整 MP4、关键帧、横竖版封面与抖音文案。
```

### 4. 历次修改提示词

这些反馈决定了从初始探索到最终成片的方向，按创作顺序归纳：

| 阶段 | 原始反馈或要求 | 落实方向 |
| --- | --- | --- |
| 重构 | “你直接推倒重来” | 重做镜头与动效结构。 |
| 风格确认 | “我想要的是那种卡点，品牌动画高级”“参考这个” | 根据参考视频制作 15 秒风格样片，确认后扩展完整片。 |
| 生动程度 | “有些页面过于死板不够生动” | 增加图形演化、文字动作与连续转场。 |
| 语言 | “后面大片英文改成中文适当保留一些英文” | 后半段中文主导，保留必要技术词汇。 |
| Git 与结尾 | “这一块保留英文，然后结尾过度不够自然” | 保留 Git 高潮英文，改为连续的蓝色圆扩展收尾。 |
| 口号与帧率 | “加上开源筑梦，海事启航的 slogan”“增加到 60fps” | 加入品牌口号，使用原生 60fps 时间轴。 |
| 同步 | “卡点有点问题没对齐”“这里文字没卡上点” | 对齐文字落点与真实音效起始帧，并校验导出音轨。 |
| 文字运动 | “文字太生硬了加点动画飞入飞出之类的” | 加入曲线飞入飞出、遮罩与轻微形变。 |
| 创意扩展 | “你可以延长发挥一下你的想象力” | 增加灵感贡献和帆船启航段，扩展至 82.5 秒。 |
| 动效探索 | “参考这个视频，强化我的动效”“用你自己的思路强化动效，文字变形” | 探索弹性字形、贴纸、网格、叠影与分片转场。 |
| 最终收敛 | “文字动画克制一点高级一点” | 减少持续形变与夸张回弹，保留阅读稳定性和轻微收势。 |
| 社交发布 | “导出吧，然后给我一个抖音文案和视频封面” | 制作完整成片、抖音文案、1080×1920 与 1920×1080 封面。 |
| 新 Logo | “把视频最后的 logo 换成这个” | 使用提供的白色透明底矢量图标。 |
| 标题间距 | “这个 - 能不能不要连一起” | 将结尾长破折号改为独立短横线，两侧留出间距。 |
| 开源与记录 | 推送 GitHub、使用 MIT、汇总提示词和技术栈 | 发布完整项目，并在 README 保存制作方法与可复用提示词。 |

### 5. 封面主视觉的图片生成提示词原文

用途：生成 `public/generated/cover-atom-v8.png`。横竖封面的中文、网址与正式 Logo 由 `BrandCover.tsx` 排版。

```text
Use case: stylized-concept. Asset type: a transparent-background sculptural hero asset
for an elegant Chinese university open-source community brand film cover.
Generate ONE isolated three-dimensional atom sculpture, centered and fully visible,
on genuinely transparent alpha background. Three smooth elongated elliptical orbital
bands intersect around a single small silver sphere. It is an abstract mathematical
atom, not a scientific literal diagram and not an existing corporate logo.
Refined brushed silver and warm off-white ceramic surfaces, with small electric
cobalt blue #1254ff accents on the ends of two bands, subtle blue reflected light.
Beautiful restrained studio lighting, sophisticated editorial product sculpture,
smooth curves, tactile restrained metal, no excessive neon or glow, no cyberpunk,
no text, no characters, no symbols or badges, no background, no floor, no frame,
no watermark. Three-quarter view with a slightly tilted fluid pose, clear silhouette,
a small amount of negative space around every edge, crisp 3D rendering.
The sculpture must read immediately at thumbnail scale, single cohesive object
rather than busy intersecting machinery.
```

封面排版提示词摘要：以电光蓝底色、纸白大字和原子雕塑为主视觉，突出“开源筑梦 / 海事启航”，使用项目已有字体，保留品牌与网址信息；分别导出 1080×1920 竖版和 1920×1080 横版，保证缩略图中的文字与主体清晰。

抖音文案提示词摘要：围绕“开源筑梦，海事启航”和“从一行代码，到一个真正的开源社区”，用中文介绍学习、创造、分享、贡献及社团品牌片，配套生成发布文案与封面。

### 6. 历史探索提示词

<details>
<summary>展开：初始三维科技片的完整方向摘要</summary>

```text
角色：Motion Designer + Creative Director + VFX Artist + Cinematic Editor + Remotion Engineer。
为江苏海事职业技术学院开放原子开源社团制作约 60–75 秒、1080p、30fps 的科技品牌片。
使用 Remotion、React、TypeScript、Three.js、React Three Fiber、Canvas、SVG 和 WebGL。

关键词：FAST、CINEMATIC、DYNAMIC、PREMIUM、TECH、3D、DEPTH、MOTION、
OPEN SOURCE、CODE、COMMUNITY、ENERGY。
参考科技品牌片、开发者大会开场与高级 Motion Graphics 的镜头语言。
避免 PPT、网页 Banner、Hero Section、卡片轮播、项目列表和一页一个标题的结构。
将段落理解为 Camera Sequence，核心优先级为：MOTION > STATIC DESIGN、
CAMERA > LAYOUT、MUSIC > FIXED TIMING、CONTINUITY > PAGE STRUCTURE。

连续世界：Terminal → Code Particles → Code Tunnel → Digital Network → Logo →
Git / Web / Server / AI / OpenHarmony → Project World → Real Activity →
Community Network → Open Source → Final Logo。

开场以终端光标、快速 git clone 和构建输出引出第一次音乐 Drop；代码字符产生空间深度。
代码隧道采用 S Curve、Bezier、Spline 相机路径，并加入 yaw、pitch、roll 与近距离掠过。
前、中、后景分别承担碎片、核心内容、网格与网络环境，形成视差与深度。
粒子通过 Orbit → Spiral → Attractor 聚合 Logo，镜头绕行后继续穿过品牌字形。

技术蒙太奇按 1 拍、半拍和音乐重音组织；浏览器沿弧线进入，服务器数据沿曲线流动，
AI 检测框跟踪与锁定目标，手机与相机反向运动形成视差。
项目段表达社团系统与构建发布，提交经过 BUILD、TEST、DEPLOY、ONLINE。
音乐 Break 时转入校园与真实活动照片，以慢速漂浮和深度表达记忆。
照片和个人逐步变成节点，连接为学习、创造、分享、贡献的社区网络。
第二次 Build 加速 Git 提交与粒子运动，最终 Drop 将节点螺旋吸引并形成品牌。

短句主题：WE DON'T JUST LEARN OPEN SOURCE / WE BUILD WITH IT /
WE CONTRIBUTE TO IT / WE ARE PART OF IT；最终主题 FROM CODE TO COMMUNITY。
中文表达：从一行代码，到一个真正的开源社区。

运动具有加速、惯性、重量、轻微过冲与稳定收势；优先使用 Bezier、Spline、Arc、
S Curve、Spiral、Orbit、Helix 等路径，快转弯加入 Camera Banking，拖尾保持短促。
转场采用 Morph、Match Cut、Camera Pass Through、Whip Pan、Object Wipe、
Zoom、Particle、Glitch 与 Mask，维持运动方向与空间连续性。

音乐主导时间线：以 BPM、拍点、乐句、Build、Drop、Break 和能量组织镜头。
Kick、Snare、Hi-Hat、Bass、Melody 分层触发不同尺度的动作；音效强调具体行为。
每 4 / 8 / 16 拍安排视觉事件，使用统一 timeline 保存段落与能量。
控制 Bloom、Fog、Noise、Film Grain、Vignette、RGB Split 和 Depth Blur 的强度。
如提供真实音乐，先分析 BPM、Beat、Phrase、Build、Drop、Break 与 Energy，
再让镜头和场景适配音乐。早期结尾要求高潮后短暂静音与纯黑，再以低频 BOOM
呈现 Logo、学校、社团与网址，轻微呼吸发光后淡出。
核心素材为本地 Logo、校园、活动、项目图片与音轨；完整交付可运行项目和 MP4。
```

此为早期探索要求。当前成片采用上面的最终品牌动画提示词，帧率、时长、配色、文案与动效强度均经过后续反馈调整。

</details>

<details>
<summary>展开：历史像素素材的五组图片提示词摘要</summary>

早期像素素材的五组英文完整提示词保存在 [docs/image-prompts.md](docs/image-prompts.md)。共同要求为：16-bit 像素风格、规则像素网格、清晰阶梯轮廓、有限色板与有意抖色；使用深蓝黑、亮蓝、青色、冰白及少量橙色；保持一致的像素尺寸与光照，预留文字区域。

| 素材 | 提示词摘要 |
| --- | --- |
| brand-emblem | 参考原海事锚与原子标志，保留锚、开源钥匙孔、轨道、电子、海浪与侧边节点，重绘为蓝青色透明底像素徽章。 |
| campus-world | 绘制夜晚海事校园与港湾，包括教学导航塔、低层建筑、玻璃图书馆、树木与水面反光；主体在右侧和下方，左侧留白。 |
| technology-world | 绘制学生开源创客实验室，将笔记本、手机、服务器与节点网络组织在同一像素环境，设备屏幕留空，左侧预留标题区域。 |
| community-world | 参考戴圆框眼镜、蓝白卫衣与背包的人物，绘制主角和同伴围绕电脑协作的创客场景，保留共同的品牌色与人物特征。 |
| future-world | 绘制第一人称高速前进的数字走廊，原子形拱门、青色数据轨道、网格地面与发光入口汇聚出透视和速度感。 |

这些图片属于历史探索资产；当前完整品牌动画的主要画面由镜头组件、矢量图形、三维原子和真实校园照片组成。

</details>

## 开源许可

项目使用 [MIT License](LICENSE)。第三方字体保留各自的 SIL Open Font License，详情见 `public/fonts/` 中的许可证文件。
