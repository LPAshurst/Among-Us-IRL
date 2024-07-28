import { useState } from "react"

export default function TaskScreen() {
  
  const [text, updateText] = useState("")


  return (

    <main className="flex self-start h-screen">
      <div className="flex h-20 w-screen items-end rounded-lg bg-blue-900 p-4 md:h-52">
        <h1>Task List</h1>
      </div>
    </main>
    



  )

}