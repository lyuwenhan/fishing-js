import variate from "./variate.js";
import func from "./func.js";
async function check_name (username) {
	return /^[\da-zA-Z_-]+$/.test(username)
}
async function decode (data) {
	variate.data_saver = {
		...variate.svariate(),
		...data ?? {}
	}
}
async function getUser (username, pwd) {
	try {
		const store = JSON.parse(window.localStorage.getItem("gameStorage") || "{}");
		return store[username] || null
	} catch {
		return null
	}
}
async function checkUser (username) {
	try {
		const store = JSON.parse(window.localStorage.getItem("gameStorage") || "{}");
		return Boolean(store[username] || null)
	} catch {
		return false
	}
}
async function setUser (username, pwd, saveData) {
	let cursave = {};
	try {
		cursave = JSON.parse(window.localStorage.getItem("gameStorage") || "{}")
	} catch {
		cursave = {}
	}
	cursave[username] = saveData;
	window.localStorage.setItem("gameStorage", JSON.stringify(cursave))
}
async function save () {
	await setUser(variate.username, variate.pwd, JSON.stringify(variate.data_saver))
}
async function login () {
	let pwd;
	await func.clear();
	await func.print("登录");
	await func.printnl("用户名: ");
	let username = await func.getline(1);
	if (!await check_name(username)) {
		await func.print("用户名不合法");
		await func.sleep(1);
		return false
	}
	await func.printnl("密码: ");
	pwd = await func.getline(2);
	await func.clear();
	await decode(await getUser(username, pwd));
	await func.sleep(1);
	variate.pwd = pwd;
	variate.username = username;
	return true
}
async function regi () {
	let pwd, pwd2;
	await func.clear();
	await func.print("注册");
	await func.printnl("用户名: ");
	let username = await func.getline(1);
	if (!await check_name(username)) {
		await func.print("用户名不合法");
		await func.sleep(1);
		return false
	}
	if (await checkUser(username)) {
		await func.print("用户已存在");
		await func.sleep(1);
		return false
	}
	await func.printnl("密码: ");
	pwd = await func.getline(2);
	await func.printnl("请确认密码: ");
	pwd2 = await func.getline(2);
	if (pwd !== pwd2) {
		await func.print("两次密码不一致");
		await func.sleep(1);
		return false
	}
	await func.clear();
	await func.print("注册成功");
	variate.pwd = pwd;
	variate.username = username;
	return true
}
async function chp () {
	while (true) {
		await func.clear();
		await func.print("1.登录, 2.注册, 3.退出");
		let c;
		do {
			c = await func.getch()
		} while (c !== "1" && c !== "2" && c !== "3");
		if (c == "3") {
			await func.clear();
			throw new Error("Exited")
		} else if (c == "1" ? await login() : await regi()) {
			return c == "1"
		}
	}
}
export default {
	save,
	chp
};
