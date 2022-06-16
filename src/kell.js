function kell() {
  let $ = (tag, props, children=[], elm=document.createElement(tag)) =>
    children.map(child => child && elm.appendChild(child)) && Object.assign(elm, props)

  return $('div', { className: 'kell' }, [
    $('div', {
      className: 'kell-content',
      contentEditable: true,
      onkeydown: event => event.which !== 9,
    })
  ])
}
