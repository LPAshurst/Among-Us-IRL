import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3010';

export let socket = io(URL, {
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