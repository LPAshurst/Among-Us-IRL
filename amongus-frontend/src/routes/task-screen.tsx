import { useState } from "react";
import Task from "../ui/task";

export default function TaskScreen() {
  
  const [tasks, updateTasks] = useState<Task[]>([]);


  async function request_list() {
    console.log("clicked")
    try {
      const response = await fetch("http://localhost:3010/api/tasks");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const arr: Task[] = []
      Object.values(data.result).forEach(value => arr.push(value as Task))

      updateTasks(arr)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }



  return (

    
    <main className="flex self-start h-screen  flex-col">
      <div className="flex h-20 w-screen items-end rounded-lg bg-blue-900 p-4 md:h-52">
        <h1>Task List</h1>
      </div>
      <button onClick={request_list} className="bg-blue-900 w-40 h-50 self-center mt-40"> Click me!!! </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h2 className="text-neutral-200">{task.name}</h2>
            <p className="text-neutral-200">Location: {task.location}</p>
            <p className="text-neutral-200">Difficulty: {task.difficulty}</p>
          </li>
        ))}
      </ul>

    </main>
    
  )

}