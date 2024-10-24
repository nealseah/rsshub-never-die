
/**
 * 将 RSSHUB_NODE_URLS 解析为数组
 *
 * @author CaoMeiYouRen
 * @date 2024-10-24
 * @export
 * @param value
 */
export function parseNodeUrls(value: string) {
    return [...new Set(value.split(',')
        .map((url) => url.trim())),
    ] // 去重
        .map((url) => new URL(url).toString()) // 格式化 URL
}

/**
 * 从给定的数组中随机挑选五个不重复的项
 * 采用洗牌算法，概率相同
 *
 * @author CaoMeiYouRen
 * @date 2024-10-24
 * @export
 * @template T
 * @param array
 * @param count
 */
export function randomPick<T>(array: T[], count: number): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, count)
}
