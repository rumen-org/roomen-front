import { http } from 'msw'
import { setupWorker } from 'msw/browser'

// 2. Describe network behavior with request handlers.
const worker = setupWorker(
    http.post('/login', async ({ request }) => {
        const info = await request.formData()
        console.log('test',info)
    })

)

await worker.start()


export { worker };
