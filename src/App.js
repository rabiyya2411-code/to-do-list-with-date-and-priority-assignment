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
  var [sorted, setSortedList] = useState(data);
  //for logging each item of the list in console
  const myFunction = (item) => {
    console.log(item);
  }
  const handleSort = () => {
    let filtered = toDoList.filter(task => {
      return task.dueDate;
    });
    console.log('Filtered')
    filtered.forEach(myFunction);

    let sortedFiltered = filtered.sort((a,b) => (a.dueDate > b.dueDate)? 1:-1);
    console.log('Sorted Filtered')
    sortedFiltered.forEach(myFunction);
    
    let unfiltered = toDoList.filter(task => {
      return !task.dueDate;
    });
    console.log('Filtered Out')
    unfiltered.forEach(myFunction);
    sorted = sortedFiltered.concat(unfiltered);
    // let toSort = filtered;
    setSortedList(sorted);
    setToDoList(sorted);
    console.log('After Sort')
    sorted.forEach(myFunction);
    //return sorted;
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
    toDoList.forEach(myFunction);
    let copy = [...toDoList];
    // copy.forEach(myFunction);
    let [currentTask] = toDoList.filter(task => task.id === Number(id));
    let currentId = id == -1 ? toDoList.length + 1 : id;

    if (id == -1) {
      //add new task
      copy = [...copy, {
        id: toDoList.length + 1,
        task: userInput,
        complete: false,
        dueDate: dueDate,
        priority: priority
      }];
    }

    else if (id == currentTask.id && !currentTask.complete) { //edit task
      let ind = toDoList.findIndex((task) => {
        return task.id && task.id === presentId;
      });
      let task = {
        id: presentId,
        task: userInput,
        complete: toDoList[ind].complete,
        dueDate: (moment(userDate).format("YYYY-MM-D")),
        priority: userPriority
      }
     copy.splice(ind, 1, task);
    }
    setToDoList(copy);
    // let updated = toDoList;
    // updated.forEach(myFunction);
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
          toSort = {sorted}
          handleToggle={handleToggle}
          handleFilter={handleFilter}
          editTask={editTask}
        />
        
        <button onClick={handleSort}>Sort by Due Date</button>
        <br></br>
        {/* <br></br> */}
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
