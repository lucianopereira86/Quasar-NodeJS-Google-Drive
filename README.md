# Quasar-NodeJS-Google-Drive

Upload and download files to Google Drive by using Quasar v1 and NodeJS API.

## Technologies:

- Quasar v1
- Vuex
- Axios
- NodeJS Express
- Google API

## To run this project

### Google API

- Acess this link and click on "ENABLE THE DRIVE API":
	`https://developers.google.com/drive/api/v3/quickstart/nodejs`
	
![node01](/docs/node01.JPG)

- If this window appears, give a name for your project, agree with the terms and services and click on "NEXT":

![node02](/docs/node02.JPG)

- Click on "DOWNLOAD CLIENT CONFIGURATION" to download the "credentials.json" file:

![node03](/docs/node03.JPG)

### NodeJS API

- Put the "credentials.json" file inside the "node" folder:

![node03_2](/docs/node03_2.JPG)

- Open the terminal and download the packages:
	`npm install`

- Run the server:
	`node .`

- Copy the long URL displayed on the terminal:

![node04](/docs/node04.JPG)

- Paste it on a browser tab and access a google authentication page:

![node05](/docs/node05.JPG)

- If this warning screen appears, click on "Advanced" and on "Access Quickstart (not safe)"

![node06](/docs/node06.JPG)

![node07](/docs/node07.JPG)

- Give all permissions for the app Quickstart to your Google Drive account.

![node08](/docs/node08.JPG)

- Last confirmation screen. 

![node09](/docs/node09.JPG)

- Finally, copy the code and paste it on the terminal:

![node10](/docs/node10.JPG)

![node11](/docs/node11.JPG)

- The "token.json" file will be created inside the "node" folder:

![node12](/docs/node12.JPG)

- Stop the server and run it again. The last 10 files uploaded to your Google Drive will be listed, showing that the connection is working correctly:

![node13](/docs/node13.JPG)

### Quasar App

- Open the terminal inside the "quasar" folder and download the packages:
	`npm install`
	
- Run the app:
	`quasar dev`
	
- At the main screen, press the "Upload File" button:

![Alt Text](/docs/quasar01.JPG)