import {} from "dotenv/config"

const entry = {
    DB_CONNECTION: process.env.DB_CONNECTION,
    PORT: process.env.PORT,
}

export default entry