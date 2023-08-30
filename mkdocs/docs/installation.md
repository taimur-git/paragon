# Installation

## Prerequisites

Feel free to skip this step if you already have git and node+npm installed on your device.

Install the latest version of [git](https://git-scm.com/) 

Install the latest version of [nodeJS](https://nodejs.org/en) 



First, clone the repository on your local machine.

```bash
git clone https://github.com/taimur-git/paragon.git
```

This will create a folder called paragon, `cd paragon` to continue.

## Installing dependencies

Next we have to install all the node modules. This will take a while.

```bash
npm install
```

## Initialise Database

```bash
npm run env
npm run update
```

If at any point you decide to change the database, run `npm run update`.

## Development

Runs in port:5172

```bash
npm run dev
```

## Building

To create a production version of your app: `npm run build`

You can preview the production build with `npm run preview`.

You can preview the database at port:5555 with `npm run db`.

You can create an ERD of the database with `npm run erd`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Testing

To run some test cases: `npm run test` or `npm run test:ui`
