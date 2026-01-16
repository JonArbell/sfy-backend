import { Request, Response } from "express";
import { asAuthRequest } from "../shared/utils/auth-request.util";
import { ShortenUrlRequestDTO } from "../dtos/request/shorten-url-request.dto";
import urlService from "../services/url-service";
import { buildPageable } from "../shared/utils/pagination.util";
import { trackVisitor } from "../shared/utils/track-visitor.util";

const shortenUrl = async (req : Request, res : Response) => {

    const authRequest = asAuthRequest(req);

    const body = req.body as ShortenUrlRequestDTO;

    const response = await urlService.shortenUrlByUserId(body, authRequest.user.id);

    res.status(201).json({
        message : 'success',
        data : response
    });

}

const getAllUrls = async (req : Request, res : Response) => {

    const authRequest = asAuthRequest(req);

    const pageable = buildPageable(req.query);

    const response = await urlService.findAllIncludeUrlAccessByUserId(
        authRequest.user.id,
        pageable
    );

    res.status(200).json({
        message : 'success',
        data : response.data,
        meta : {
            totalPages : response.totalPages,
            totalElements : response.totalElements,
            size : pageable.size,
            currentPage : pageable.currentPage
        }
    });

}

const deleteUrlById = async (req : Request, res : Response)=> {

    const id = req.params.id as string;

    const authRequest = asAuthRequest(req);

    const response = await urlService.deleteUrlByIdAndUserId(
        id,
        authRequest.user.id
    );

    console.log(response);

    res.status(200).json(
        {
            data : response,
            message : 'success'
        }
    )

}

const getUrlByShort = async (req : Request, res : Response) => {

    const shortUrl = req.params.shortUrl as string;

    const visitorRequest = trackVisitor(req);

    const response = await urlService.viewOriginalByShort(shortUrl, visitorRequest);

    res.redirect(response);
}

export default {
    getUrlByShort,
    getAllUrls,
    shortenUrl,
    deleteUrlById
}