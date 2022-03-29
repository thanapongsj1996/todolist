export type JsonResponse = {
    status: boolean
    data?: any
    err?: string
}

export function successResponse(data: any): JsonResponse {
    return { status: true, data }
}

export function failedResponse(msg: string): JsonResponse {
    return { status: false, err: msg }
}