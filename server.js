//************************************************************
//  server.js                                               //
//  Active Learning 2110                                    //
//                                                          //
//  Created by Odell Mizrahi on 9/13/16.                    //
//  Copyright © 2016 Odell Mizrahi. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  13Sep16     O. Mizrahi  Initial Design                  //
//                                                          //
//************************************************************
"use strict"

var express = require('express');
var bodyparser = require('body-parser');


var app_api = require('./app_api');
var app_client = require('./app_client');

var app = express();

app_api(app);
app_client(app);


/**
Binds and listens for connections on the specified host and port

- parameter PORT:  8081
- parameter HANDLER:    callback
*/
app.listen(8081, function(){
    console.log('listening on port 8081');
});
