# Installation

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

Create a `.env` file in the root directory, and with the following:

```bash
DATABASE_URL="file:./dev.db"
```
After that run the following:

```bash
npx prisma generate
```

Then this:

```bash
npx prisma db push
```

If at any point you decide to change the database, run the above command.

## Development

Runs in port:5172

```bash
npm run dev
```

## Building

To create a production version of your app: `npm run build`

You can preview the production build with `npm run preview`.

You can preview the database at port:5555 with `npx prisma studio`.

You can create an ERD of the database with `npx prisma generate`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.