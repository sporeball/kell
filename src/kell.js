function kell(id, container) {
  let $ = (tag, props, children=[], elm=document.createElement(tag)) =>
    children.map(child => child && elm.appendChild(child)) && Object.assign(elm, props)

  // redraw single instance
  let redraw = (content, gutter=content.previousSibling) => {
    let cols = Math.floor(Math.floor(content.getBoundingClientRect().width - 18) / 8.396875);
    let lines = content.value.split('\n');
    // populate the gutter
    gutter.innerHTML = '';
    for (let i = 0; i < lines.length; i++) {
      // number of lines the current line wraps across (minimum 1)
      let visualLines = Math.ceil(lines[i].length / cols) || 1;
      gutter.innerHTML += `<p style="height:${18 * visualLines}px">${i + 1}</p>`;
    }
  };

  window.onresize = () => {
    // redraw all instances
    for (let instance of document.querySelectorAll('.kell-content')) {
      redraw(instance);
    }
  };

  container.appendChild(
    $('div', { id: id, className: 'kell' }, [
      $('div', { className: 'kell-gutter', }, [
        $('p', { innerHTML: '1' })
      ]),
      $('textarea', {
        className: 'kell-content',
        spellcheck: false,
        onkeydown: event => event.which !== 9,
        oninput: e => redraw(e.target),
        onscroll: e => e.target.previousSibling.scrollTop = e.target.scrollTop
      })
    ])
  );
}
