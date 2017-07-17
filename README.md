> spell is a fork of pell, the simplest and smallest WYSIWYG text editor for web, with no dependencies

## [Try it online](https://sylvainpolletvillard.github.io/spell/demo.html)

https://sylvainpolletvillard.github.io/spell/demo.html

## Differences with original pell

- More features: 
    - superscript / subscript
    - text align left/center/right/justify
    - indent / outdent
    - font family
    - font size
    - text foreground color and highlight color
    - more headings    
    - clear formatting
    - unlink
    - insert video
    - copy / cut/ paste
    - undo / redo

- Even smaller than the original: 731 bytes gzipped
- Custom icon font
- Less dev dependencies, bring your own transpiler
- Actions are spread accross different action bars
- No config, edit the source directly and comment the actions you don't want


## Size

| library       | size (min+gzip) | size (min) | jquery | bootstrap |
|---------------|-----------------|------------|--------|-----------|
| spell         | 935B            | 1.55kB     |        |           |
| pell          | 1.11kB          | 2.85kB     |        |           |
| medium-editor | 27kB            | 105kB      |        |           |
| quill         | 43kB            | 205kB      |        |           |
| ckeditor      | 163kB           | 551kB      |        |           |
| summernote    | 26kB            | 93kB       | x      | x         |
| froala        | 52kB            | 186kB      | x      |           |
| tinymce       | 157kB           | 491kB      | x      |           |

## Installation and Usage

```html
<link rel="stylesheet" type="text/css" href="spell.css">

<div id="container"></div>

<script src="spell.js"></script>
<script>document.getElementById('container').appendChild(spell())</script>
```

## License

MIT
