import { z } from "zod";

export const shortenUrlValidator = z.object({
    url : z.url(),
    password : z.string().min(5).max(15).optional(),
    expirationDate : z.iso.datetime().optional()
})

export type ShortenUrlRequestDTO = z.infer<typeof shortenUrlValidator>

