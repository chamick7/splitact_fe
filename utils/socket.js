import io from "socket.io-client";



export function getSocket () {
    
    if(process.env.NODE_ENV === 'production'){
        return io.connect('https://chat.splitact.com/')
        // return io.connect('http://localhost:9000/')


    } else {
        return io.connect('http://localhost:9000/')

    }

}

