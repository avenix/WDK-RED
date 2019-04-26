const kLastPeakValueStr = 'lastPeakValue';
const kSamplesSinceLastPeakStr = 'samplesSinceLastPeak';

module.exports = function(RED) {

	function SimplePeakDetectorNode(config) {
		RED.nodes.createNode(this,config);

		var globalContext = this.context().global;
		var context = this.context();
		context.set(kLastPeakValueStr,0);
		context.set(kSamplesSinceLastPeakStr,0);

		var node = this;
    	node.alreadyComputedMetrics = false;

		node.on('input', function(msg) {

			var newValue = msg.payload;
			var minPeakHeight = Number(config.minPeakHeight);
			var minPeakDistance = Number(config.minPeakDistance);
			var lastPeakValue = context.get(kLastPeakValueStr);
			var samplesSinceLastPeak = context.get(kSamplesSinceLastPeakStr);

	    	computeMetrics(node);

			samplesSinceLastPeak++;

			if(lastPeakValue > 0.0001 && samplesSinceLastPeak >= minPeakDistance){
				node.send(msg);
				lastPeakValue = 0;
			}

			if(newValue >= minPeakHeight && (newValue > lastPeakValue || samplesSinceLastPeak >= minPeakDistance)){
				lastPeakValue = newValue;
				samplesSinceLastPeak = 0;
			}
			

			context.set(kLastPeakValueStr,lastPeakValue);
			context.set(kSamplesSinceLastPeakStr,samplesSinceLastPeak);
		});
	}
	
	function computeMetrics(node){
		if(!node.alreadyComputedMetrics){
			global.Metrics.memory += 5 * 4;
			node.alreadyComputedMetrics = true;
		}
		global.Metrics.flops += 16;
	}

	RED.nodes.registerType("simplePeakDetector",SimplePeakDetectorNode);
}
