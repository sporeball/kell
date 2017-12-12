function spell() {
	let $ = (tag, props, children=[]) => {
		let elm = Object.assign(document.createElement(tag), props)
		children.map(child => child && elm.appendChild(child))
		return elm
	}

	let exec = (command, value=null) => document.execCommand(command, false, value)
	let ensureHTTP = url => /^https?:\//.test(url) ? url : `http://${url}`
	let colorPicker = () => $('input', { type: 'color' })
	let select = options => $('select', {}, options.map(o => $('option', { textContent:o })))

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
			['fontName', select(["serif","sans-serif","monospace","cursive","fantasy"])],
			['fontSize', select([...Array(33)].map((_,i)=>8+i*2))],
			['forecolor', colorPicker()],
			['hilitecolor', colorPicker()]
		].map(([cmd, input]) => [cmd, 0, Object.assign(input, { onchange: () => exec(cmd, input.value) })]),
		[
			...[1, 2, 3, 4].map(n => ['Heading' + n, `<H${n}>`]),
			['paragraph', '<P>'],
			['quote', '<BLOCKQUOTE>'],
			['code', '<PRE>']
		].map(([title, format]) => [title, () => exec('formatBlock', format)]),
		[
			['insertOrderedList'],
			['insertUnorderedList'],
			['insertHorizontalRule'],
		],
		[
			['removeFormat'],
			['unlink']
		],
		[
			['createLink', 'link'],
			['insertImage','image'],
			['insertHTML', 'video', url => `<video controls src="${ensureHTTP(url)}">`]
		].map(([cmd, type, transform=ensureHTTP]) => [type, () => {
			let url = prompt(`Enter the ${type} URL`)
			url && exec(cmd, transform(url))
		}]),
		[
			['copy'],
			['cut'],
			['paste']
		],
		[
			['undo'],
			['redo']
		]
	]

	return $('div', { className: 'spell' }, [
		$('div', { className: 'spell-bar' }, actions.map(
			bar => $('div', { className: 'spell-zone' }, bar.map(
				([cmd, onclick = () => exec(cmd), control]) => $('button', {
					className: 'spell-icon',
					title: cmd.charAt(0).toUpperCase() + cmd.slice(1).replace(/([A-Z1-9])/g, ' $1'),
					onclick
				}, [$('i', { className: "icon-"+cmd.toLowerCase() }), control])
			))
		)),
		$('div', {
			className: 'spell-content',
			contentEditable: true,
			onkeydown: event => event.which !== 9
		})
	])

}