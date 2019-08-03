import express, { Request, Response, Router } from "express";

import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles, requireAuth } from "./util/util";
var path = require("path"),
  fs = require("fs");

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get("/image/", async (req: Request, res: Response) => {
    let { url } = req.query;

    // 1. validate the image_url query
    if (!url) {
      res.status(422).send("Please provide a URL");
    }
    // 2. call filterImageFromURL(image_url) to filter the image
    const result: string = await filterImageFromURL(url);

    // 3. send the resulting file in the response
    res.status(200).sendFile(result);

    // 4. deletes any files on the server on finish of the response
    const directoryPath = path.join(__dirname, "/util/tmp/");
    fs.readdir(directoryPath, (err: string, files: Array<string>) => {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      let filesToDelete: Array<string> = [];

      files.forEach(function(file: string) {
        filesToDelete.push(directoryPath + file);
      });

      deleteLocalFiles(filesToDelete);
    });
  });
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
