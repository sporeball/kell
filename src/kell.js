function kell() {
  let $ = (tag, props, children=[], elm=document.createElement(tag)) =>
    children.map(child => child && elm.appendChild(child)) && Object.assign(elm, props)

  return $('div', { className: 'kell' }, [
    $('div', {
      className: 'kell-gutter',
    }, [
      $('p', { innerHTML: '1' })
    ]),
    $('textarea', {
      className: 'kell-content',
      spellcheck: false,
      onkeydown: event => event.which !== 9,
    })
  ])
}
