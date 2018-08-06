# Genoa wiki map

The app display wikipedia locations data on a map,
the locations are located in a range of 10km from a fixed location

## Use the app

The map displays locations as markers

Marker are clusterized, to zoom on the markers of the cluster, click it

Click on a marker to show the location name and the wikipedia page link in an infobox in the map,
 and name and page images in the section at the bottom of the map

Click the hamburger icon or select it and press enter to open the search nav

Filter stations by name typing a query in the search text field

Click on the station name in the list or select it and press enter to show its data

Click the hamburger menu again to close the filter panel and show all stations on map

### Live version:

Browse to: (https://e-pl.github.io/neighborhood-map/)

### Run the project

 * download and unzip the compressed folder or clone the repository
 * install all project dependencies: `npm install`
 * preview the project: `npm run`, see below for solving CORS errors
 * build the project for production to enable service worker: `npm run build`
 
### Serve the built folder on your web server 

 * edit this line in package.json whith your server address:  `  "homepage": "https://e-pl.github.io/neighborhood-map/",`

### Serve the project locally

 * install serve to serve the built project: `npm install -g serve`
 * serve the built project: `serve -s build`
 * browse http://localhost:5000 

## Credits

### External data:

 * Locations data and images are fetched from wikipedia API

 * Map data by Google

### App

This project is part of the [Udacity](https://udacity.com) Nanodegree program

Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Use [react-google-maps](https://tomchentw.github.io/react-google-maps/) to render the map

The app is published on github pages with [gh-pages](https://www.npmjs.com/package/gh-pages)

Font-awesome icons and Google Fonts are used for styling

The map Marker Icons are made by SimpleIcon from [www.flaticon.com](https://www.flaticon.com/free-icon/map-marker_33622)

## Contributing

This project in an exercise for the Udacity Front End Web Developer Nanodegree program, therefore I will most likely not accept pull requests
