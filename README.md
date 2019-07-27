# Quasar-NodeJS-Google-Drive

Upload and download files to Google Drive by using Quasar v1 and NodeJS API.

## Technologies:

- Quasar v1
- Vuex
- Axios
- NodeJS Express
- Google APIs
- OAuth2

## To run this project

To be able to connect with Google Drive, the NodeJS API must have a credentials file with all the permissions needed by your account.

### Google API

- Acess this [link](https://developers.google.com/drive/api/v3/quickstart/nodejs) and click on "ENABLE THE DRIVE API":
	
![node01](/docs/node01.JPG)

- If this window appears, give a name to your project, agree with the terms and services and click on "NEXT":

![node02](/docs/node02.JPG)

- Note the Cliend ID and Client Secret for your own knowledge and then click on "DOWNLOAD CLIENT CONFIGURATION" to download the "credentials.json" file:

![node03](/docs/node03.JPG)

### NodeJS API

- Put the "credentials.json" file inside the "node" folder:

![node03_2](/docs/node03_2.JPG)

- Open the terminal and download the packages:
```batch
	npm install
```

- Run the server:
```batch
	node .
```

- Copy the long URL displayed on the terminal:

![node04](/docs/node04.JPG)

- Paste it on a browser tab and access the google account page:

![node05](/docs/node05.JPG)

- If a warning screen appears, click on these links to proceed:

![node06](/docs/node06.JPG)

![node07](/docs/node07.JPG)

- Give all the permissions needed by the Quickstart app to your Google Drive account.

![node08](/docs/node08.JPG)

- Confirm all the permissions again:

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
```batch
	npm install
```
	
- Run the app:
```batch
	quasar dev
```
	
- At the main screen, press the "Upload File" button:

![quasar01](/docs/quasar01.JPG)
	
- Choose a file from your computer and press on "Upload" button:

![quasar02](/docs/quasar02.JPG)

- If a positive message has appeared, go back to the main screen and click on "List Files" button. Your file should be on the top of the list. It only shows the last 10 uploaded files.

![quasar03](/docs/quasar03.JPG)

- If you click on any file, you will be able to download it.

![quasar04](/docs/quasar04.JPG)