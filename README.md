# kell

<a href="https://www.npmjs.com/package/kell"><img src="https://img.shields.io/npm/v/kell" /></a>

> the simplest and smallest code editor for web, with no dependencies

[try it online!](https://sporeball.dev/kell)

## features
- *even smaller* than its contemporaries (**535 bytes** of JavaScript, minified and gzipped)
- *no-frills* editing area (nothing except for line numbers)
- *still customizable* (use CSS variables, or write your own styles)

## size comparisons
| library      | size (min+gzip) | size (min) |
|--------------|-----------------|------------|
| **kell**     | **535B**        | **882B**   |
| CodeJar      | 2.33kB          | 5.21kB     |
| CodeFlask    | 8.27kB          | 24.7kB     |
| EditArea     | 29.4kB          | 115kB      |
| CodeMirror 5 | 57kB            | 173kB      |
| Ace          | 100kB           | 367kB      |

| library  | size (min+gzip) | size (min) |
|----------|-----------------|------------|
| **kell** | **535B**        | **882B**   |
| spell    | 912B            | 1.66kB     |
| pell     | 1.37kB          | 3.4kB      |

## usage

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/kell/dist/kell.min.css">

<div id="container"></div>

<script src="https://unpkg.com/kell"></script>
<script>const editor = kell('editor', document.getElementById('container'))</script>
```

## API

### const editor = kell(id, container)
create a new kell component, and return it.

#### id
type: `string`

an ID to assign to the component.

#### container
type: `Element`

an element to append the component to.

### editor.content
type: `string`

getter & setter for the contents of the component's `textarea`.

## customization
change the size:

```css
/* maybe a little smaller... */
.kell {
  width:500px;
  height:250px;
}
```

change the colors:

```css
/* how about a dark theme? */
:root {
  --kell-gutter-bg:#222;
  --kell-gutter-fg:#ccc;
  --kell-content-bg:#333;
  --kell-content-fg:#fff;
  --kell-border:#555;
}
```

## license
MIT
