import React, { useEffect, useState } from 'react'
import { FaCheck, FaPencilAlt, FaSearch, FaTrash } from "react-icons/fa";
import { CreateTask, DeletTask, GetTask, UpdateCheckTask } from './Api';
import { notify } from './Utils';
import { ToastContainer } from 'react-toastify';





function TaskManager() {

  let [input, setinput] = useState('')
  let [task, settask] = useState([])
  let [copyTask, setcopyTask] = useState([])
  let [updateTask, setupdateTask] = useState(null)


//direct
  const handltask = (item) => {
    if (updateTask && input) {
       const obj = {
         TaskName:input,
         isDone:updateTask.isDone,
         _id:updateTask._id
       }
       handlUpdateTask(obj)
      console.log('update input')
    } else if (updateTask === null && input) {
      handlInputSubmit()
      console.log(`add input`)
    }
  }



  useEffect(() => {
    if (updateTask) {
      setinput(updateTask.TaskName)
    }
  }, [updateTask])




//input search
  let handlInputSubmit = async () => {
    let obj = {
      TaskName: input,
      isDone: false
    }
    console.log(obj)

    try {
      const { message, success } = await CreateTask(obj)
      if (success) {
        notify(message, 'success')
      } else {
        notify(message, 'error')
      }
      fetchAllTasks()
    } catch (err) {
      console.log(err)
      notify('failed to create task', 'error')
    }
    setinput('')
  }



//update Task
  const handlUpdateTask = async (item) => {
     const {_id, TaskName, isDone} = item
    const obj = {
      TaskName,
      isDone: isDone
    }
    console.log(obj)

    try {
      const { message, success } = await UpdateCheckTask(_id, obj)
      if (success) {
        notify(message, 'success')
      } else {
        notify(message, 'error')
      }
      fetchAllTasks()
    } catch (err) {
      console.log(err)
      notify('failed to update task', 'error')
    }

  }



//getting all task
  const fetchAllTasks = async () => {
    try {
      const { data } = await GetTask()
      settask(data)
      setcopyTask(data)
      console.log(data)
    } catch (err) {
      console.log(err)
      notify('failed to create task', 'error')
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [])



//delete function
  const handlDelete = async (id) => {
    try {
      const { message, success } = await DeletTask(id)
      if (success) {
        notify(message, `success`)
      } else {
        notify(message, `error`)
      }
      fetchAllTasks()
    } catch (err) {
      console.log(err)
      notify('failed to delete', 'error')
    }
  }


//line through 
  const handlCheck = async (item) => {

    const { _id, TaskName, isDone } = item
    const obj = {
      TaskName,
      isDone: !isDone
    }
    try {
      const { message, success } = await UpdateCheckTask(_id, obj)
      if (success) {
        notify(message, 'success')
      } else {
        notify(message, 'error')
      }
    } catch (err) {
      console.log(err)
      notify('failed to update task', 'error')
    }

    fetchAllTasks()
  }

//search functionality
  const handlsearch = async(e) => {
      const term = e.target.value
      const oldTask = [...copyTask]
      const result = oldTask.filter((item)=>item.TaskName.toLowerCase().includes(term))
      settask(result)
  }


  return (
    <div className='d-flex flex-column align-items-center w-75 m-auto border'>
      <h1 className='mb-4'>Task Manager</h1>
      <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
        <div className='input-group flex-grow-1 me-1'>
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            type="text"
            className='form-control me-1'
            placeholder='Add a new Task' />
          <button onClick={handltask} className='btn btn-success me-2'>+</button>
        </div>

        <div className='input-group flex-grow-1'>
          <input className='form-control' type="text" onChange={handlsearch}/>
          <span className='input-group-text' onClick={handlsearch}><FaSearch /></span>
        </div>
      </div>


      {/* List of items */}
      {
        task.map((item) => (
          <div key={item._id} className='d-flex mt-4 w-100 border'>
            <div className=" p-2 bg-light w-100  rounded-3 ">
              <span className={item.isDone === true ? 'text-decoration-line-through' : ''}>{item.TaskName}</span>
            </div>
            <div className="d-flex">
              <button onClick={() => handlCheck(item)} className='btn btn-primary'><FaCheck /></button>
              <button onClick={() => setupdateTask(item)} className='btn btn-warning'><FaPencilAlt /></button>
              <button onClick={() => handlDelete(item._id)} className='btn btn-danger'><FaTrash /></button>
            </div>
          </div>

        ))
      }



      {/* Tostify */}
      <ToastContainer
        position='top-right'
        autoClose={3000}
      />
    </div>


  )
}

export default TaskManager