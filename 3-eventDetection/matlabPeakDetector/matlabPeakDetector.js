
module.exports = function(RED) {

	function MatlabPeakDetectorNode(config) {
		RED.nodes.createNode(this,config);

		var globalContext = this.context().global;
		var context = this.context();

		var node = this;

		node.on('input', function(msg) {
		//TODO
			
		});
	}
	
	RED.nodes.registerType("matlabPeakDetector",MatlabPeakDetectorNode);
}
