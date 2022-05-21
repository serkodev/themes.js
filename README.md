# themes.js

A super lightweight and fast Theme library with auto system color scheme detection in JavaScript.

[![Latest Release](https://badgen.net/npm/v/themes.js)](https://www.npmjs.com/package/themes.js)
[![Package Size](https://badgen.net/badgesize/brotli/https://cdn.jsdelivr.net/npm/themes.js?icon=jsdelivr&label&color=yellow)](https://unpkg.com/themes.js 'brotli package size (without dependencies)')
[![MIT License](https://badgen.net/github/license/serkodev/themes.js?color=yellow)](https://github.com/master-co/css/blob/main/LICENSE)

## Features

- Auto detect Dark / Light mode by JavaScript
- Support custom theme
- Support localStorage save and sync with other windows
- Use class instead of `@media prefers-color-scheme`

## Install

Package Manager

```
npm i themes.js

yarn add themes.js

pnpm i themes.js
```

CDN

```html
<script src="https://unpkg.com/themes.js"></script>
```

## Quick start

Prepare CSS

```css
.light body {
  background-color: white;
}
.dark body {
  background-color: black;
}
```

Auto Dark / Light and auto localStorage sync theme by default

### ESM

```js
import Themes from 'themes.js'
const themes = new Themes()
```

### CDN

```html
<script src="https://unpkg.com/themes.js"></script>
<script>new window.Themes()</script>
```

## Usage

### Custom theme

```js
const themes = new Themes('ocean')
```

```css
.ocean body {
  background-color: blue;
}
```

### Dynamic force change theme

```js
const themes = new Themes()
themes.theme = 'dark'

// sync to localStorage if needed
themes.commit()
```

### Sync with localStorage

By default, localStorage sync will auto **enable** If you calling `new Themes()` with empty arguments.

```js
const themes = new Themes()
// sync localStorage is enabled by default
```

If you passing init theme (like `new Themes('dark')`), the localStorage sync would be **disable** by default.

```js
const themes = new Themes('dark')
// sync localStorage is disabled by default
```

You can switch on and off sync after init `Themes` by setting `.sync`.

```js
themes.sync = true
```

Notice: after calling `commit()`, localStorage sync will auto set to **enable**, you can turn off the sync manuelly if needed.

```js
themes.commit()
// themes.sync = true [auto]
```

### Events

```js
// theme on change
themes.onChange = (theme) => {
  console.log('theme changed', theme)
}
```

## Development

```
pnpm i
```

Playground

```
pnpm dev
```

## Inspiration

[next-themes](https://github.com/pacocoursey/next-themes)

## LICENSE

MIT
