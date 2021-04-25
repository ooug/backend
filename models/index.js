const activities = require('./activities.model')
const app = require('./app.model')
const blog = require('./blog.model')
const upcomingEvent = require('./upcoming-event.model')
const user = require('./user.model')

module.exports = { ...activities, ...app, ...blog, ...upcomingEvent, ...user }
