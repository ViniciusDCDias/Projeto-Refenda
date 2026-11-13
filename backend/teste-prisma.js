
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const senhaHash = await bcrypt.hash('Refenda@123', 10);

    await prisma.usuarios.upsert({
        where: {
            email: 'admin@refenda.com'
        },
        update: {},
        create: {
            nome_user: 'Administrador',
            email: 'admin@refenda.com',
            senha: senhaHash,
            tipo_user: 'GESTOR',
            ra: null
        }
    });

    console.log('Usuário padrão verificado/criado!');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
