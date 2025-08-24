import Joi from 'joi'
import {BookGenres, BookStatus, PickRecord} from "../model/Book.js";


export const BookDtoSchema = Joi.object({
    title: Joi.string().min(2).trim().required().empty(""),
    author: Joi.string().min(1).trim().required().empty(""),
    genre: Joi.string().valid(...Object.values(BookGenres)).required(),
    quantity: Joi.number().optional(),
})

export const ReaderDtoSchema = Joi.object({
    id: Joi.string().length(24),
    userName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required(),
    birthdate: Joi.string().isoDate().required(),
})

export const ChangePassDtoSchema = Joi.object({
    //id:Joi.number().positive().max(999999999).min(100000000).required(),
    id: Joi.string().length(24).required(),
    oldPassword: Joi.string().alphanum().min(8).required(),
    newPassword: Joi.string().alphanum().min(8).required(),
})

// export const ChangePasswordDtoSchema = Joi.object({
//     id: Joi.number().positive().max(999999999).min(100000000).required(),
//     password: Joi.string().alphanum().min(8).required(),
// })

export const BookGenresDtoSchema = Joi.object({
    genre: Joi.string().valid(...Object.values(BookGenres)).trim().required(),
})

export const BookIdDtoSchema = Joi.object({
    id: Joi.string().required(), // return length(36)
})

export const BookPickUpDtoSchema = Joi.object({
    id: Joi.string(), // return length(36)
    reader: Joi.string().min(3).trim().required(),

})

