import { User } from './interfaces.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";
let users:User[] = [
    {id:'1',name:"Vadim"},
    {id:'2',name:"Elena"}
]
export const getUsers = ({response}:{response:any})=>{
    response.status = 200
    response.body = {
        users
    }
}
export const getUser = ({response,params}:{response:any,params:{id:string}})=>{
    const user:User | undefined = users.find(user => user.id === params.id)

    if(user){
        response.status = 200
        response.body ={user}
    }else{
        response.status = 404
        response.body ={message:'User not found'}
    }
}

export const createUser = async({response,request}:{response:any,request:any})=>{
    const body = await request.body()

    if(!request.hasBody){
        response.status = 400
        response.body = {message:"invalid datta"}
    }else{
        const user:User = body.value
        user.id = v4.generate()
        users.push(user)
        response.status = 201
        response.body = {user}        
    }
}

export const updateUser = async({response,params,request}:{response:any,request:any,params:{id:string}}) =>{
    
    const user:User | undefined = users.find(u => u.id === params.id)
    if(user){
        const body = await request.body()
        users = users.map(u => u.id === user.id ? {...u,...body.value} : u)
        response.status = 200
        response.body = {users}
    }else{
        response.status = 404
        response.body = {message:"User not found"}
    }
}

export const deleteUser = ({params,response}:{params:{id:string},response:any})=>{
    users =users.filter(u => u.id !== params.id)

    response.status = 200
    response.body ={users}
}