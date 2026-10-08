# 品牌卡点样片 · 15 秒

用户提供的 64 秒视频包含多种示范风格。本样片主要参考其中的文字重切（约 10 / 18 / 26 秒）、产品展示（约 19–21 秒）、干净材质与灯光（约 47–49 秒）。参考原片未被嵌入成片，音轨也未被采样。

## 预览与导出

- `npm run start` 后打开 `http://localhost:3000/JMI-BRAND-STUDY`
- `npm run render:brand` 导出 `out/jmi-brand-study.mp4`
- 1920 × 1080，30 FPS，450 帧，15 秒。
- 旧的 75 秒片仍在 `JMI-OPENATOM` 中，便于比较。新风格尚未扩展成整条宣传片。

## 节奏

原创 128 BPM 音轨，32 拍。代码、轨道、实体原子、短句、社区节点、动词、主题与品牌定格以统一拍点组织。重音、三维展示的音乐留白和最终定格前的短暂呼吸均在音轨内。

| 拍点 | 画面 |
| --- | --- |
| 0–4 | 光标 → CODE / OPEN |
| 4–8 | 尖括号 → 原子轨道 → 圆形遮罩 |
| 8–14 | 金属与蓝色实体轨道，棚拍照明 |
| 14–18 | 不止学习 / 动手创造 |
| 18–22 | 一个贡献 → 社区节点 |
| 22–26 | BUILD / SHARE / CONTRIBUTE / BELONG |
| 26–29 | FROM CODE TO COMMUNITY |
| 29–32 | JMI-OPENATOM 品牌定格 |

## 文件

- `src/brand/BrandStudy.tsx`：字体、形态与遮罩编排。
- `src/brand/AtomSculpture.tsx`：实体原子、材质、环境反射和相机。
- `src/brand/rhythm.ts`：共享节拍与段落。
- `public/audio/brand-study.wav`：已生成的原创音轨，运行项目不需要 Python。
- `scripts/generate-brand-score.py`：音轨生成源，需要 Python / numpy。

字体采用 Inter、Noto Sans SC，许可文件在 `public/fonts/`。Logo 使用已有素材的白色单色版本。
