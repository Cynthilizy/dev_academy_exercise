# Helsinki Bike Trip Tracker

This is a React application that shows bike trips and station information in the Helsinki area. The application is built using Node.js and sql database to store and retrieve data. It displays the most recent 100 trips from the database by default (which can be modified if needed), allows users to add new trips or delete existing ones. However, in the station view tab, the real total number of trips is shown for all months or a particular month selected when a station name is clicked from the station list.
Since i only had data for three months, you can only view info for june,july,August.
i have deployed my database and React application to google cloud so you can have access to view the webpage by following this link  [http://35.228.64.72:3000](http://35.228.64.72:3000)
the config file, model files, package.json file and server file have been updated to use google cloud instance. i have used pm2 in the google cloud compute engine instance amongst other settings to monitor the running process. also it is set to Norther-Europe region.
the database schema is in the docker-db folder (to give you an idea how the database was created using sql)
if you are here to get an idea to build something similar, feel free to clone or download this code.
view how the app works with this address `http://35.228.64.72:3000` preferably with google chrome, microsoft edge or mozilla firefox. incase of questions message author at cynthilizy@gmail.com
### Author
Cynthia Sarah Monkap



