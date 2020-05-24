const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const projects = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', function(req, res) {
  const profileData = {
    avatar_url: '/images/avatar.jpg',
    name: 'Tamires Santos',
    role: 'Rocketseat Student',
    description: 'Learning to be a full-stack developer. Bootcamp LaunchBase <a href="https://rocketseat.com.br/" target="_blanket">Rocketseat</a>.',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/tfstam'
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/tamires-santos-230747103/'
      }
    ]
  }

  return res.render('about', { profile: profileData })
})

server.get('/projects', function(req, res) {
  return res.render('projects', { projects })
})

server.get('/project', function(req, res) {
  const id = req.query.id

  const project = projects.find(function(project) {
    return project.id == id 
  })

  if ( !project ) {
    return res.send('Project not found!')
  }

  return res.render('project', { project })
})

server.listen(5000, function() {
  console.log('Server is runing')
})