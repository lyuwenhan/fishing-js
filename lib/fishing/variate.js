const max_level = 25;
const mintime = [50, 40, 40, 40, 30, 30, 30, 30, 20, 20, 10, 9, 7, 5, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1];
const maxtime = [100, 100, 90, 80, 80, 70, 60, 50, 50, 40, 40, 40, 40, 40, 40, 35, 30, 25, 20, 10, 5, 4, 4, 3, 3, 2];
const cost = [0, 5, 5, 5, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 200, 200, 300, 350, 400, 500, 600, 700, 700];
const max_level2 = 29;
const maxget = [20, 20, 20, 30, 30, 40, 40, 40, 50, 50, 55, 60, 60, 60, 70, 70, 80, 80, 90, 100, 105, 110, 120, 130, 135, 140, 145, 150, 170, 200];
const minget = [10, 12, 15, 15, 20, 20, 25, 30, 35, 40, 40, 40, 45, 50, 60, 60, 60, 70, 80, 85, 85, 90, 95, 100, 100, 100, 100, 100, 100, 100];
const cost2 = [0, 20, 20, 20, 30, 40, 50, 60, 70, 80, 80, 80, 80, 90, 100, 150, 200, 200, 200, 300, 350, 400, 500, 600, 700, 700, 700, 700, 700, 700];
var ltime = 0;
var left = 0;
var username = "";
var fish_man = false;
var big = 0;
var diamond = 0;
var aqnow = 0;
var aqother = 0;
var pwd = "";
const svariate = () => ({
	//[0,]
	money: 20,
	//[0,max_level]
	level: 0,
	//[0,max_level2]`
	get_level: 0,
	//[0,]
	cnt: 0,
	//[0,100]
	bf: 20,
	//[1,10]
	stime: 1,
	//[0,100]
	slip: 50,
	//[0,]
	cleaning_ball: 0,
	//[1,]
	cleaning_sub: 1,
	//[0,6]
	gan: 1,
	//[0,]
	aqcnt: 0,
	//[1,3]
	speed: 2,
	//[0,]
	try_level: 0,
	//[0,]
	roast: 0,
	//[0,40]
	hungry: 20,
	//[0,]
	aqfish_cnt: new Array(7).fill(0),
	fish: Array.from({
		length: 7
	}, () => new Array(2).fill(0)),
	simple: false
});
var data_saver = svariate();
export default {
	max_level,
	mintime,
	maxtime,
	cost,
	max_level2,
	maxget,
	minget,
	cost2,
	ltime,
	left,
	username,
	fish_man,
	big,
	diamond,
	aqnow,
	aqother,
	pwd,
	svariate,
	data_saver
};
