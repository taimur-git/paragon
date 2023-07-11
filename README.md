## Installing dependencies

```bash
npm install
```

## Initialise Database

(run this command when model changes)

```bash
npx prisma db push
```
## Development

Runs in port:5172

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
You can preview the database at port:5555 with `npx prisma studio`.
You can create an ERD of the database with `npx prisma generate`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.