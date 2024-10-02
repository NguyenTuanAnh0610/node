import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required().trim().min(6).messages({
        "any.required": "Username la trung bat buoc",
        "string.empty": "Username khong duoc de trong",
        "string.min": "Username phai co it nhat 6 ky tu",
    }),
    email: Joi.string().required().trim().email().messages({
        "any.required": "Email la trung bat buoc",
        "string.empty": "Email khong duoc de trong",
        "string.email": "Email khong hop le",
    }),
    password: Joi.string().required().trim().messages({
        "any.required": "Password la trung bat buoc",
        "string.empty": "Password khong duoc de trong",
    }),
    confirmPassword: Joi.string().required().trim().valid(Joi.ref("password")).messages({
        "any.required": "Confirm password la trung bat buoc",
        "string.empty": "Confirm password khong duoc de trong",
        "any.only": "Confirm password phai trung voi password",
    }),
});

export const signinSchema = Joi.object({
    email: Joi.string().required().trim().email().messages({
        "any.required": "Email la trung bat buoc",
        "string.empty": "Email khong duoc de trong",
        "string.email": "Email khong hop le",
        "string.trim": "Email khong duoc chua khoang trang",
    }),
    password: Joi.string().required().trim().messages({
        "any.required": "Password la trung bat buoc",
        "string.empty": "Password khong duoc de trong",
        "string.trim": "Email khong duoc chua khoang trang",
    }),
})