import $ from 'jquery'

const ROUTES = new Map()

export default function(route, fn) {
  if(route && fn){
    ROUTES.set(route, fn)
    return
  }
  if(!route && !fn)
    init()
}

function init(){
  addEventListeners()
  const path = location.pathname
  goto(path, true)
}

function goto(route, init){
  const REGEX = /(\w+)/g
  let result = route.match(REGEX)
  let uri = ''
  let path = route

  if(result != null && result.length > 1 ){
    uri = result.slice(-1)[0]
    for (var r of ROUTES) {
      if(r.slice(-1)[0].name.indexOf(result[0]) != -1)
        route = r[0];
    }
  }
  if(!ROUTES.has(route))
    route = '*'

  let lastViewed = history.state ? history.state.pathname : '';
  if(init)
    history.replaceState({pathname: path}, '', path)
  else if(path != lastViewed)
    history.pushState({pathname: path}, '', path)

  let val = ROUTES.get(route)
  return val(uri)
}

function addEventListeners () {
  $(document).on('click', 'a', e => {
    let el = e.target
    let rel = $(el).attr('rel')
    let target = $(el).attr('target')
    if (rel === 'external' || rel === 'download' || target === '_blank')
      return
    e.preventDefault()
    goto(el.pathname)
  })

  window.addEventListener('popstate', e => {
    let state = e.state
    if (state !== null)
      goto(state.pathname)
  })
}
