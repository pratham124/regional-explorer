<img src="src\img\favicon_io\favicon-32x32.png">
<h1>Regional Explorer</h1>
<p>An application where users can explore regions and the countries that reside them. Users can view a map, image of the flag, and information about each country. The information provided include the country's area, population, residents, official name, continent and capital city. Users can bookmark a country and visit them under bookmarks tab. The bookmarks are stored in local storage, so users can bookmark and view them at a later time. Valid regions are Africa, Americas, Asia, Europe and Oceania. Restcountries API was used to fetch data on region and countries. While googlemaps API was used to generate a map based on the coordinates of a country.</p>

<h1>Installation</h1>
<h2>Download the ZIP or:</h2>
<span>https://github.com/pratham124/regional-explorer.git</span>
<h2>Then install dev dependencies:</h2>
<span>npm install</span>
<h2>Then run the script:</h2>
<span>npm run build</span>

<h1>File Structure</h1>
<p>The files that are used to build the application are located inside the src folder. The src folder contains 3 folders:img, js and sass. 
<h2>img</h2>
<p>The folder stores all images that are used in the application</p>
<h2>sass</h2>
<p>Contains all the css used to build the application. Different components are seperated into different files</p>
<h2>js</h2>
<p>The folder is split into three different components. The client-side of the application is inside the client folder, while the server-side is located in the server folder. The third componenet controller.js, is used as a bridge that connects the client-side and server-side into one to make the application run.
