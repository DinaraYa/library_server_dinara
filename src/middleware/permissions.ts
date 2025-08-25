/*
PATCH/accounts/password => Roles.USER,
GET/accounts/reader/:id => Roles.USER, Roles.ADMIN
POST/accounts/
DELETE/:id
 */

import {Roles} from "../utils/libTypes.js";

export const routeRoles = {
    "POST/accounts": [Roles.USER],
    "GET/accounts/reader": [Roles.USER, Roles.ADMIN],
    "PATCH/accounts/update/password": [Roles.USER],
    "PATCH/accounts/update/profile": [Roles.USER],
    "DELETE/accounts": [Roles.USER, Roles.ADMIN]
}
