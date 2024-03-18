This is the Web UI for moonshot.

## Getting Started

### Prerequisites

- Node.js verion 20.11.1 LTS and above
- Python version 3.11 and above
- [projectmoonshot-imda version 0.2.2](https://pypi.org/project/projectmoonshot-imda/)

## Install Moonshot Web Api

- Follow the instructions in https://pypi.org/project/projectmoonshot-imda/
- Before spinning up the Python module, create a `.env` file containing these variables:

```
# Update values to your preference

APP_ENVIRONMENT=PROD
LOG_LEVEL=INFO
HOST_ADDRESS=127.0.0.1 # The interface the server will bind to
HOST_PORT=5000

# This is the uri of the Web UI webhook. In the next step, if Web UI listens on a different port, update this uri accordingly and restart.

MOONSHOT_UI_CALLBACK_URL=http://localhost:3000/api/v1/benchmarks/status 
```
- Place the .env file under the directory where the Python module will be run from, and execute command 

`python -m moonshot web_api`

## Install Web UI

- git clone this project into the local machine.

`git clone git@github.com:moonshot-admin/moonshot-ui.git`

- In the cloned project root directly (/moonshot-ui), create `.env` file containing this variable:

```
# This should be the URL of the Moonshot Web Api module. Check the startup logs to determine the host and url

MOONSHOT_API_URL=http://127.0.0.1:5000
```
- Install dependencies - `npm install`


## Building

From the same project root folder, run `npm run build`

## Run

After building, spin up the Web UI with this command

`npm start`

Access the Web UI from browser `http://localhost:3000`