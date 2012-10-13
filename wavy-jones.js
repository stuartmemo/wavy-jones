var WavyJones = function (context, elem) {
	var analyser = context.createAnalyser();
	analyser.width = document.getElementById(elem).offsetWidth;
	analyser.height = document.getElementById(elem).offsetHeight;
	analyser.lineColor = 'yellow';
	analyser.lineThickness = 1;

    var paper = Raphael('scope', analyser.width, analyser.height),
        oscLine = paper.path([['M', 0, analyser.height/2], ['L', analyser.width, analyser.height/2], 'Z']),
        noDataPoints = 10,
		freqData = new Uint8Array(analyser.frequencyBinCount);

    oscLine.attr({stroke: analyser.lineColor, 'stroke-width': analyser.lineThickness});

    var firstGo = true;

    var drawLine = function () {
        analyser.getByteTimeDomainData(freqData);

        var graphPoints = [],
            graphStr = '';

        graphPoints.push('M0, ' + (analyser.height/2));

        for (var i = 0; i < freqData.length; i++) {
            if (i % noDataPoints) {
                var point = (freqData[i] / 128) * (analyser.height / 2);
                graphPoints.push('L' + i + ', ' + point); 
            }
        }

        for (i = 0; i < graphPoints.length; i++) {
            graphStr += graphPoints[i];
        }

        if (firstGo) {
            console.log(graphStr)
            firstGo = false;
        }

        oscLine.attr('stroke', analyser.lineColor);
        oscLine.attr('stroke-width', analyser.lineThickness);
        oscLine.attr('path', graphStr);

        setTimeout(drawLine, 100);
    }

    drawLine();

	return analyser;
};
