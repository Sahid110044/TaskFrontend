import { API_URL } from "./Utils"


export const CreateTask = async(TaskObj)=>{
       const url = API_URL
       const option = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(TaskObj)
       }
       try{
        const res = await fetch(url,option)
        const data = await res.json()
        return data
       }catch(err){
         return err
       }
}



export const GetTask = async()=>{
       const url = API_URL
       const option = {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
       }
       try{
        const res = await fetch(url,option)
        const data = await res.json()
        return data
       }catch(err){
         return err
       }
}



export const DeletTask = async(id)=>{
       const url = `${API_URL}/${id}`
       const option = {
            method:'DELETE',
       }
       try{
         const res = await fetch(url,option)
         const data = await res.json()
         return data
       }catch(err){
         return err
       }
}



export const UpdateCheckTask = async(id, CheckBody)=>{
      const url = `${API_URL}/${id}`
      const option = {
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(CheckBody)
      }
      try{
        const res = await fetch(url, option)
        const data = await res.json()
        return data
      }catch(err){  
        return err
      }
}

