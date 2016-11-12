import $ from 'jquery'

const routes = new Map()

function init(){
  const path = window.location.pathname //gets uri of current page
  goto(path)
}

function goto(route){
  const REGEX = /(\/players\/)([a-z0-9]+)/gi
  let uri = ""
  let path = route

  if (route.match(REGEX)){
    uri = REGEX.exec(route)[2]
    route = route.replace(uri, ":player")
  }
  if(!routes.has(route))
    route = '*'

  //push state
  let lastViewed = "";
  if(window.history.state)
    lastViewed = window.history.state.pathname
    // TODO: nicht ausführen bei init
  if(path != lastViewed){
    window.history.pushState({
      pathname: path
    }, '', path)
  }

  // load content
  let val = routes.get(route)
  return val(uri)
}

export default function(route, fn) {
  // register new route
  if(route && fn){
    routes.set(route, fn)
    return
  }
  // init if no params
  if(!route && !fn){
    init()
    initEventListeners()
  }
}

function initEventListeners () {
  const NAV = $('nav a')
  for (var i = 0; i < NAV.length; i++) {
    NAV[i].addEventListener('click', e => {
      e.preventDefault()
      goto(e.target.pathname)
    });
  }

  window.addEventListener('popstate', e => {
    let state = e.state
    if (state !== null) {
      goto(state.pathname)
    }
  })
}
