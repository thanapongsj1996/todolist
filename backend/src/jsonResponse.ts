import { Response } from 'express'

type JsonResponse = {
    status: boolean
    data: any
}

function createResponse(status: boolean, data: any): JsonResponse {
    return {
        status,
        data
    }
}

export function successResponse(res: Response, httpStatus: any, data: any) {
    return res.status(httpStatus).json(createResponse(true, data))
}

export function failedResponse(res: Response, httpStatus: any) {
    return res.status(httpStatus).json(createResponse(false, null))
}