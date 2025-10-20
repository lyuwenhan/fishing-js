import variate from "./variate.js";
import func from "./func.js";

function checkName (username) {
	return /^[\a-zA-Z_\-][\a-zA-Z_\-0-9]*$/.test(username)
}

function decode (data) {
	variate.dataSaver = {
		...variate.svariate(),
		...data ?? {}
	}
}
var store;
try {
	store = func.toObject(JSON.parse(window.localStorage.getItem("gameStorage")))
} catch {
	store = {}
}
console.log(store);

function getUser (username) {
	return func.toObject(store[username])
}

function checkUser (username) {
	return Boolean(store[username])
}

function setUser (username, pwd, saveData) {
	store[username] = saveData;
	window.localStorage.setItem("gameStorage", JSON.stringify(store))
}

function save () {
	setUser(variate.username, variate.pwd, JSON.stringify(variate.dataSaver))
}
async function login () {
	let username, pwd;
	func.clear();
	func.print("登录");
	func.printnl("用户名: ");
	username = await func.getline(1);
	if (!checkName(username)) {
		func.print("用户名不合法");
		return false
	}
	func.printnl("密码: ");
	pwd = await func.getline(2);
	variate.username = username;
	variate.pwd = pwd;
	func.clear();
	decode(getUser(username, pwd));
	return true
}
async function regi () {
	let username, pwd, pwd2;
	func.clear();
	func.print("注册");
	func.printnl("用户名: ");
	username = await func.getline(1);
	if (!checkName(username)) {
		func.print("用户名不合法");
		return false
	}
	if (checkUser(username)) {
		func.print("用户已存在");
		return false
	}
	func.printnl("密码: ");
	pwd = await func.getline(2);
	func.printnl("请确认密码: ");
	pwd2 = await func.getline(2);
	if (pwd !== pwd2) {
		func.print("两次密码不一致");
		return false
	}
	variate.pwd = pwd;
	variate.username = username;
	func.clear();
	func.print("注册成功");
	return true
}
async function chp () {
	while (true) {
		func.clear();
		func.print("1.登录, 2.注册, 3.退出");
		let c;
		do {
			c = await func.getch()
		} while (c !== "1" && c !== "2" && c !== "3");
		if (c == "3") {
			func.clear();
			throw new Error("Exited")
		} else if (c == "1" ? await login() : await regi()) {
			return c == "1"
		}
		await func.sleep(.5)
	}
}
export default {
	save,
	chp
};
