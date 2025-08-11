import Joi from 'joi'
import {BookGenres, BookStatus, PickRecord} from "../model/Book.js";


export const BookDtoSchema = Joi.object({
    title: Joi.string().min(2).trim().required().empty(""),
    author: Joi.string().min(1).trim().required().empty(""),
    genre: Joi.string().valid(...Object.values(BookGenres)).required(),
    quantity: Joi.number().optional(),
})


export const BookGenresDtoSchema = Joi.object({
    genre: Joi.string().valid(...Object.values(BookGenres)).trim().required(),
})

export const BookIdDtoSchema = Joi.object({
    id: Joi.string().length(24).required(),
})

export const BookPickUpDtoSchema = Joi.object({
    id: Joi.string().length(24),
    reader: Joi.string().min(3).trim().required(),

})
