# Pre-requisites

1. Signup and Install [MongoDb](https://www.mongodb.com/try/download).
2. Download and Install [Nodejs](https://nodejs.org/en/download)
3. Install and setup [Golang](https://go.dev/doc/install)
4. Setup and install [Python3](https://www.python.org/downloads/)


# Setup Node Backend

1. Run `cd .\backend\node` to go inside the Node.js server folder.
2. Run `npm install` to install all the dependencies.
3. Create a new file named `.env` and add the environment variables according to `.env.sample` file.
4. Run `npm start` to start the node backend server.

# Setup Golang Backend

1. Run `cd .\backend\go` to go inside the Golang server folder.
2. Run `go mod download` to install all the dependencies.
3. Create a new file named `.env` and add the environment variables according to `.env.sample` file.
4. Run `go run main.go` to start the golang backend server.

# Setup Python Backend

1. Run `cd .\backend\python\security_header` to go inside the python server folder.
2. To create a virtual environment run `py -m venv flask`.
3. To activate the virtual environment run `.\flask\Scripts\activate`.
4. To install the required dependencies run `pip install -r requirements.txt`.
4. Finally, run `py .\app.py` to start the python backend server.

# Setup Frontend

1. Run `cd frontend` to go inside the frontend folder.
2. Run `npm install` to install all the dependencies.
3. Create a new file named `.env` and add the environment variables according to `.env.sample` file.
4. Run `npm start` to start the frontend backend server.
