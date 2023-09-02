# Welcome to GetBanano 👋

GetBanano is a fully featured faucet creator, that allows everyone to create a Banano faucet without any coding experience

## Folders

GetBanano consists of two folders:

- Root -> serves the faucets (pointed to *.getbanano.cc)
- Manager -> Tool to create/manage faucets (pointed to getbanano.cc)

## Libraries used

GetBanano uses MongoDB as its database, bcrypt is used for hashing the faucet secret, and AES256-GCM is used for encrypting the seeds and proxy check keys.

## Setting up
 Note for people interested in creating a faucet. **You do not need to run your own instance of the whole product, head over to [getbanano.cc](https://getbanano.cc) and create your faucet hassle-free today!**

1. Install libraries

	**Make sure Node.js and NPM is installed on your machine**

		$ cd manager && cd client && npm i & cd ../server && npm i && cd ../../root && cd client && npm i & cd ../server && npm i

2. Configure

- Copy the .env.example in both root and manager's server directories to an `.env` file, and fill it out according to the comments there.

- Fill out the `config.json` in both root and manager's client directories as explained below.

	- `managerApi` => URL to the manager server.
	- `faucetsHubDomain` => The domain on which faucets subdomains are generated on. eg. `kaffinpx.mom`
	- `rootApi` => URL to your root server, any faucet subdomain can be used. eg. `https://api.yourdomain.gg`

- Go to the main directory of Getbanano and run `npm run buildFrontends`.

- After that, make your way to both root and manager's server directories, and run the `index.js` files there, I recommend using [pm2](https://pm2.io/) to make it easier to manage the running files.
