import variate from "./variate.js";
import func from "./func.js";

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
	setUser(variate.username, variate.pwd, variate.dataSaver)
}
async function login () {
	let username, pwd, pwd2;
	func.clear();
	func.print("登录");
	func.printnl("用户名: ");
	username = await func.getname(1);
	if (!func.checkName(username)) {
		func.print("用户名不合法");
		return false
	}
	func.printnl("密码: ");
	pwd = await func.getline(2);
	if (checkUser(username)) {
		variate.username = username;
		variate.pwd = pwd;
		func.clear();
		decode(getUser(username, pwd));
		func.print("登录成功")
	} else {
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
		await func.sleep(.5);
		await func.choose()
	}
	return true
}
export default {
	save,
	login
};
