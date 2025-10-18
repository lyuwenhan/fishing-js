import variate from "./variate.js";
import func from "./func.js";
async function main () {
	while (true) {
		await func.clear();
		await func.print("1.转盘, 2.退出");
		await func.print("转盘消耗: 100累积钓鱼数量+1000金币 当前钓鱼数量: ", variate.data_saver.cnt, " 当前金币数量: ", variate.data_saver.money);
		await func.print("愚人节彩蛋: 20%");
		await func.print("大鱼诱饵: 20%");
		await func.print("钻石鱼: 1%");
		while (true) {
			const c = await func.getch();
			if (c == "1") {
				if (variate.data_saver.cnt < 100 && variate.data_saver.money < 1e3) {
					await func.print("获得成就: 江湖骗子");
					await func.sleep(1);
					break
				}
				if (variate.data_saver.cnt < 100) {
					await func.print("获得成就: 缺斤少两");
					await func.sleep(1);
					break
				}
				if (variate.data_saver.money < 1e3) {
					await func.print("获得成就: 老赖");
					await func.sleep(1);
					break
				}
				variate.data_saver.cnt -= 100;
				variate.data_saver.money -= 1e3;
				const ran = await func.random(1, 100);
				if (ran <= 20) {
					await func.print("获得愚人节彩蛋*1");
					await func.print("获得成就: 鱼人节快乐");
					variate.fish_man = true
				} else if (ran <= 40) {
					await func.print("大鱼诱饵*1");
					variate.big++
				} else if (ran <= 41) {
					await func.print("钻石鱼*1");
					await func.print("获得成就: 传说中的鱼");
					variate.diamond++
				} else {
					await func.print("谢谢惠顾")
				}
				await func.sleep(1);
				break
			} else if (c == "2") {
				return
			}
		}
	}
}
export default main;
