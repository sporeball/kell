function spell() {
	let exec          = (command, value = null) => document.execCommand(command, false, value)
	let fromCamelCase = str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1')
	let ensureHTTP    = url => /^https?:\/\//.test(url) ? url : `http://${url}`
	let faicon        = name => `<i class="icon-${name.toLowerCase()}"></i>`

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
			['justifyLeft'],
			['justifyCenter'],
			['justifyRight'],
			['justifyFull'],
			['indent'],
			['outdent']
		],
		[
			...[1, 2, 3, 4].map(n => ['Heading ' + n, '<H' + n + '>', 'h']),
			['Paragraph', '<P>'],
			['Quote', '<BLOCKQUOTE>'],
			['Code', '<PRE>']
		].map(([title, format, icon=title]) => [title, icon, () => exec('formatBlock', format)]),
		[
			['insertOrderedList'],
			['insertUnorderedList'],
			['insertHorizontalRule'],
		],
		[
			['copy'],
			['cut'],
			['paste']
		],
		[
			['createLink', 'link'],
			['insertImage','image']
		].map(([cmd, type]) => [cmd, cmd, () => {
			let url = prompt(`Enter the ${type} URL`)
			url && exec(cmd, ensureHTTP(url))
		}]),
		[
			['removeFormat'],
			['unlink']
		],
		[
			['undo'],
			['redo']
		]
	]

	let $ = (tag, className, props, children=[]) => {
		let elm = Object.assign(document.createElement(tag), {className}, props)
		children.map(child => elm.appendChild(child))
		return elm
	}

	return $('div', 'spell', {}, [
		$('div', 'spell-bar', {}, actions.map(
			bar => $('div', 'spell-zone', {}, bar.map(
				([cmd, icon = cmd, action = () => exec(cmd)]) => $('button', 'spell-action', {
					title    : fromCamelCase(cmd),
					innerHTML: faicon(icon),
					onclick  : action
				})
			))
		)),
		$('div', 'spell-content', {
			contentEditable: true,
			onkeydown: event => event.which !== 9
		})
	])

}