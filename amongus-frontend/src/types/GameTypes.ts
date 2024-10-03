export interface Task {

  id: string;
  title: string;
  location: string;
  description: string;
  status: boolean;
  difficulty: string;

}
export interface Player {
  
  username: string;
  id: string;
  taskList: Task[];
  alive: boolean;
  role: string;

}


