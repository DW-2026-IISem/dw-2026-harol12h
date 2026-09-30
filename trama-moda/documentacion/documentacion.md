### ## 2.1 Inicializar npm y scripts

**Criterios de este sub-ítem**

- [ ] `package.json` creado
- [ ] Scripts `build` y `dev` definidos

```bash
mkdir app-storelab-express
cd app-storelab-express
npm init -y
mkdir -p docs
```

**PARCHE** — `package.json` **ya existe** (lo creó `npm init -y`).

- **Dentro de** `"scripts"`: deja solo (o añade) `build` y `dev` como abajo.
- **Debajo de** `"license"` (o al mismo nivel que `"scripts"`): asegúrate de `"type": "commonjs"`.

Estado esperado de esas claves:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --watch src --ext ts --exec ts-node -- src/server.ts"
  },
  "type": "commonjs"
}
```

```bash
node -e "const p=require('./package.json'); console.log(p.scripts)"
```

---

## 2.2 Estructura de carpetas (features)

**Criterios de este sub-ítem**

- [ ] Carpetas de infra y features creadas según el árbol

```bash
mkdir -p \
  src/config \
  src/database/seeders \
  src/routes \
  src/features/business/client
```
![](a/image.png)

```text
src/
├── config/
├── database/
│   └── seeders/          # solo carpeta (ISS-02 §3.3); runner en ISS-04
├── routes/
├── features/
│   └── business/
│       └── client/       # más features en ISS-06…08
└── server.ts             # §2.5
```

| Carpeta | Uso |
|---------|-----|
| `features/business/<entidad>/` | model + controller + routes (+ seeder, swagger, http, associations) |
| `database/seeders/` | counts + SeedersRunner (`npm run db:seed`) |
| `routes/index.ts` | Agregador de features |
| `config/` · `database/` | Arranque e infraestructura |

**Seeders (patrón del lab)**

| Pieza | Dónde |
|-------|-------|
| Por entidad | `src/features/business/<entidad>/<entidad>.seeder.ts` |
| Runner + counts | `src/database/seeders/{index,counts}.ts` → `npm run db:seed` |
| Datos falsos | `@faker-js/faker` |

```bash
find src -type d | sort
```
---

## 2.3 Dependencias base (Express + TypeScript)

**Criterios de este sub-ítem**

- [ ] `express`, `cors`, `dotenv`, `morgan` instalados
- [ ] `typescript`, `ts-node`, `nodemon`, `@types/*` instalados

```bash
npm install express@^5.2.1 cors@^2.8.6 dotenv@^17.4.2 morgan@^1.12.1

npm install -D typescript@~5.9.2 ts-node@^10.9.2 nodemon@^3.1.14 \
  @types/node@^22.20.3 @types/express@^5.0.6 \
  @types/cors@^2.8.19 @types/morgan@^1.9.10
```
![](a/1.png)

> TypeScript en **5.9.x** por compatibilidad con `ts-node`.

```bash
npm ls --depth=0
```

---

## 2.4 TypeScript (`tsconfig.json`)

**Criterios de este sub-ítem**

- [ ] `tsconfig.json` con `rootDir: ./src`, `outDir: ./dist`, `strict: true`

```bash
: > tsconfig.json
cat >> tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "commonjs",
    "target": "ES2020",
    "lib": ["ES2020"],
    "types": ["node"],
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "strict": true,
    "skipLibCheck": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
```
![](a/2.png)
```bash
test -f tsconfig.json && npx tsc --showConfig | head -20
```

---

## 2.5 Servidor y App (esqueleto HTTP)

**Criterios de este sub-ítem**

- [ ] Existen `src/server.ts` y `src/config/index.ts`
- [ ] `App` define `settings`, `middlewares`, `routes`, `dbConnection`, `listen` (placeholders OK)
### 2.5.1 `src/server.ts`

```bash
: > src/server.ts
cat >> src/server.ts << 'EOF'
import { App } from './config/index';

async function main() {
    const app = new App();
    await app.listen();
}

main();
EOF
```
![](a/3.png)

### 2.5.2 `src/config/index.ts` (esqueleto)

> En ISS-01 el App es **esqueleto**. Los imports de modelos, associations, Routes,
> Swagger y el `sync` completo se añaden con **PARCHE** en ISS-02…08.
> El archivo **final** consolidado aparece al cierre de ISS-08.

```bash
: > src/config/index.ts
cat >> src/config/index.ts << 'EOF'
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
var cors = require("cors");

dotenv.config();

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    // ISS-03 §4.3
  }

  private async dbConnection(): Promise<void> {
    // ISS-02 / ISS-03
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get('port')}`);
  }
}
EOF
```
![](a/4.png)

### Verificación del ISS-01

```bash
npx tsc --noEmit
find src -type f | sort
```

### Cierre del ISS

```bash
npm run dev
```
![](a/5.png)
---

# 3. ISS-02 — Infraestructura de base de datos

**Objetivo:** drivers + `.env` + módulo Sequelize + carpeta `seeders/`.  
**Bloqueado por:** ISS-01.

### Criterios de aceptación (ISS-02) — consolidados

- [ ] **3.1** Paquetes Sequelize/drivers instalados; existe `.env` con `DB_ENGINE` y bloques de motores
- [ ] **3.2** Existe `src/database/db.ts` exportando `sequelize`, `getDatabaseInfo`, `testConnection`
- [ ] **3.3** Existe carpeta `src/database/seeders/` **sin** lógica implementada aún
- [ ] `npx tsc --noEmit` OK

---

## 3.1 Drivers Sequelize y `.env`

**Criterios de este sub-ítem**

- [ ] `sequelize`, `mysql2`, `pg`, `pg-hstore`, `tedious`, `oracledb` instalados
- [ ] `.env` con `PORT`, `DB_ENGINE`, MySQL/Postgres/MSSQL/Oracle

```bash
npm install sequelize@^6.37.8 mysql2@^3.24.4 pg@^8.23.0 pg-hstore@^2.3.4 \
  tedious@^20.0.0 oracledb@^7.0.1
npm install -D @types/sequelize@^6.12.0
```
![](a/6.png)

```bash
: > .env
cat >> .env << 'EOF'
PORT=4000

# Variable para seleccionar el motor de base de datos
DB_ENGINE=mysql

# Configuración para MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_NAME=trama_moda


# Configuración para PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_NAME=almacen_2025_iisem_node
POSTGRES_PORT=5432

# Configuración para SQL Server
MSSQL_HOST=localhost
MSSQL_USER=sa
MSSQL_PASSWORD=password
MSSQL_NAME=almacen_2025_iisem_node
MSSQL_PORT=1433

# Configuración para Oracle
ORACLE_HOST=localhost
ORACLE_USER=ALMACENDB_ADMIN
ORACLE_PASSWORD=password
ORACLE_NAME=xe
ORACLE_PORT=1521

EOF
```
![](a/7.png)

```bash
test -f .env && grep DB_ENGINE .env
npm ls sequelize mysql2 --depth=0
```
![](a/8.png)

---

## 3.2 Configuración Sequelize (`database/db.ts`)

**Criterios de este sub-ítem**

- [ ] Archivo `src/database/db.ts` creado
- [ ] Exporta `sequelize`, `getDatabaseInfo`, `testConnection`

```bash
: > src/database/db.ts
cat >> src/database/db.ts << 'EOF'
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  dialect: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

const dbConfigurations: Record<string, DatabaseConfig> = {
  mysql: {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_NAME || "test",
    port: parseInt(process.env.MYSQL_PORT || "3306")
  },
  postgres: {
    dialect: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_NAME || "test",
    port: parseInt(process.env.POSTGRES_PORT || "5432")
  }
};

const selectedEngine = process.env.DB_ENGINE || "mysql";
const selectedConfig = dbConfigurations[selectedEngine];

if (!selectedConfig) {
  throw new Error(`Motor de base de datos no soportado: ${selectedEngine}`);
}

console.log(`🔌 Conectando a base de datos: ${selectedEngine.toUpperCase()}`);

export const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedConfig.dialect as any,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const getDatabaseInfo = () => {
  return {
    engine: selectedEngine,
    config: selectedConfig,
    connectionString: `${selectedConfig.dialect}://${selectedConfig.username}@${selectedConfig.host}:${selectedConfig.port}/${selectedConfig.database}`
  };
};

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conexión exitosa a ${selectedEngine.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error(`❌ Error de conexión a ${selectedEngine.toUpperCase()}:`, error);
    return false;
  }
};
EOF
```
![](a/9.png)

```bash
test -f src/database/db.ts && npx tsc --noEmit
```
![](a/10.png)
---

## 3.3 Carpeta seeders (reservada)

**Criterios de este sub-ítem**

- [ ] `src/database/seeders/` existe (la lógica llega en ISS-04)
- [ ] `src/database/seeders/` existe **sin** `*.seeder.ts` ni runner

```bash
mkdir -p src/database/seeders
# opcional: touch src/database/seeders/.gitkeep
```

```bash
test -d src/database/seeders && echo OK
```
![](a/11.png)

### Verificación del ISS-02

```bash
npx tsc --noEmit
test -f src/database/db.ts && test -f .env && test -d src/database/seeders
```
![](a/12.png)

### Cierre del ISS

```bash
npm run dev
```
> El servidor debe arrancar sin error. Detenerlo con Ctrl+C antes de continuar.
![](a/13.png)
---
# 4. ISS-03-A — Feature Client — fundación (modelo, esqueleto, HTTP, cableado)

**Nombre recomendado:** *Feature Client — fundación*  
**Objetivo:** dejar el feature listo para CRUD: modelo con columnas obligatorias, esqueleto controller/routes, carpeta `http/`, agregador y sync.  
**Bloqueado por:** ISS-02.

### Criterios de aceptación (ISS-03-A)

- [ ] **4.1** Modelo `client.model.ts` con `status` + `timestamps: true` + bcrypt
- [ ] **4.2** Controller/routes esqueleto (sin CRUD aún en este sub-ítem pedagógico; el repo ya puede tener CRUD de ISS-03-B…E)
- [ ] **4.3** Carpeta `features/business/client/http/` creada
- [ ] **4.4** `routes/index.ts` + `config` importan modelo, conectan BD y hacen `sync`
- [ ] Con BD: `npm run dev` → conexión OK + sync OK + tabla `clients`

---

## 4.1 Modelo Client

**Criterios**

- [ ] `src/features/business/client/client.model.ts`
- [ ] Enum `active`/`inactive`, default `inactive`; `timestamps: true`

```bash
npm install bcryptjs@^3.0.3
npm install -D @types/bcryptjs@^3.0.0
```
![](a/14.png)

## 4.1 Modelo Client

```bash
: > src/features/business/client/client.model.ts
cat >> src/features/business/client/client.model.ts << 'EOF'
Client.init(
{
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull:false
  },

  numero_documento:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
  },

  nombre:{
    type: DataTypes.STRING,
    allowNull:false
  },

  telefono:{
    type: DataTypes.STRING
  },

  email:{
    type: DataTypes.STRING,
    unique:true
  },

  status:{
    type: DataTypes.ENUM(
      "active",
      "inactive"
    ),
    defaultValue:"active"
  }
},
{
  sequelize,
  tableName:"clients",
  timestamps:true
}
);
EOF
```
![](a/15.png)

## 4.2 Esqueleto controller / routes + carpeta HTTP

**Criterios**

- [ ] Archivos `client.controller.ts` y `client.routes.ts` existen (esqueleto)
- [ ] Carpeta `src/features/business/client/http/` existe

```bash
mkdir -p src/features/business/client/http
```
![](a/16.png)


> El CRUD se completa en ISS-03-B…E. Aquí se reserva la carpeta `http/` para archivos `.http` (REST Client) con leyenda **SIN AUTH**.

```bash
: > src/features/business/client/client.controller.ts
cat >> src/features/business/client/client.controller.ts << 'EOF'
import { Request, Response } from "express";
import { Client, ClientI } from "./client.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class ClientController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const clients = await Client.findAll({
        where: { status: "active" }
      });
      res.status(200).json({ clients });
    } catch (error) {
      res.status(500).json({ error: "Error fetching clients", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const client = await Client.findByPk(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ error: "Error fetching client", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as ClientI;
      const client = await Client.create({
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        status: body.status ?? "active"
      });
      res.status(201).json({ client });
    } catch (error) {
      res.status(500).json({ error: "Error creating client", detail: String(error) });
    }
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as ClientI;
      const client = await Client.findByPk(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      await client.update({
        tipo_documento: body.tipo_documento,
        numero_documento: body.numero_documento,
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        status: body.status ?? client.status
      });

      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ error: "Error updating client (PUT)", detail: String(error) });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<ClientI>;
      const client = await Client.findByPk(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      await client.update(body);
      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ error: "Error updating client (PATCH)", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const client = await Client.findByPk(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      await client.destroy();
      res.status(200).json({ message: "Client permanently deleted", id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting client", detail: String(error) });
    }
  }

  /** Eliminación lógica → status = inactive */
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const client = await Client.findByPk(id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      await client.update({ status: "inactive" });
      res.status(200).json({ message: "Client deactivated (logical delete)", client });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating client", detail: String(error) });
    }
  }
}
EOF
```
![](a/17.png)

### Crear Rutas de Cliente

```bash
: > src/features/business/client/client.routes.ts
cat >> src/features/business/client/client.routes.ts << 'EOF'
import { Application } from "express";
import { ClientController } from "./client.controller";

export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================

    // getAll & create
    app
      .route("/api/clientes")
      .get(this.clientController.getAll.bind(this.clientController))
      .post(this.clientController.create.bind(this.clientController));

    // getOne, update (PUT/PATCH) & delete físico
    app
      .route("/api/clientes/:id")
      .get(this.clientController.getOne.bind(this.clientController))
      .put(this.clientController.updatePut.bind(this.clientController))
      .patch(this.clientController.updatePatch.bind(this.clientController))
      .delete(this.clientController.deletePhysical.bind(this.clientController));

    // delete lógico
    app
      .route("/api/clientes/:id/deactivate")
      .patch(this.clientController.deleteLogical.bind(this.clientController));
  }
}
EOF
```
![](a/18.png)

### Crear Archivos de Pruebas HTTP
```bash
: > src/features/business/client/http/clients.get.http
cat >> src/features/business/client/http/clients.get.http << 'EOF'
### Feature Client — GET ALL / GET ONE
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000
@id = 1

# @name getAllClients
GET {{baseUrl}}/api/clientes

###

# @name getOneClient
GET {{baseUrl}}/api/clientes/{{id}}
EOF
```
![](a/19.png)

```bash
: > src/features/business/client/http/clients.create.http
cat >> src/features/business/client/http/clients.create.http << 'EOF'
### Feature Client — CREATE
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000

# @name createClient
POST {{baseUrl}}/api/clientes
Content-Type: application/json

{
  "tipo_documento": "CC",
  "numero_documento": "1098765432",
  "nombre": "Carlos Mendoza",
  "telefono": "3001234567",
  "email": "carlos.mendoza@example.com",
  "status": "active"
}
EOF
```

```bash
: > src/features/business/client/http/clients.update.http
cat >> src/features/business/client/http/clients.update.http << 'EOF'
### Feature Client — UPDATE (PUT / PATCH)
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000
@id = 1

# @name updateClientPut
PUT {{baseUrl}}/api/clientes/{{id}}
Content-Type: application/json

{
  "tipo_documento": "CC",
  "numero_documento": "1098765432",
  "nombre": "Carlos Mendoza Actualizado",
  "telefono": "3009876543",
  "email": "carlos.mendoza@example.com",
  "status": "active"
}

###

# @name updateClientPatch
PATCH {{baseUrl}}/api/clientes/{{id}}
Content-Type: application/json

{
  "telefono": "3011112233"
}
EOF
```

```bash
: > src/features/business/client/http/clients.delete.http
cat >> src/features/business/client/http/clients.delete.http << 'EOF'
### Feature Client — DELETE físico / DELETE lógico
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000
@id = 1

# @name deleteClientLogical
PATCH {{baseUrl}}/api/clientes/{{id}}/deactivate

###

# @name deleteClientPhysical
DELETE {{baseUrl}}/api/clientes/{{id}}
EOF
```

```bash
: > src/routes/index.ts
cat >> src/routes/index.ts << 'EOF'
import { ClientRoutes } from "../features/business/client/client.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
}
EOF
```
-------------------------------------------------------------------

# 5. ISS-03-B — product — GetAll y GetOne

### Crear el Modelo de Producto

```bash
: > src/features/business/product/product.model.ts
cat >> src/features/business/product/product.model.ts << 'EOF'
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface ProductI {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Model {
  public id!: number;
  public nombre!: string;
  public precio!: number;
  public stock!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true
  }
);
EOF
```
![](a/20.png)

### Crear Controlador

```bash
: > src/features/business/product/product.controller.ts
cat >> src/features/business/product/product.controller.ts << 'EOF'
import { Request, Response } from "express";
import { Product, ProductI } from "./product.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class ProductController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: { status: "active" }
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Error fetching products", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error fetching product", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as ProductI;
      const product = await Product.create({
        nombre: body.nombre,
        precio: body.precio,
        stock: body.stock,
        status: body.status ?? "active"
      });
      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error creating product", detail: String(error) });
    }
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as ProductI;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      await product.update({
        nombre: body.nombre,
        precio: body.precio,
        stock: body.stock,
        status: body.status ?? product.status
      });

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error updating product (PUT)", detail: String(error) });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<ProductI>;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      await product.update(body);
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error updating product (PATCH)", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      await product.destroy();
      res.status(200).json({ message: "Product permanently deleted", id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      await product.update({ status: "inactive" });
      res.status(200).json({ message: "Product deactivated (logical delete)", product });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating product", detail: String(error) });
    }
  }
}
EOF
```
![](a/21.png)

### Crear Rutas (product.routes.ts)

```bash
: > src/features/business/product/product.routes.ts
cat >> src/features/business/product/product.routes.ts << 'EOF'
import { Application } from "express";
import { ProductController } from "./product.controller";

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    app
      .route("/api/productos")
      .get(this.productController.getAll.bind(this.productController))
      .post(this.productController.create.bind(this.productController));

    app
      .route("/api/productos/:id")
      .get(this.productController.getOne.bind(this.productController))
      .put(this.productController.updatePut.bind(this.productController))
      .patch(this.productController.updatePatch.bind(this.productController))
      .delete(this.productController.deletePhysical.bind(this.productController));

    app
      .route("/api/productos/:id/deactivate")
      .patch(this.productController.deleteLogical.bind(this.productController));
  }
}
EOF
```
![](a/22.png)

### HTTP — archivo nuevo
#### Obtener Productos

```bash
: > src/features/business/product/http/products.get.http
cat >> src/features/business/product/http/products.get.http << 'EOF'
### Feature Product — GET ALL / GET ONE
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000
@id = 1

# @name getAllProducts
GET {{baseUrl}}/api/productos

###

# @name getOneProduct
GET {{baseUrl}}/api/productos/{{id}}
EOF
```
![](a/23.png)

#### Crear productos
```bash
: > src/features/business/product/http/products.create.http
cat >> src/features/business/product/http/products.create.http << 'EOF'
### Feature Product — CREATE
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000

# @name createProduct
POST {{baseUrl}}/api/productos
Content-Type: application/json

{
  "nombre": "Camiseta Algodón Talla M",
  "precio": 45000.00,
  "stock": 20,
  "status": "active"
}
EOF
```
![](a/24.png)

#### Actualizar Producto

```bash
: > src/features/business/product/http/products.update.http
cat >> src/features/business/product/http/products.update.http << 'EOF'
### Feature Product — UPDATE (PUT / PATCH)
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000
@id = 1

# @name updateProductPut
PUT {{baseUrl}}/api/productos/{{id}}
Content-Type: application/json

{
  "nombre": "Camiseta Algodón Talla L",
  "precio": 48000.00,
  "stock": 15,
  "status": "active"
}

###

# @name updateProductPatch
PATCH {{baseUrl}}/api/productos/{{id}}
Content-Type: application/json

{
  "precio": 50000.00,
  "stock": 30
}
EOF
```
![](a/25.png)

#### Eliminar Producto
```bash
: > src/features/business/product/http/products.delete.http
cat >> src/features/business/product/http/products.delete.http << 'EOF'
### Feature Product — DELETE físico / DELETE lógico
### Leyenda: SIN AUTH
@baseUrl = http://localhost:4000
@id = 1

# @name deleteProductLogical
PATCH {{baseUrl}}/api/productos/{{id}}/deactivate

###

# @name deleteProductPhysical
DELETE {{baseUrl}}/api/productos/{{id}}
EOF
```
![](a/26.png)

-------------------------------------------------------------
# 6. ISS-03-c — sales — GetAll y GetOne

### Creacion de modelos `sale.model.ts`

```bash
: > src/features/business/sale/sale.model.ts
cat >> src/features/business/sale/sale.model.ts << 'EOF'
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";
import { Client } from "../client/client.model";

export interface SaleI {
  id?: number;
  client_id: number;
  fecha?: Date;
  monto_total: number;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Sale extends Model {
  public id!: number;
  public client_id!: number;
  public fecha!: Date;
  public monto_total!: number;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sale.init(
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "id"
      }
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  },
  {
    sequelize,
    tableName: "sales",
    timestamps: true
  }
);

// Relación entre Venta y Cliente
Client.hasMany(Sale, { foreignKey: "client_id", as: "sales" });
Sale.belongsTo(Client, { foreignKey: "client_id", as: "client" });
EOF
```
![](a/27.png)

### src/database/db.ts

```bash
: > src/database/db.ts
cat >> src/database/db.ts << 'EOF'
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  dialect: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

const dbConfigurations: Record<string, DatabaseConfig> = {
  mysql: {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
    username: process.env.MYSQL_USER || process.env.DB_USER || "root",
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
    database: process.env.MYSQL_NAME || process.env.DB_NAME || "trama-moda",
    port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || "3306")
  }
};

const selectedEngine = process.env.DB_ENGINE || "mysql";
const selectedConfig = dbConfigurations[selectedEngine];

if (!selectedConfig) {
  throw new Error(`Motor de base de datos no soportado: ${selectedEngine}`);
}

export const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedConfig.dialect as any,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conexión exitosa a ${selectedEngine.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error(`❌ Error de conexión:`, error);
    return false;
  }
};

export const syncDatabase = async (): Promise<void> => {
  try {
    require("../features/business/client/client.model");
    require("../features/business/product/product.model");
    require("../features/business/sale/sale.model");

    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente en MySQL");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
};
EOF
```
![](a/28.png)

### sale controller.ts

```bash
: > src/features/business/sale/sale.controller.ts
cat >> src/features/business/sale/sale.controller.ts << 'EOF'
import { Request, Response } from "express";
import { Sale } from "./sale.model";
import { Client } from "../client/client.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class SaleController {
  // GET ALL
  public async getAll(req: Request, res: Response) {
    try {
      const sales = await Sale.findAll({
        where: { status: "active" },
        include: [{ model: Client, as: "client", attributes: ["id", "nombre", "numero_documento"] }]
      });
      res.status(200).json({ sales });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sales", detail: String(error) });
    }
  }

  // GET ONE
  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const sale = await Sale.findByPk(id, {
        include: [{ model: Client, as: "client" }]
      });

      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      res.status(200).json({ sale });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale", detail: String(error) });
    }
  }

  // CREATE SALE (MAESTRO)
  public async create(req: Request, res: Response) {
    try {
      const { client_id, monto_total } = req.body;

      if (!client_id) {
        res.status(400).json({ error: "client_id is required" });
        return;
      }

      const client = await Client.findByPk(client_id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      const sale = await Sale.create({
        client_id,
        monto_total: monto_total || 0,
        fecha: new Date(),
        status: "active"
      });

      res.status(201).json({ sale });
    } catch (error) {
      res.status(500).json({ error: "Error creating sale", detail: String(error) });
    }
  }

  // DELETE LOGICAL
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const sale = await Sale.findByPk(id);
      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      await sale.update({ status: "inactive" });
      res.status(200).json({ message: "Sale deactivated", sale });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating sale", detail: String(error) });
    }
  }
}
EOF
```
![](a/29.png)

### sale.routes.ts

```bash
: > src/features/business/sale/sale.routes.ts
cat >> src/features/business/sale/sale.routes.ts << 'EOF'
import { Application } from "express";
import { SaleController } from "./sale.controller";

export class SaleRoutes {
  public saleController: SaleController = new SaleController();

  public routes(app: Application): void {
    app
      .route("/api/ventas")
      .get(this.saleController.getAll.bind(this.saleController))
      .post(this.saleController.create.bind(this.saleController));

    app
      .route("/api/ventas/:id")
      .get(this.saleController.getOne.bind(this.saleController));

    app
      .route("/api/ventas/:id/deactivate")
      .patch(this.saleController.deleteLogical.bind(this.saleController));
  }
}
EOF
```
![](a/30.png)

### Registrar en src/routes/index.ts

```
: > src/routes/index.ts
cat >> src/routes/index.ts << 'EOF'
import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductRoutes } from "../features/business/product/product.routes";
import { SaleRoutes } from "../features/business/sale/sale.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public saleRoutes: SaleRoutes = new SaleRoutes();
}
EOF
```
![](a/31.png)

### # 3. Registrar en src/config/index.ts
```bash
: > src/config/index.ts
cat >> src/config/index.ts << 'EOF'
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Routes } from "../routes";

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ project: "TramaModa", status: "running" });
    });

    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.productRoutes.routes(this.app);
    this.routePrv.saleRoutes.routes(this.app);
  }

  public async listen(): Promise<void> {
    const port = this.app.get("port");
    this.app.listen(port, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
    });
  }
}
EOF
```
![](a/32.png)