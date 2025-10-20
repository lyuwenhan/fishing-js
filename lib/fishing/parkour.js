import variate from "./variate.js";
import func from "./func.js";
const born = [
	[1, 30],
	[33, 30],
	[66, 30],
	[98, 11],
	[42, 14]
];
var level = 0;
var x;
var y;
var sx = 1;
var sy = 0;
const map1 = ["|     | |   |                                                                                       |", "+---+ +<+   |                                                                                +---   |", "|   | | | +-+          +---+                     --                          -      -      --+   \\  |", "|   | | | |            |   |                    /                                                 | |", "|   | | | |            |   +-------------------+*****Z****Z****Z****Z****Z******Z******Z**********| |", "+^^^+ +^+ +---------+  |   |  finish           +--------------------------------------------------+ |", "|   | | | |         |  |   |     \\             |                                                  | |", "|   | | | |   +---+ |  +---+      \\            |  -   -   -   -   -   -   -   -   -   -   -   -   | |", "|   |   |     |   |        |       \\           |>/ \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\    |", "+^^^+--^+-----+---+--------+--------+-----------+-+-+---+---+---+---+---+---+---+---+---+---+---+---+", "|   |   |     |                                                                                 |...|", "|   |   |     |                                                                                 | |.|", "|   |   |     |                                                      |                          | |.|", "+^^^+ +-+  +--+ +-----     ------             |                   +--+      ---                 | |.|", "|   | | |  |  | |                \\        +---+                   |        |***\\                | |.|", "|   | | |  |  | |                 \\       |             ZZ        |        |****+--   -------     |.|", "|     |    |    |                  \\      |                       |        |*****************\\    |.|", "+^^^--+^---+^^--+^^^^^---+          \\     |******ZZ***********Z***|*****ZZ*|******************\\   |.|", "+-----+----+----+--------+-------+---+----+-----------------+-----+--------+-------------------+--+.|", "|                                |                          |     |                               |.|", "|                                |              ---+--+---- |     |                    +---       |.|", "|                                |                 |  |           |                   /           |.|", "|                                |       -------   |  |           |                  /            |.|", "|                         +----+ |                 |           /| |            -----+     |.......|.|", "|                    -----+    | |                 |  +-------+ | |                       |.......|.|", "|                              | +--------                      | |      +----+           |.......|.|", "|             |                | |                              | |     /      \\          |.......|.|", "|        -----+------          | |                              | |    /        \\         |.......|.|", "|             |                | |        -----+                | |   /          \\        |.......|.|", "|             |                |               |                |    /            \\       |.........|", "+-------------+----------------+---------------+----------------+---+--------------+------+---------|"];
const End = 100;
async function ty () {
	return map1[y - 1][x] == " "
}
async function die () {
	return map1[y][x] == "*"
}
async function fin (x2, y2) {
	return "finsh".includes(map1[y2 - 1][x2])
}
async function ok (x2, y2) {
	return " .".includes(map1[y2 - 1][x2])
}
async function slide (x2, y2) {
	return map1[y2 - 1][x2] == "/" ? 1 : map1[y2 - 1][x2] == "\\" ? -1 : 0
}
async function show () {
	let a = Math.max(x - 30, 0);
	let b = Math.max(y - 5, 0);
	if (a + 59 > End) {
		a = End - 59
	}
	if (b > 21) {
		b = 21
	}
	func.print("x:", x, " y:", y);
	for (let i = b; i < b + 10; i++) {
		for (let j = a; j < a + 60; j++) {
			if (i == y - 1 && j == x) {
				func.printnl("O")
			} else {
				if (map1[i][j] == ".") {
					func.printnl("[34;1m#[m")
				} else if (map1[i][j] == "*") {
					func.printnl("[31;1m*[m")
				} else if (map1[i][j] == "Z") {
					func.printnl("[32;1mZ[m")
				} else if (map1[i][j] == "^") {
					func.printnl("[33;1m^[m")
				} else if (map1[i][j] == ">") {
					func.printnl("[33;1m>[m")
				} else if (map1[i][j] == "<") {
					func.printnl("[33;1m<[m")
				} else if (await fin(j, i + 1)) {
					func.printnl("[33;1m", map1[i][j], "[m")
				} else {
					func.printnl(map1[i][j])
				}
			}
		}
		func.print()
	}
}
async function tr (x2, y2) {
	if (x2 <= 0) {
		return
	}
	if (y2 <= 0) {
		return
	}
	if (y2 > 30) {
		return
	}
	if (x2 >= End) {
		return
	}
	if (await ok(x2, y2)) {
		x = x2;
		y = y2
	}
}
async function main () {
	if (variate.dataSaver.tryLevel != 0) {
		await func.printa("已完成挑战");
		return
	}
	x = born[level][0];
	y = born[level][1];
	func.clear();
	if (!await func.printYn("是否进入跑酷")) {
		return
	}
	let swcnt = 0;
	let ju = false;
	while (true) {
		if (x <= 0) {
			x = 1
		}
		if (y <= 0) {
			y = 1
		}
		func.clear();
		if (x == born[level + 1][0] && y == born[level + 1][1]) {
			level++
		}
		if (await ty()) {
			swcnt = 0;
			func.print("使用w或空格进行跳跃, 按r重生, 按backspace退出");
			await show();
			let u = false,
				di = false;
			for (const c of func.getch2s()) {
				if (c == 127) {
					return
				}
				if (c == "w" || c == " ") {
					u = true;
					ju = true
				}
				if (c == "r") {
					di = true
				}
			}
			if (await fin(x, y - 1)) {
				func.clear();
				await func.printa("完成挑战, 获得 $500");
				variate.dataSaver.money += 500;
				variate.dataSaver.tryLevel = 1;
				return
			}
			if (await die()) {
				func.print("你阵亡了");
				if (!await func.printYn("是否重生")) {
					return
				}
				x = born[level][0];
				y = born[level][1];
				continue
			}
			if (di) {
				x = born[level][0];
				y = born[level][1];
				continue
			}
			if (map1[y][x] == "^") {
				sy = 0;
				await tr(x, y - 4);
				await func.sleep(.1);
				continue
			}
			if (map1[y][x] == ">") {
				sy = 0;
				await tr(x + 4, y);
				await func.sleep(.1);
				continue
			}
			if (map1[y][x] == "<") {
				sy = 0;
				await tr(x - 4, y);
				await func.sleep(.1);
				continue
			}
			if (map1[y][x] == "Z") {
				sy = 3
			}
			for (let i = 1; i <= sy; i++) {
				await tr(x, y - 1);
				if (!await ty()) {
					sy = 0;
					continue
				}
			}
			if (await ok(x, y + 1)) {
				sy--
			} else {
				sy = 0
			}
			if (sy) {
				for (let i = 1; i <= sy; i++) {
					await tr(x, y - 1);
					if (!await ty()) {
						sy = 0;
						continue
					}
				}
				for (let i = 1; i <= -sy; i++) {
					await tr(x, y + 1);
					if (!await ty()) {
						sy = 0;
						continue
					}
				}
			}
			if (!await ok(x + sx, y)) {
				if (sx == await slide(x + sx, y) && await ok(x + sx, y - 1) || await slide(x, y + 1) != 0) {
					await tr(x, y - 1);
					if (!await ty()) {
						sy = 0;
						continue
					}
				} else {
					sx *= -1
				}
			}
			await tr(x + sx, y);
			if ((u || ju) && !sy && !await ok(x, y + 1)) {
				ju = false;
				sy = 2;
				for (let i = 1; i <= sy; i++) {
					await tr(x, y - 1);
					if (!await ty()) {
						sy = 0;
						continue
					}
				}
			}
			if (!await ok(x, y + 1)) {
				sy = 0
			}
			await func.sleep(.1)
		} else {
			ju = false;
			func.print("使用wasd进行游泳, 按r重生, 按backspace退出");
			await show();
			swcnt++;
			swcnt %= 5;
			let u = false,
				d = false,
				l = false,
				r = false,
				di = false;
			for (let c of func.getch2s()) {
				if (c == 127) {
					return
				}
				if (c == "r") {
					di = true
				}
				if (c == "w") {
					u = true
				}
				if (c == "a") {
					l = true
				}
				if (c == "s") {
					d = true
				}
				if (c == "d") {
					r = true
				}
			}
			if (await die()) {
				func.print("你阵亡了");
				if (!await func.printYn("是否重生")) {
					return
				}
				x = born[level][0];
				y = born[level][1];
				continue
			}
			if (di) {
				x = born[level][0];
				y = born[level][1];
				continue
			}
			if (u && !d) {
				await tr(x, y - 1)
			}
			if (d && !u) {
				await tr(x, y + 1)
			}
			if (!u && !d && !swcnt) {
				await tr(x, y + 1)
			}
			if (l && !r) {
				await tr(x - 1, y)
			}
			if (!l && r) {
				await tr(x + 1, y)
			}
			await func.sleep(.1)
		}
	}
}
export default main;
