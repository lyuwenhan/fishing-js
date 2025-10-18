import variate from "./variate.js";
import func from "./func.js";
async function shop0 () {
	if (variate.data_saver.aqcnt > 30) {
		variate.data_saver.aqcnt = 30
	}
	while (true) {
		await func.clear();
		await func.print("1.升级上钩速度, 2.升级钓鱼收益, 3.脱钩概率, 4.购买清洁剂, 5.升级清洁剂, 6.升级水族馆容量, 7.购买烤箱, 8.返回。");
		await func.print("上钩速度: ");
		if (variate.data_saver.level == variate.max_level) {
			await func.print("    等级已满")
		} else {
			await func.print("    当前平均时间: ", await func.to_stringf((variate.mintime[variate.data_saver.level] + variate.maxtime[variate.data_saver.level]) / 2), ", 升级后平均时间: ", await func.to_stringf((variate.mintime[variate.data_saver.level + 1] + variate.maxtime[variate.data_saver.level + 1]) / 2));
			await func.print("    升级花费: $", variate.cost[variate.data_saver.level + 1] + ", 当前金币数量: $" + variate.data_saver.money)
		}
		await func.print("钓鱼收益: ");
		if (variate.data_saver.get_level == variate.max_level2) {
			await func.print("    等级已满")
		} else {
			await func.print("    当前平均收益: ", await func.to_stringf((variate.minget[variate.data_saver.get_level] + variate.maxget[variate.data_saver.get_level]) / 2), ", 升级后平均收益: " + await func.to_stringf((variate.minget[variate.data_saver.get_level + 1] + variate.maxget[variate.data_saver.get_level + 1]) / 2));
			await func.print("    升级花费: $", variate.cost2[variate.data_saver.get_level + 1], ", 当前金币数量: $", variate.data_saver.money)
		}
		await func.print("脱钩概率: ");
		if (variate.data_saver.slip == 0) {
			await func.print("    等级已满")
		} else {
			if (variate.data_saver.slip > 10) {
				variate.data_saver.slip /= 10;
				variate.data_saver.slip *= 10;
				await func.print("    当前脱钩概率: ", variate.data_saver.slip, "%, 升级后脱钩概率: ", variate.data_saver.slip - 10, "%");
				await func.print("    升级花费: $100, 当前金币数量: $", variate.data_saver.money)
			} else if (variate.data_saver.slip > 5) {
				variate.data_saver.slip = 10;
				await func.print("    当前脱钩概率: 10%, 升级后脱钩概率: 5%");
				await func.print("    升级花费: $100, 当前金币数量: $", variate.data_saver.money)
			} else if (variate.data_saver.slip > 1) {
				await func.print("    当前脱钩概率: ", variate.data_saver.slip, "%, 升级后脱钩概率: ", variate.data_saver.slip - 1, "%");
				await func.print("    升级花费: $100, 当前金币数量: $", variate.data_saver.money)
			} else {
				await func.print("    当前脱钩概率: 1%, 升级后脱钩概率: 0%");
				await func.print("    升级花费: $500, 当前金币数量: $", variate.data_saver.money)
			}
		}
		await func.print("清洁剂: ");
		await func.print("    当前清洁剂个数: ", variate.data_saver.cleaning_ball);
		await func.print("    购买花费: $10, 当前金币数量: $", variate.data_saver.money);
		await func.print("清洁效率: ");
		if (variate.data_saver.cleaning_sub >= 10) {
			await func.print("    等级已满")
		} else {
			await func.print("    当前清洁效率: 一次降低", variate.data_saver.cleaning_sub, "级, 升级后清洁效率: 一次降低", variate.data_saver.cleaning_sub + 1, "级");
			await func.print("    购买花费: $30, 当前金币数量: $", variate.data_saver.money)
		}
		await func.print("水族馆容量: ");
		if (variate.data_saver.aqcnt >= 30) {
			await func.print("    等级已满")
		} else {
			await func.print("    当前水族馆容量: ", variate.data_saver.aqcnt, "只, 升级后水族馆容量: ", variate.data_saver.aqcnt + 2, "只");
			await func.print("    购买花费: $", (variate.data_saver.aqcnt + 2) * 100, ", 当前金币数量: $", variate.data_saver.money)
		}
		await func.print("烤箱数量: ");
		if (variate.data_saver.roast >= 3) {
			await func.print("    数量已满")
		} else {
			await func.print("    当前烤箱数量: ", variate.data_saver.roast);
			if (variate.data_saver.roast < 1) {
				await func.print("    购买花费: $50, 当前金币数量: $", variate.data_saver.money)
			} else if (variate.data_saver.roast == 1) {
				await func.print("    购买花费: $1000, 当前金币数量: $", variate.data_saver.money)
			} else {
				await func.print("    购买花费: $2000, 当前金币数量: $", variate.data_saver.money)
			}
		}
		while (true) {
			let type = await func.getch();
			if (type == "1") {
				if (variate.data_saver.level == variate.max_level) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.money < variate.cost[variate.data_saver.level + 1]) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.money -= variate.cost[++variate.data_saver.level];
					await func.print("购买成功");
					await func.sleep(.5);
					break
				}
			} else if (type == "2") {
				if (variate.data_saver.get_level == variate.max_level2) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.money < variate.cost2[variate.data_saver.get_level + 1]) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.money -= variate.cost2[++variate.data_saver.get_level];
					await func.print("购买成功");
					await func.sleep(.5);
					break
				}
			} else if (type == "3") {
				if (variate.data_saver.slip == 0) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.slip == 1) {
					if (variate.data_saver.money < 500) {
						await func.print("金币不足");
						await func.sleep(.5);
						break
					} else {
						variate.data_saver.money -= 500;
						variate.data_saver.slip = 0;
						await func.print("购买成功");
						await func.sleep(.5);
						break
					}
				} else {
					if (variate.data_saver.money < 100) {
						await func.print("金币不足");
						await func.sleep(.5);
						break
					} else {
						variate.data_saver.money -= 100;
						if (variate.data_saver.slip > 10) {
							variate.data_saver.slip -= 10
						} else if (variate.data_saver.slip > 5) {
							variate.data_saver.slip = 5
						} else if (variate.data_saver.slip > 0) {
							variate.data_saver.slip -= 1
						}
						await func.print("购买成功");
						await func.sleep(.5);
						break
					}
				}
			} else if (type == "4") {
				if (variate.data_saver.money < 10) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.cleaning_ball++;
					await func.print("购买成功");
					variate.data_saver.money -= 10;
					break
				}
			} else if (type == "5") {
				if (variate.data_saver.cleaning_sub == 10) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.money < 30) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.money -= 30;
					variate.data_saver.cleaning_sub++;
					await func.print("购买成功");
					await func.sleep(.5);
					break
				}
			} else if (type == "6") {
				if (variate.data_saver.aqcnt == 30) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.money < (variate.data_saver.aqcnt + 2) * 100) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.money -= (variate.data_saver.aqcnt + 2) * 100;
					variate.data_saver.aqcnt += 2;
					await func.print("购买成功");
					await func.sleep(.5);
					break
				}
			} else if (type == "7") {
				if (variate.data_saver.roast >= 3) {
					await func.print("    数量已满");
					await func.sleep(.5);
					break
				} else {
					if (variate.data_saver.roast < 1) {
						if (variate.data_saver.money < 50) {
							await func.print("金币不足");
							await func.sleep(.5);
							break
						} else {
							variate.data_saver.money -= 50;
							variate.data_saver.roast = 1;
							await func.print("购买成功");
							await func.sleep(.5);
							break
						}
					} else if (variate.data_saver.roast == 1) {
						if (variate.data_saver.money < 1e3) {
							await func.print("金币不足");
							await func.sleep(.5);
							break
						} else {
							variate.data_saver.money -= 1e3;
							variate.data_saver.roast = 2;
							await func.print("购买成功");
							await func.sleep(.5);
							break
						}
					} else {
						if (variate.data_saver.money < 2e3) {
							await func.print("金币不足");
							await func.sleep(.5);
							break
						} else {
							variate.data_saver.money -= 2e3;
							variate.data_saver.roast = 3;
							await func.print("购买成功");
							await func.sleep(.5);
							break
						}
					}
				}
			} else if (type == "8") {
				return
			}
		}
	}
}
async function shop1 () {
	while (true) {
		await func.clear();
		await func.printa("这里是超级商店, 可以买一些特殊的商品。");
		await func.clear();
		await func.print("1.甩杆倍速, 2.升级大鱼概率, 3.返回。");
		await func.print("甩杆倍速: ");
		if (variate.data_saver.stime >= 10) {
			await func.print("    等级已满")
		} else {
			await func.print("    当前倍速: ", variate.data_saver.stime, "倍, 升级后游戏倍速: ", variate.data_saver.stime + 1, "倍");
			await func.print("    升级花费: $1000, 当前金币数量: $", variate.data_saver.money)
		}
		await func.print("大鱼概率: ");
		if (variate.data_saver.bf >= 60) {
			await func.print("    等级已满")
		} else {
			await func.print("    当前大鱼概率: ", variate.data_saver.bf, "%, 升级后大鱼概率", variate.data_saver.bf + 5, "%");
			await func.print("    升级花费: $1000, 当前金币数量: $", variate.data_saver.money)
		}
		while (true) {
			let type = await func.getch();
			if (type == "1") {
				if (variate.data_saver.stime >= 10) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.money < 1e3) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.money -= 1e3;
					variate.data_saver.stime++;
					await func.print("购买成功");
					await func.sleep(.5);
					break
				}
			} else if (type == "2") {
				if (variate.data_saver.bf >= 60) {
					await func.print("等级已满");
					await func.sleep(.5);
					break
				} else if (variate.data_saver.money < 1e3) {
					await func.print("金币不足");
					await func.sleep(.5);
					break
				} else {
					variate.data_saver.money -= 1e3;
					variate.data_saver.bf += 5;
					await func.print("购买成功");
					await func.sleep(.5);
					break
				}
			} else if (type == "3") {
				await func.sleep(.5);
				return
			}
		}
	}
}
async function main () {
	while (true) {
		await func.clear();
		await func.print("1.普通商店, 2.超级商店, 3.退出。");
		let type;
		while (true) {
			type = await func.getch();
			if (type == "1") {
				await shop0();
				break
			} else if (type == "2") {
				await shop1();
				break
			} else if (type == "3") {
				return
			}
		}
	}
}
export default main;
