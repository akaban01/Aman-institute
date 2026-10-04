# Fonts

Self-hosted so the site makes no requests to third-party font services.
Latin subsets of variable fonts, taken from [Fontsource](https://fontsource.org).

| File | Font | Used for | License |
| --- | --- | --- | --- |
| `inter-latin-wght-normal.woff2` | [Inter](https://github.com/rsms/inter), Copyright 2016 The Inter Project Authors | Body text | SIL Open Font License 1.1 |
| `plus-jakarta-sans-latin-wght-normal.woff2` | [Plus Jakarta Sans](https://github.com/tokotype/PlusJakartaSans), Copyright 2020 The Plus Jakarta Sans Project Authors | Headings | SIL Open Font License 1.1 |
| `reem-kufi-aman-700.woff2` | [Reem Kufi](https://github.com/aliftype/reem-kufi) Bold, Copyright 2015–2022 The Reem Kufi Project Authors | The decorative Arabic word أمان | SIL Open Font License 1.1 |

`reem-kufi-aman-700.woff2` is subset to the four letters of أمان (about 1.5 KB). To add more Arabic
text, subset the full font again with [fontTools](https://github.com/fonttools/fonttools), e.g.
`pyftsubset ReemKufi-Bold.ttf --text="..." --layout-features='*' --flavor=woff2`, and update the
`unicode-range` in `src/tailwind.css`.

The full license text is at <https://openfontlicense.org>.
