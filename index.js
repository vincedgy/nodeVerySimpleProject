/**
 * Created by Vincent on 14/06/14.
 */

'use strict';

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle={};

handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;
handle['/list'] = requestHandlers.list;
handle['/cat'] = requestHandlers.cat;

server.start(router.route, handle);