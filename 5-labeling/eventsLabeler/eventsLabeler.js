module.exports = function(RED) {

    function EventsLabeler(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = Math.abs(msg.payload[0]) + Math.abs(msg.payload[1]) + Math.abs(msg.payload[2]);
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("eventsLabeler",EventsLabeler);
}