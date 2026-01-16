import { z } from "zod";
export const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = z.treeifyError(result.error);
        return res.status(400).json({
            message: "Validation failed",
            errors,
        });
    }
    req.body = result.data;
    next();
};
