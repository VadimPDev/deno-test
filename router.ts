import { getUsers,getUser,createUser, deleteUser, updateUser } from './controller.ts';
import {Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router()

router.get('/api/users',getUsers)
.get('/api/users/:id',getUser)
.post('/api/users',createUser)
.put('/api/users/:id',updateUser)
.delete('/api/users/:id',deleteUser)

export {router}