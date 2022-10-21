console.log("JavaScript Funcional");
const socketClient = io();

let user;

Swal.fire({
    title:"Hola usuario",
    text:"Bienvenido, ingresa tu usuario",
    input: "text",
    allowOutsideClick:false
}).then(respuesta=> {
    console.log(respuesta)
    user = respuesta.value;
});

const campo = document.getElementById("messageField")
campo.addEventListener("keydown", (evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message", {username:user, message:campo.value})
    }
})

const messageContainer = document.getElementById("messageContainer")

//Recibir los mensajes de todos los usuarios por el servidor
socketClient.on("historico", (data)=>{
    let elementos="";
    data.forEach(item=>{
        elementos = elementos + `<p><strong>${item.username}</strong>:${item.message}</p>`;
        })
        messageContainer.innerHTML = elementos;
    });
    
    socketClient.on("newUser",()=>{
        Swal.fire({
            text:"Nuevo Usuario Conectado",
            toast:true
        })
    })