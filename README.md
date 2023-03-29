# Helsinki Bike Trip Tracker

This is a React application that shows bike trips in the Helsinki area. The application is built using Node.js and MariaDB database to store and retrieve data. It allows users to add new trips or delete existing ones, and displays the most recent 100 trips by default. However, in the station view, the real total number of trips is shown for all months or a particular month selected.
## Requirements

Before you can run this application, you will need to have the following installed on your computer:

- [Node.js](https://nodejs.org/) - version 14 or later is recommended
- [Docker](https://www.docker.com/)
- [git lfs](https://git-lfs.com/) follow the instruction to activate git-lfs
## Installation

You can download the directory containing the application code as a ZIP file by clicking the green "Code" button above and selecting "Download ZIP". Alternatively, you can clone the directory using the following command:

```powershell
git clone https://github.com/Cynthilizy/dev_academy_exercise.git
cd dev_academy_exercise
```
The required Node modules are included in a subfolder in the directory, so you do not need to install them separately using `npm install`.
## Running the Application
Once you have cloned or downloaded the repository, navigate to the root directory of the project and make sure that Docker is running on your computer.

To build the Docker image for this application, run the following command:

```powershell
docker build -t dev_academy_exercise .
```

Note that the last dot in the command is required and represents the build context. Make sure Docker is running on your computer before running the above command.

Once the image is built, you can start the application by running the following command:

```powershell
npm start
```
This will start the server on port 3070 and application on port 3000 (http://127.0.0.1:3000). All the files needed to run the application are included in the directory, so there is no need to run the `docker run` command. to terminate just enter Ctrl+C in the terminal window twice to stop server and client.
### Author
Cynthia Sarah Monkap



