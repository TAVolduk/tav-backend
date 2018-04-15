'use strict';
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

module.exports = cb => {
  // import socket io
  var io = require('socket.io')(strapi.server);
  // listen for user connection
  io.on('connection', function(socket){
    // send message on user connection
    socket.emit('hello', JSON.stringify({message: 'Hello food lover'}));
    // listen for user diconnect
    socket.on('disconnect', () => console.log('a user disconnected'));
  });

  strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
  cb();


  const nsp = io.of('/checkLuggage');

  nsp.on('connection', socket => {
    socket.on('disconnect', () => console.log('a user disconnected'));
    socket.on('fetch_data', async (data) => {
      let watcher;
      watcher = await strapi.services.luggagewatcher.fetch({macAdress: data});

      if (!watcher) {
        watcher = await strapi.services.luggagewatcher.add({macAdress: data});
      }

      strapi.services.luggagewatcher.edit({_id: watcher._id}, {socketId: socket.id});
      
      socket.emit('flight_data', JSON.stringify(watcher));
    });
  });

};
