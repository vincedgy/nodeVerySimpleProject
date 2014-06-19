/**
 * Created by Vincent on 14/06/14.
 */

'use strict';


var MyObjectClass = function(value) {
    var self = this;
    self.secret=value;   // Private member

    return {
        nodeId: 0,  // Public
        nodeName: "", // Public
        getSecret: function() { // Protected
            return self.secret;
        },
        setSecret: function(value) { // Protected
            self.secret = value;
        },
        toString: function() {
            return this.nodeId + "," + this.nodeName + ", secret is :" + this.getSecret();
        }
    }

}


var m1 = new MyObjectClass('secretisPassed');
m1.nodeId=1;
m1.nodeName='James';
console.log('Hello World', m1.toString(), m1.getSecret());