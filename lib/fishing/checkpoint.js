import variate from "./variate.js";
import func from "./func.js";
async function checkName (username) {
	return /^[\a-zA-Z_-][\a-zA-Z_-0-9]+$/.test(username)
}
async function decode (data) {
	variate.data_saver = {
		...variate.svariate(),
		...data ?? {}
	}
}
var store = await (async () => {
	try {
		const store = JSON.parse(window.localStorage.getItem("gameStorage") || "{}");
		return await func.toObject(store[username])
	} catch {
		return {}
	}
})();
async function getUser (username) {
	return await func.toObject(store[username])
}
async function checkUser (username) {
	return Boolean(store[username])
}
async function setUser (username, pwd, saveData) {
	store[username] = saveData;
	window.localStorage.setItem("gameStorage", JSON.stringify(store))
}
async function save () {
	await setUser(variate.username, variate.pwd, JSON.stringify(variate.data_saver))
}
async function login () {
	let username, pwd;
	await func.clear();
	await func.print("登录");
	await func.printnl("用户名: ");
	username = await func.getline(1);
	if (!await check_name(username)) {
		await func.print("用户名不合法");
		return false
	}
	await func.printnl("密码: ");
	pwd = await func.getline(2);
	variate.username = username;
	variate.pwd = pwd;
	await func.clear();
	await decode(await getUser(username, pwd));
	return true
}
async function regi () {
	let username, pwd, pwd2;
	await func.clear();
	await func.print("注册");
	await func.printnl("用户名: ");
	username = await func.getline(1);
	if (!await checkName(username)) {
		await func.print("用户名不合法");
		return false
	}
	if (await checkUser(username)) {
		await func.print("用户已存在");
		return false
	}
	await func.printnl("密码: ");
	pwd = await func.getline(2);
	await func.printnl("请确认密码: ");
	pwd2 = await func.getline(2);
	if (pwd !== pwd2) {
		await func.print("两次密码不一致");
		return false
	}
	variate.pwd = pwd;
	variate.username = username;
	await func.clear();
	await func.print("注册成功");
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
		await func.sleep(1);
	}
}
export default {
	save,
	chp
};
