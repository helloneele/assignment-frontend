import $ from 'jquery'
import router from './router'
import homeTpl from './templates/home.hbs'
import contactTpl from './templates/contact.hbs'
import playerTpl from './templates/player.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function player(name) {
  $app.html(playerTpl({
    name
  }))
}

function contact() {
  $app.html(contactTpl())
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('/players/:player', player)
router('/contact', contact)
router('*', notFound)
router()
