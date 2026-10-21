import React, { useEffect, useMemo, useState } from 'react'
import { tasks } from './data/Tasks'
import { v4 as uuid } from 'uuid';

const TaskCard = () => {
  const [Tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : tasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }, [Tasks]);



  const [Add, setAdd] = useState({
    id: uuid(),
    title: "",
    assignee: "",
    status: ""
  });

  const [buttonState, setButtonState] = useState("Add");

  const [Filter, setFilter] = useState("All");

  const filteredTask = Tasks.filter((task) => {

    if (Filter === "All") return Tasks;
    return task.status.toLowerCase() === Filter.toLowerCase();
  })


  const handleAdd = (e) => {
    const { value, name } = e.target;
    setAdd(prev => ({
      ...prev,
      [name]: value
    })
    );
  }


  const addTask = () => {
    // setAdd(...Tasks,Add);
    const newTask = {
      id: uuid(),
      title: Add.title,
      assignee: Add.assignee,
      status: Add.status
    }
    setTasks((prev) => [...prev, newTask])
    console.log(Tasks);
    setAdd({
      id: uuid(),
      title: "",
      assignee: "",
      status: ""
    })
    setFilter("All")
  }

  const handleDelete = (id) => {

    const deletedTask = Tasks.filter(task => task.id !== id);
    setTasks(deletedTask);
  }

  const handleEdit = (task) => {
    setAdd(task)
    setButtonState("update")
  }

  const cancelUpdate = () => {
    setAdd({
      id: uuid(),
      title: "",
      assignee: "",
      status: ""
    })
    setButtonState("Add")
  }

  const handleUpdate = () => {

    setTasks((currTask) => currTask.map((task) => {
      if (task.id === Add.id) {
        return Add;
      }
      return task;

    }))
    cancelUpdate();


  }

  return (

    <>

      <div className="cnt">
        <strong>TaskCard</strong>
        <div className="form">
          <label className="fld">
            <span>title:</span>
            <input type="text" name='title' value={Add.title} placeholder='enter the title' onChange={handleAdd} />
          </label>
          <label className="fld">
            <span>assignee</span>
            <input type="text" name='assignee' value={Add.assignee} placeholder='enter the name of assignee' onChange={handleAdd} />
          </label>
          <label className="fld">
            <span>status</span>
            <input type="text" name='status' value={Add.status} placeholder='enter the title' onChange={handleAdd} />
          </label>

          <div className="fld">
            {
              buttonState === "Add" ? <button onClick={addTask}>Add</button> : <span> <button onClick={handleUpdate}>update</button><button onClick={cancelUpdate}>cancel</button></span>
            }
          </div>


        </div>
        <div className="fltrs">
          <b>Filters :</b>
          <div className="btn-sec">
            <button className={Filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>All</button>
            <button className={Filter === "to do" ? "active" : ""} onClick={() => setFilter("to do")}>to do</button>
            <button className={Filter === "in progress" ? "active" : ""} onClick={() => setFilter("in progress")}>in progress</button>
            <button className={Filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
          </div>
        </div>

        <div className="task_card">

          {filteredTask.map(task => (
            <ul key={task.id} id={task.id}>
              <li>{task.title}</li>
              <li>{task.assignee}</li>
              <li>{task.status}</li>
              <li><button onClick={() => handleEdit(task)}>edit</button><button onClick={() => handleDelete(task.id)}>delete</button></li>
            </ul>
          ))}
        </div>
      </div>



    </>
  )
}

export default TaskCard