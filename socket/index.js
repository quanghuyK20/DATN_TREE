const io = require("socket.io")(8901, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true,
    secure: true,
    transports: ['websocket', 'polling'],
  },
  allowEIO4: true,
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(users.find((user) => user.userId === userId));
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  console.log(socket.id);
  const socketID = socket.id
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log("line 35",userId);
    addUser(userId, socketID);
    console.log('new users', users);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("users line 43",users)
    console.log(receiverId);
    debugger
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});