import $ from 'jquery'

const routes = new Map()

function init(){
  const path = window.location.pathname //gets uri of current page

  goto(path)
}

function goto(route){
  // for (const [route, val] of)
  // routes.entries()){
  //   if (route.match(regEXP))
  // }
  console.log("route: " + route);
  //console.log(event);



  //window.history.state.pathname //gets name of back
  //console.log(window.history.state.pathname);
  console.log(window.history.length);
  let lastViewed;
  if(window.history.state)
    lastViewed = window.history.state.pathname;
  else
    lastViewed = false

  // check if event is popstate
  // event && event.type != "popstate"

  //if last page visited is the same as current page
  if(route != lastViewed){
    console.log("hi");
    window.history.pushState({
      pathname: route
    }, '', route);
  }


  console.log(window.history)


  for ( let [key, val] of routes.entries() ) {
    //console.log("key: " + key + " route: " + route + " value: " + val);
    if (key === route) return val();
  }

  if (routes.has('*')) {
    return routes.get('*')();
  }


}

export default function(route, fn) {
  //console.log(route, fn)
  // register new route
  if(route && fn){
    routes.set(route, fn)
    return
  }

  // init if no params
  if(!route && !fn){
    initEventListeners();
    init()
  }


}

function initEventListeners () {

  const nav = $('nav a');

  for (var i = 0; i < nav.length; i++) {
    nav[i].addEventListener('click', e => {
      console.log(e);
      e.preventDefault();
      goto(e.target.pathname)
    });
  }

  window.addEventListener('popstate', e => {
    //console.log("pathname" + e.state.pathname);
    let state = e.state;
    if (state !== null) {
      goto(state.pathname);
    }
  })
}
