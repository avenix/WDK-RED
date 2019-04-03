
module.exports = function(RED) {

	function EventSegmentation(config) {
		RED.nodes.createNode(this,config);
		var node = this;

		node.on('input', function(msg) {

			var sampleIdx = msg.payload;
			
			var LEFT = Number(config.LEFT);
			var RIGHT = Number(config.RIGHT);

			var startIdx = sampleIdx - LEFT;
			var endIdx = sampleIdx + RIGHT;

			msg.payload = [startIdx,endIdx];
			node.send(msg);
		});
	}
	
	RED.nodes.registerType("eventSegmentation",EventSegmentation);
}
