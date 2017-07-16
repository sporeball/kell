> spell is a fork of pell, the simplest and smallest WYSIWYG text editor for web, with no dependencies

## Differences with original pell

<ul>
	<li>More features: text align, more headings</li>
	<li>Even smaller than the original: 870 bytes</li>
	<li>Font-awesome icons</li>
	<li>Less dev dependencies, bring your own transpiler</li>
	<li>Actions are spread accross different action bars</li>
	<li>No config, edit the source directly and comment the actions you don't want</li>
</ul>

## Size

| library       | size (min+gzip) | size (min) | jquery | bootstrap |
|---------------|-----------------|------------|--------|-----------|
| spell         | 862B            | 1.57kB     |        |           |
| pell          | 1.11kB          | 2.85kB     |        |           |
| medium-editor | 27kB            | 105kB      |        |           |
| quill         | 43kB            | 205kB      |        |           |
| ckeditor      | 163kB           | 551kB      |        |           |
| summernote    | 26kB            | 93kB       | x      | x         |
| froala        | 52kB            | 186kB      | x      |           |
| tinymce       | 157kB           | 491kB      | x      |           |

## Installation and Usage

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="spell.css">

<div id="container"></div>

<script src="spell.js"></script>
<script >document.getElementById('container').appendChild(spell())</script>
```

## License

MIT
