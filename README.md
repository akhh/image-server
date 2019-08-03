# Udagram Image Filtering Microservice

The Microservice takes an image from a public URL and filters it and outputs the filtered image.

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### API Endpoint

The API-endpoint is `/image/`. Provide a variable to filter the image `?url=public-image-url`. [Example on AWS EB](http://image-server-dev.eu-west-1.elasticbeanstalk.com/image/?url=https://www.gstatic.com/webp/gallery/4.sm.jpg)
