import express from "express"
import cors from "cors"
import productsRouter from "./core/routes/products";

const PORT = 8000;
const SERVER_MESSAGE = `Server started on port ${PORT}`

const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productsRouter)


app.listen(PORT, () => {
    console.log(SERVER_MESSAGE);
})