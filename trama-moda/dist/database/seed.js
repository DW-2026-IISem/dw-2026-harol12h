"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
// Obtener instancia de faker limpia y compatible
const fakerModule = require("@fakerjs/faker");
const faker = fakerModule.fakerES || fakerModule.faker || fakerModule;
// Modelos Auth
const user_model_1 = require("../features/auth/users/user.model");
const role_model_1 = require("../features/auth/roles/role.model");
const role_user_model_1 = require("../features/auth/role-users/role-user.model");
const sync_rbac_resources_1 = require("./sync-rbac-resources");
// Modelos Business
const branch_model_1 = require("../features/business/branch/branch.model");
const client_model_1 = require("../features/business/client/client.model");
const category_model_1 = require("../features/business/category/category.model");
const supplier_model_1 = require("../features/business/supplier/supplier.model");
const product_model_1 = require("../features/business/product/product.model");
const variant_model_1 = require("../features/business/variants/variant.model");
const collection_model_1 = require("../features/business/catalog/collection.model");
const inventory_model_1 = require("../features/business/inventory/inventory.model");
const sale_model_1 = require("../features/business/sale/sale.model");
const sale_detail_model_1 = require("../features/business/sale-detail/sale-detail.model");
async function runSeed() {
    try {
        const adminUsername = process.env.ADMIN_USERNAME?.trim().toLowerCase();
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminUsername ||
            adminUsername.length < 3 ||
            adminUsername.length > 80 ||
            !adminEmail ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail) ||
            !adminPassword ||
            adminPassword.length < 12) {
            throw new Error("Set ADMIN_USERNAME (3+ characters), ADMIN_EMAIL, and ADMIN_PASSWORD (12+ characters) in .env before seeding.");
        }
        console.log("🌱 Sincronizando base de datos antes de sembrar...");
        await (0, db_1.syncDatabase)({ force: true });
        console.log("⏳ Poblando Auth y RBAC...");
        const [adminUser] = await user_model_1.User.findOrCreate({
            where: { username: adminUsername },
            defaults: {
                username: adminUsername,
                email: adminEmail,
                password: adminPassword,
                status: "active",
            },
        });
        const [adminRole] = await role_model_1.Role.findOrCreate({
            where: { name: "ADMINISTRADOR" },
            defaults: {
                name: "ADMINISTRADOR",
                description: "Acceso total al sistema",
                status: "active",
            },
        });
        await adminRole.update({ status: "active" });
        const [sellerRole] = await role_model_1.Role.findOrCreate({
            where: { name: "VENDEDOR" },
            defaults: {
                name: "VENDEDOR",
                description: "Acceso de vendedor a operaciones comerciales",
                status: "active",
            },
        });
        await sellerRole.update({ status: "active" });
        await role_user_model_1.RoleUser.findOrCreate({
            where: { user_id: adminUser.id, role_id: adminRole.id },
            defaults: {
                user_id: adminUser.id,
                role_id: adminRole.id,
                status: "active",
            },
        });
        await adminUser.update({ email: adminEmail, password: adminPassword, status: "active" });
        await (0, sync_rbac_resources_1.syncRbacResources)([adminRole, sellerRole]);
        // -------------------------------------------------------------
        // 2. NEGOCIO (BUSINESS)
        // -------------------------------------------------------------
        console.log("⏳ Poblando tablas de Negocio...");
        // Funciones auxiliares seguras para Faker
        const getCity = () => faker.location?.city ? faker.location.city() : "Medellín";
        const getStreet = () => faker.location?.streetAddress ? faker.location.streetAddress() : "Calle 50 #12-34";
        const getPhone = () => faker.phone?.number ? faker.phone.number() : "3001234567";
        const getFirstName = () => faker.person?.firstName ? faker.person.firstName() : "Juan";
        const getLastName = () => faker.person?.lastName ? faker.person.lastName() : "Pérez";
        const getFullName = () => faker.person?.fullName ? faker.person.fullName() : "Juan Pérez";
        const getEmail = () => faker.internet?.email ? faker.internet.email() : `user_${Math.random().toString(36).substring(7)}@trama.com`;
        const getCompany = () => faker.company?.name ? faker.company.name() : "Trama Corp";
        const getProductName = () => faker.commerce?.productName ? faker.commerce.productName() : "Camiseta Premium";
        const getProductDesc = () => faker.commerce?.productDescription ? faker.commerce.productDescription() : "Descripción de prueba";
        const getPrice = (min, max) => faker.commerce?.price ? parseFloat(faker.commerce.price({ min, max })) : 45000;
        const getRandomInt = (min, max) => faker.number?.int ? faker.number.int({ min, max }) : Math.floor(Math.random() * (max - min + 1)) + min;
        const getSKU = () => faker.string?.alphanumeric ? faker.string.alphanumeric({ length: 8, casing: "upper" }) : Math.random().toString(36).substring(2, 10).toUpperCase();
        const getColor = () => faker.color?.human ? faker.color.human() : "Azul";
        const getElement = (arr) => faker.helpers?.arrayElement ? faker.helpers.arrayElement(arr) : arr[Math.floor(Math.random() * arr.length)];
        const getElements = (arr, count) => faker.helpers?.arrayElements ? faker.helpers.arrayElements(arr, count) : arr.slice(0, count);
        // Sucursales
        const branches = [];
        for (let i = 0; i < 3; i++) {
            branches.push(await branch_model_1.Branch.create({
                nombre: `Sucursal ${getCity()}`,
                direccion: getStreet(),
                telefono: getPhone(),
                status: "active",
            }));
        }
        // Clientes
        const clients = [];
        for (let i = 0; i < 10; i++) {
            clients.push(await client_model_1.Client.create({
                nombre: getFirstName(),
                apellido: getLastName(),
                tipo_documento: "CC",
                numero_documento: `${getRandomInt(1000000000, 9999999999)}`,
                email: getEmail(),
                telefono: getPhone(),
                status: "active",
            }));
        }
        // Categorías
        const categories = [];
        const catNames = ["Camisas", "Pantalones", "Chaquetas", "Calzado", "Accesorios"];
        for (const name of catNames) {
            categories.push(await category_model_1.Category.create({
                nombre: name,
                descripcion: `Categoría de ${name}`,
                status: "active",
            }));
        }
        // Proveedores
        const suppliers = [];
        for (let i = 0; i < 5; i++) {
            suppliers.push(await supplier_model_1.Supplier.create({
                nombre: getCompany(),
                contacto: getFullName(),
                telefono: getPhone(),
                email: getEmail(),
                status: "active",
            }));
        }
        // Productos y Variantes
        const products = [];
        const variants = [];
        for (let i = 0; i < 15; i++) {
            const category = getElement(categories);
            const supplier = getElement(suppliers);
            const product = await product_model_1.Product.create({
                nombre: getProductName(),
                descripcion: getProductDesc(),
                category_id: category.id,
                supplier_id: supplier.id,
                status: "active",
            });
            products.push(product);
            // Crear 3 variantes por producto
            for (const talla of ["S", "M", "L"]) {
                const variant = await variant_model_1.Variant.create({
                    product_id: product.id,
                    sku: getSKU(),
                    talla: talla,
                    color: getColor(),
                    precio: getPrice(20000, 200000),
                    status: "active",
                });
                variants.push(variant);
                // Inventario por Variante y Sucursal
                for (const branch of branches) {
                    await inventory_model_1.Inventory.create({
                        variant_id: variant.id,
                        branch_id: branch.id,
                        stock: getRandomInt(10, 100),
                        status: "active",
                    });
                }
            }
        }
        // Colecciones / Catálogo
        for (let i = 0; i < 3; i++) {
            await collection_model_1.Collection.create({
                nombre: `Colección ${getFirstName()} 2026`,
                descripcion: "Colección de temporada alta",
                status: "active",
            });
        }
        // Ventas y Detalles de Venta
        for (let i = 0; i < 8; i++) {
            const client = getElement(clients);
            const branch = getElement(branches);
            const sale = await sale_model_1.Sale.create({
                client_id: client.id,
                branch_id: branch.id,
                user_id: adminUser.id,
                total: 0,
                fecha: new Date(),
                status: "active",
            });
            let totalVenta = 0;
            const randomVariants = getElements(variants, getRandomInt(1, 3));
            for (const variant of randomVariants) {
                const cantidad = getRandomInt(1, 4);
                const precioUnitario = variant.precio || 50000;
                const subtotal = cantidad * precioUnitario;
                totalVenta += subtotal;
                await sale_detail_model_1.SaleDetail.create({
                    sale_id: sale.id,
                    variant_id: variant.id,
                    cantidad: cantidad,
                    precio_unitario: precioUnitario,
                    subtotal: subtotal,
                    status: "active",
                });
            }
            sale.total = totalVenta;
            await sale.save();
        }
        console.log("✅ ¡Base de datos poblada exitosamente!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error durante la siembra de datos:", error);
        process.exit(1);
    }
}
runSeed();
//# sourceMappingURL=seed.js.map