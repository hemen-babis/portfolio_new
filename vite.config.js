import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function apiChatProxy() {
  return {
    name: 'api-chat-proxy',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
          const { model = 'gpt-4o-mini', messages = [] } = body

          let provider = 'openai'
          if (/^gemini/i.test(model)) provider = 'gemini'

          let reply = '(no response)'
          if (provider === 'openai') {
            const key = process.env.OPENAI_API_KEY
            if (!key) throw new Error('Missing OPENAI_API_KEY')
            const r = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
              },
              body: JSON.stringify({
                model,
                messages,
                temperature: 0.7,
              }),
            })
            if (!r.ok) throw new Error(`OpenAI error: ${r.status}`)
            const j = await r.json()
            reply = j.choices?.[0]?.message?.content ?? reply
          } else if (provider === 'gemini') {
            const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
            if (!key) throw new Error('Missing GEMINI_API_KEY')
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${key}`
            const r = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ role: 'user', parts: messages.map(m => ({ text: `${m.role}: ${m.content}` })) }] }),
            })
            if (!r.ok) throw new Error(`Gemini error: ${r.status}`)
            const j = await r.json()
            reply = j.candidates?.[0]?.content?.parts?.[0]?.text ?? reply
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ reply }))
        } catch (e) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: String(e?.message || e) }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiChatProxy()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { hmr: { overlay: false } }
})
