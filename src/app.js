import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { manager } from "./productsManager.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.engine("handlebars", engine());
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars");

// routes

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

const allProducts= await manager.getProducts({});

  socketServer.on(`connection`, (socket) => {
    
  console.log(`cleinte conectado: ${socket.id}`);
  
  socket.emit(`allProducts`,allProducts)

  socket.on(`addProduct`, async (producto) => {
    
    const product = await manager.addProduct(producto);
    const productosActualizados = await manager.getProducts({});
    socket.emit(`productUpdate`, productosActualizados);


  });
  socket.on(`productDeleted`,async (id)=>{
    const deletedById= await manager.deleteProductById(+id);
    const productosTotal= await manager.getProducts({});
    console.log("adnadnosadas",deletedById);
    socket.emit(`productosNew`,productosTotal);
  })
});