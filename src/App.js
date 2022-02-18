import React, { useState } from 'react';
import "./index.css";
//mock data
import data from "./data.json";
//components
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';
import moment from 'moment';

function App() {
  const [toDoList, setToDoList] = useState(data);
  const [presentId, setpresentId] = useState('-1');
  const [userInput, setUserInput] = useState('');

  const [userDate, setUserDate] = useState(new Date());
  const [userPriority, setUserPriority] = useState('');

  const myFunction = (item) => {
    console.log(item);
  }

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task };
    });
    setToDoList(mapped);
  }
  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const saveTask = (userInput, dueDate, priority, id = -1) => {
    // console.log(dueDate);
    // return;
    // console.log("To Do List: ");
    toDoList.forEach(myFunction);
    let copy = [...toDoList];
    //console log for copy
    //  console.log("Copy list: " );
    copy.forEach(myFunction);

    let [currentTask] = toDoList.filter(task => task.id === Number(id));
    let currentId = id == -1 ? toDoList.length + 1 : id;
    // console.log("CURRENT ID:" + currentId);

    if (id == -1) {
      // console.log("ADD TASK ID: "+ currentId);
      //add new task
      copy = [...copy, {
        id: toDoList.length + 1,
        task: userInput,
        complete: false,
        dueDate: dueDate,
        priority: priority
      }];
    }

    else if (id == currentTask.id && !currentTask.complete) {
      let ind = toDoList.findIndex((task) => {
        return task.id && task.id === presentId;
      });
      // console.log("Index of edit task: " + ind);

      let task = {
        id: presentId,
        task: userInput,
        complete: toDoList[ind].complete,
        dueDate: (moment(userDate).format("YYYY-MM-D")),
        priority: userPriority
      }

      // console.log("Task Updated");
      // console.log("Task Updated id: " + task.id);
      // console.log("Task Updated task:" + task.task);
      // console.log("Task Updated complete:" + task.complete);
      // console.log("Task Updated dueDate:" + task.dueDate);
      // console.log("Task Updated priority:" + task.priority);

      copy.splice(ind, 1, task);
    }
    setToDoList(copy);
    let updated = toDoList;
    // console.log("EDITED COPY") 
    updated.forEach(myFunction);
  }

  const editTask = (id) => {
    let [current] = toDoList.filter(task => task.id === Number(id));
    if (!current.complete) {
      setpresentId(current.id ? current.id : -1);
      setUserInput(current.task ? current.task : "");
      setUserDate(moment(current.dueDate ? current.dueDate : "").format("YYYY-MM-D"));
      setUserPriority(current.priority ? current.priority : "Medium");
      return current;
    }
    else {
      alert("Cannot Edit an already completed task");
      return;
    }
  }
  return (
    <div className="todoListMain">
      <div align="center" className="App">
        <Header />
        <ToDoList
          toDoList={toDoList}
          handleToggle={handleToggle}
          handleFilter={handleFilter}
          editTask={editTask}
        />
        <ToDoForm
          saveTask={saveTask}
          presentId={presentId}
          setpresentId={setpresentId}
          userInput={userInput}
          userDate={userDate}
          userPriority={userPriority}
          setUserInput={setUserInput}
          setUserDate={setUserDate}
          setUserPriority={setUserPriority}
        />
      </div>
    </div>
  );
}

export default App;
