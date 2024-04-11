import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '84bd60fd-a1f7-45ed-965d-6146cbab20dc',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento p/ devs apaixonados(as) por código!',
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('Database seeded!');
    prisma.$disconnect();
})