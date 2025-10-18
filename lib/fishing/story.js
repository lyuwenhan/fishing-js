import func from "./func.js";
async function main () {
	await func.clear();
	for (const i of ["2136年, 全球冰山融化了", "海平面上升了许多", "大部分城市被海平面淹没了", "你待在一个小岛上, 等待救援", "你每天只能钓鱼度日"]) {
		await func.printa(i)
	}
	await func.clear()
}
export default main;
