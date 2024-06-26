# NJLinks
NJLinks es una simple aplicación web, basada en [este proyecto](https://github.com/fazt/nodejs-mysql-links), con las que puedes guardar y editar enlaces web.

## Variables
### Cliente
- `NEXT_PUBLIC_DIR`, la dirección http del servidor.
### Servidor
- `PORT`, el puerto del servidor, por default es `4200`.
- `SECRET`, la clave JWT secreta.
- `ORIGIN`, la dirección http del cliente.
- `DB_HOST`, el host de la base de datos postgreSQL.
- `DB_PORT`, el puerto de la base de datos postgreSQL.
- `DB_USER`, el nombre de usuario de la base de datos postgreSQL.
- `DB_PASS`, la contraseña de la base de datos postgreSQL.
- `DB_DATABASE`, el nombre de la base de datos postgreSQL.

## Instalación Manual
```
git clone -b njlinks-local --single-branch https://github.com/santiagocuebas/links-next14-app
cd links-next14-app
pnpm run todo

git clone -b links-api-local --single-branch https://github.com/santiagocuebas/nodejs-links-api 
cd nodejs-links-api 
pnpm run todo
```

## Recursos
- Node.js
- Express
- PostgreSQL
- TypeScript
- Nextjs
- Tailwind.css
