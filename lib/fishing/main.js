import variate from "./variate.js";
import func from "./func.js";
import story from "./story.js";
import parkour from "./parkour.js";
import checkpoint from "./checkpoint.js";
import spin from "./spin.js";
import shop from "./shop.js";
import beat from "./beat.js";
import fishing from "./fishing.js";
async function main () {
	await func.clear();
	await story();
	if (!await checkpoint.chp()) {
		await func.sleep(1);
		await func.choose()
	}
	await checkpoint.save();
	await func.sleep(1);
	while (true) {
		await func.clear();
		await func.print("1.开始钓鱼, 2.进入商店, 3.抽奖, 4.挑战, 5.退出, 其他输入无效。");
		while (true) {
			const type = await func.getch();
			if (type == "1") {
				await fishing();
				break
			} else if (type == "2") {
				await shop();
				break
			} else if (type == "3") {
				await spin();
				break
			} else if (type == "4") {
				if (variate.dataSaver.tryLevel == 0) {
					await parkour()
				} else if (variate.dataSaver.tryLevel == 1) {
					await beat()
				} else {
					await func.clear();
					await func.printa("已完成挑战")
				}
				break
			} else if (type == "5") {
				await func.clear();
				throw new Error("Exited")
			}
		}
		await checkpoint.save();
		await func.sleep(.5)
	}
}
export default main;
