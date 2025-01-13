import app from "./app";
import { Config } from "./config";

const startServer = () => {
    try {
        app.listen(Config.PORT, () =>
            console.log(
                `Server listening. Go to http://localhost:${Config.PORT}`
            )
        );
    } catch (error) {
        console.log(`Error while initiating the server`);
        process.exit(1);
    }
};

startServer();
