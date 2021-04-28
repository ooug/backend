const account = require('./account.controller')
const activities = require('./activities.controller')
const app = require('./app.controller')
const upcomingEvent = require('./upcoming-event.controller')
const auth = require('./auth.controller')
const blog = require('./blog.controller')
const gallery = require('./gallery.controller')

module.exports = {
  ...account,
  ...activities,
  ...app,
  ...upcomingEvent,
  ...auth,
  ...blog,
  ...gallery
}
