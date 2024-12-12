import { DefaultEventsMap } from 'socket.io';
import { io, Socket } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3010';
const URL = import.meta.env.VITE_API_URL;

export let socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(URL, {
    auth: {
      token: localStorage.getItem("logged_in")
    }
  });

export function recreateSocket() {
  socket = io(URL, {
    auth: {
      token: localStorage.getItem("logged_in")
    }
  });
}
// export const socket = io(URL, {
//     autoConnect: false
//   });