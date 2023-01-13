/**
 * 工具包
 */

/**
 * 获取对象的原型类型
 * @param {Object} obj 待获取原型类型的对象
 * @returns
 */
export function getInstanceTypeof(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}
