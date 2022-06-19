/*
  kell
  copyright (c) 2022 sporeball
  pell copyright (c) 2019 Jared Reich
  spell copyright (c) 2018 Sylvain Pollet-Villard
  MIT license
*/

/**
 * create a kell component and append it to a container
 * @param {string} id ID to assign to the component
 * @param {Element} container element to append the component to
 */
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

  // kell component
  let self = $('div', { id: id, className: 'kell' }, [
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
  ]);

  // get and set content
  Object.defineProperty(self, 'content', {
    get() { return this.children[1].value; },
    set(v) {
      this.children[1].value = v;
      redraw(this.children[1]);
    }
  });

  // append
  container.appendChild(self);

  return self;
}
