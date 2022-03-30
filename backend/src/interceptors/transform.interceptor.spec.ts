import { TransformInterceptor } from './transform.interceptor'

const interceptor = new TransformInterceptor()
const callHandler = {
    handle: jest.fn()
}

describe('SubscriberInterceptor', () => {
    it('should be defined', () => {
        expect(interceptor).toBeDefined()
    })
    it('interceptor response correctly', async () => {
        callHandler.handle.mockResolvedValueOnce('response')
        const actualValue = await interceptor.intercept(null, callHandler)

        expect(actualValue).toBe('response')
        expect(callHandler.handle).toBeCalledTimes(1)
    })
})