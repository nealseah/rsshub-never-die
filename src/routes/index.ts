import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { StatusCode } from 'hono/utils/http-status'
import { Bindings } from '../types'
import { parseNodeUrls, randomPick } from '@/utils/helper'

const app = new Hono<{ Bindings: Bindings }>()

app.get('*', async (c) => {
    const { RSSHUB_NODE_URLS } = env(c)
    const allNodeUrls = parseNodeUrls(RSSHUB_NODE_URLS)
    const path = c.req.path
    const query = c.req.query()
    // 由于 Cloudflare Workers 的限制，fetch 一次最多并发 6 个，所以最多随机选择 5 个节点。
    // 添加默认节点，官方实例默认为第一个。
    // 随机选择5个节点，不包括默认节点。
    const nodeUrls = ['https://rsshub.app', ...randomPick(allNodeUrls, 5)].map((url) => {
        const _url = new URL(url)
        _url.pathname = path
        _url.search = new URLSearchParams(query).toString()
        return _url.toString()
    })
    // 并发请求，有一个成功就返回值
    const res = await Promise.any(nodeUrls.map((url) => fetch(url)))
    const data = await res.text()
    const contentType = res.headers.get('Content-Type') || 'application/xml'
    c.header('Content-Type', contentType)
    c.status(res.status as StatusCode)

    return c.body(data)
})

export default app
