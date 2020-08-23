// Imports
import express from 'express'

// App Imports
import setupLoadModules from './setup/load-modules'
import setupGraphQL from './setup/graphql'
import setupUpload from './setup/upload'
import setupStartServer from './setup/start-server'

// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)

// Setup uploads
setupUpload(server)

// Setup GraphQL
setupGraphQL(server)

// Start server
setupStartServer(server)

// Annotation: This index file is essentially the "runner file" of the application.
// It imports defines that express is the server framework being used.
// Then this setupLoad and setup in general function calls are booting up the server
// with load modules, uploads, Graphql, and starting the express server.