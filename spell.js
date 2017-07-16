function spell() {
	let exec          = (command, value = null) => document.execCommand(command, false, value)
	let fromCamelCase = str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1')
	let ensureHTTP    = url => /^https?:\/\//.test(url) ? url : `http://${url}`
	let faicon        = name => `<i class="fa fa-${name}"></i>`

	let actions = [
		[
			['bold'],
			['italic'],
			['underline'],
			['strikeThrough'],
			['subscript'],
			['superscript'],
		],
		[
			['justifyLeft', 'align-left'],
			['justifyCenter', 'align-center'],
			['justifyRight', 'align-right'],
			['justifyFull', 'align-justify'],
			['indent'],
			['outdent']
		],
		[
			...[1, 2, 3, 4].map(n => ['Heading ' + n, 'header', '<H' + n + '>']),
			['Paragraph', void 0, '<P>'],
			['Quote', 'quote-right', '<BLOCKQUOTE>'],
			['Code', void 0, '<PRE>']
		].map(([c, i, format]) => [c, i, () => exec('formatBlock', format)]),
		[
			['insertOrderedList', 'list-ol'],
			['insertUnorderedList', 'list-ul'],
			['insertHorizontalRule', 'minus'],
		],
		[
			['copy'],
			['cut'],
			['paste']
		],
		[
			['createLink', 'link', 'link'],
			['insertImage', 'file-image-o', 'image']
		].map(([c, i, type]) => [c, i, () => {
			let url = prompt(`Enter the ${type} URL`)
			url && exec(c, ensureHTTP(url))
		}]),
		[
			['removeFormat', 'eraser'],
			['unlink']
		],
		[
			['undo'],
			['redo', 'repeat']
		]
	].map(bar => bar.map(([cmd, icon=cmd, action = () => exec(cmd)]) => ({
		action,
		icon: faicon(icon.toLowerCase()),
		title: fromCamelCase(cmd)
	})))

	let $ = (tag, className, props, children=[]) => {
		let elm = Object.assign(document.createElement(tag), {className}, props)
		children.map(child => elm.appendChild(child))
		return elm
	}

	return $('div', 'spell', {}, [
		$('div', 'spell-bar', {}, actions.map(
			bar => $('div', 'spell-zone', {}, bar.map(
				({icon, title, action}) => $('button', 'spell-action', {
					title,
					innerHTML: icon,
					onclick: action
				})
			))
		)),
		$('div', 'spell-content', {
			contentEditable: true,
			onkeydown: event => event.which !== 9
		})
	])

}