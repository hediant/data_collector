var Task = require('../task');
var Job = require('../job');
var Scheduler = require('../scheduler');
var Adapters = require('../adapters');
var Moment = require('moment');

var shdlr = new Scheduler();
shdlr.run();

function disp(){
	console.log("Jobs: %s",shdlr.getJobs().length);
	//console.log(shdlr.getJobs());
}

var current = Moment();

var tasks = [
	new Task({"id":1, 
		"adapter":Adapters.adapter1, 
		"interval" : 1000,
		"repeat" : {
			"type" : "day",
			"day" : {
				"start" : Moment(current + Moment.duration(5, 'seconds')).format('HH:mm:ss'),
				"end" : Moment(current + Moment.duration(20, 'seconds')).format('HH:mm:ss')
			}
		}
	}),
	new Task({"id":2, 
		"adapter":Adapters.adapter1, 
		"interval" : 1000,
		"repeat" : {
			"type" : "day",
			"day" : {
				"start" : Moment(current + Moment.duration(10, 'seconds')).format('HH:mm:ss'),
				"end" : Moment(current + Moment.duration(20, 'seconds')).format('HH:mm:ss')
			}
		}		
	}),
	new Task({"id":3, 
		"adapter":Adapters.adapter1,
		"interval" : 3000,
		"repeat" : {
			"type" : "day",
			"day" : {
				"start" : Moment(current + Moment.duration(15, 'seconds')).format('HH:mm:ss'),
				"end" : Moment(current + Moment.duration(20, 'seconds')).format('HH:mm:ss')
			}
		}		
	})
]

console.dir (tasks[0], {"depth":4});
console.dir (tasks[1], {"depth":4});
console.dir (tasks[2], {"depth":4});
console.log("------------------------------------------------");


tasks.forEach(function (task){
	shdlr.addTask(task);
	task.on('data', function (data){
		console.log("task %s recv data.", task.id);
	});	
});

setInterval(function (){
	disp();
}, 1*1000);

setTimeout(function (){
	process.exit();
}, 30 * 1000);