import variate from "./variate.js";
var consoleSize = {
	cols: 10,
	rows: 10
};
var q = [],
	w = [];
const IOs = {
	send: v => w.length ? w.shift()(v) : q.push(v),
	onData: () => {}
};
const getch = () => q.length ? Promise.resolve(q.shift()) : new Promise(r => w.push(r));
async function getch2s () {
	const ret = q.join("");
	q.length = 0;
	return ret
}
async function sleep (s) {
	return new Promise(resolve => setTimeout(resolve, s * 1e3))
}
async function printnl (...args) {
	await IOs.onData(args.join("").replace(/\n/g, "\n\r"))
}
async function print (...args) {
	await printnl(...args, "\n")
}
async function printlev (...args) {
	await print(args.join("\n"))
}
async function printa (...args) {
	const s = args.join("");
	await print(s, s.length ? "    " : "", "(按Enter继续)");
	while (await getch() !== "\r");
}
async function printleva (...args) {
	if (!args.length) {
		args.push("")
	}
	for (const s of args) {
		await printa(s)
	}
}
async function printYn (s) {
	s ??= "";
	await print(s, s.length ? " (Y/n)" : "(Y/n)");
	let c;
	do {
		c = await getch()
	} while (c !== "Y" && c !== "y" && c !== "N" && c !== "n");
	return c === "Y" || c === "y"
}
async function clear () {
	await printnl("c")
}
async function random (l, r) {
	return Math.floor(Math.random() * (r - l + 1)) + l
}
async function choose () {
	await clear();
	await printlev("请选择开局技能", "1.美味诱饵, 2.稀世珍宝, 3.牢靠安全绳, 4.强效清洁剂, 5.大力水手, 6.放长线钓大鱼, 7.孤苦人家", "美味诱饵:", "    上钩速度变为原先的1.5倍", "稀世珍宝:", "    鱼的价格变为原先的2倍", "牢靠安全绳:", "    脱钩概率由50%变为10%", "强效清洁剂:", "    初始获得1个清洁剂, 并且清洁剂效果翻倍", "大力水手:", "    甩杆倍速由1倍变为2倍", "放长线钓大鱼:", "    大鱼概率由20%变为40%", "孤苦人家:", "    无");
	while (true) {
		let c = await getch();
		if (c === "1") {
			variate.dataSaver.level = 5;
			break
		} else if (c === "2") {
			variate.dataSaver.getLevel = 5;
			break
		} else if (c === "3") {
			variate.dataSaver.slip = 10;
			break
		} else if (c === "4") {
			variate.dataSaver.cleaningBall = 1;
			variate.dataSaver.cleaningSub = 2;
			break
		} else if (c === "5") {
			variate.dataSaver.stime = 2;
			break
		} else if (c === "6") {
			variate.dataSaver.bf = 40;
			break
		} else if (c === "7") {
			break
		}
	}
	await clear()
}
async function getline (b) {
	b ??= 0;
	let ans = "";
	let a = "";
	while ((a = await getch()) !== "\r" || !ans.length) {
		if (/^[\x21-\x7E]$/.test(a)) {
			ans += a;
			if (b === 1) {
				await printnl(a)
			} else if (b === 2) {
				await printnl("*")
			}
		}
		if (a === "\b" && ans.length) {
			ans = ans.slice(0, -1);
			await printnl("\b \b")
		}
	}
	await print();
	return ans
}
async function getlineYe (b) {
	b ??= 0;
	let ans = "";
	let a = 0;
	while ((a = await getch()) !== "\r") {
		if (/^[\x21-\x7E]$/.test(a)) {
			ans += a;
			if (b === 1) {
				await printnl(a)
			} else if (b === 2) {
				await printnl("*")
			}
		}
		if (a === "\b" && ans.length) {
			ans = ans.slice(0, -1);
			await printnl("\b \b")
		}
	}
	await print();
	return ans
}
async function toStringF (d) {
	if (Math.floor(d * 10) % 10) {
		return `${Math.floor(d)}.${Math.floor(d*10)%10}`
	} else {
		return `${Math.floor(d)}`
	}
}
async function time () {
	return Math.floor(Date.now() / 1e3)
}
async function isObject (obj) {
	return obj && typeof obj === "object" && !Array.isArray(obj)
}
async function toObject (obj) {
	return await isObject(obj) ? obj : {}
}
export default {
	consoleSize,
	IOs,
	getch,
	getch2s,
	sleep,
	printnl,
	print,
	printlev,
	printa,
	printleva,
	printYn,
	clear,
	random,
	choose,
	getline,
	getlineYe,
	toStringF,
	time,
	isObject,
	toObject
};
