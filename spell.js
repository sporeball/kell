function spell() {
	let exec = (command, value=null) => document.execCommand(command, false, value)
	let ensureHTTP = url => /^https?:\//.test(url) ? url : `http://${url}`
	let $ = (tag, props, children=[], elm=document.createElement(tag)) =>
		children.map(child => child && elm.appendChild(child)) && Object.assign(elm, props)

	let colorPicker = () => $('input', { type: 'color' })
	let select = options => $('select', {}, options.map(o => $('option', { textContent:o })))

	let buttons = {};
	let queryState = () => {
		for(let cmd in buttons)
			buttons[cmd].classList.toggle('selected', document.queryCommandState(cmd))
	}

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
			...[1, 2, 3, 4].map(n => ['heading' + n, `<H${n}>`]),
			['paragraph', '<p>'],
			['quote', '<blockquote>'],
			['code', '<pre>']
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
			['createLink', 'link', ensureHTTP],
			['insertImage','image', ensureHTTP],
			['insertHTML', 'video', url => `<video controls src="${ensureHTTP(url)}">`]
		].map(([cmd, type, t]) => [type, url => (url=prompt(`Enter the ${type} URL`)) && exec(cmd, t(url))]),
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
				([cmd, onclick = () => exec(cmd), control]) => buttons[cmd] = $('button', {
					className: 'spell-icon',
					title: cmd.replace(/([^a-z])/g, ' $1').toLowerCase(),
					onclick
				}, [$('i', { className: "icon-"+cmd.toLowerCase() }), control])
			))
		)),
		$('div', {
			className: 'spell-content',
			contentEditable: true,
			onkeydown: event => event.which !== 9,
			onkeyup: queryState,
			onmouseup: queryState
		})
	])
}