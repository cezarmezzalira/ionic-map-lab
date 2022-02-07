# Ionic Map Lab

In this project, I wanted to show how to implement Google Javascript API in a Ionic Angular application.

## This project uses:

- Ionic 6
- Angular 13
- Google Javascript API

I used a boilerplate from `ionic start` to get menu implementation and router implementation.

# How to run this project

First, you need to change the API KEY, modifies the value of variable `googleMapsAPIKEY` in the file `src>environments>enviroment.ts`.

To get an API KEY, follow the instructions of this post blog: [Devdatic Blog](https://devdactic.com/capacitor-google-maps-ionic/)

Now, with your API KEY in place, let's configure the environment of development:

### Installing git and curl

```sh
sudo apt update && sudo apt install git curl -y
```

### Installing Node Version Manager (nvm)

```sh
# Dowload and Install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Include variables to PATH
echo -e 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.bashrc

# Reload .bashrc with variables
source ~/.bashrc
```

## Install the last LTS version of Node.js

```sh
nvm install --lts
```

## Clone this repo

```sh
git clone git@github.com:cezarmzz/ionic-map-lab.git
```

## Install Ionic CLI

```sh
npm install -g @ionic/cli
```

## Access project folder and install dependencies

```sh
cd ionic-map-lab
npm install
```

## Run the project

```sh
ionic serve
```

If all it's ok, you will see a map in Map menu.
