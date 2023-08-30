## Installing dependencies

```bash
npm install
```

## Initialise Database

```bash
npm run env
npm run update
```

If at any point you decide to change the database under prisma/schema.prisma, run `npm run update`.

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

To run some test cases: `npm run test` or `npm run test:ui`, runs in port:51204

## Documentation

To open the MkDocs documentation, run `npm run docs`. This will need `pip install mkdocs` on the root folder.