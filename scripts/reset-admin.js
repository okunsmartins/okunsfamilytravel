const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@okunsfamilytravel.com'
  const password = 'Tameara15'

  const hash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash: hash },
    create: { email, passwordHash: hash, name: 'Okuns Admin' },
  })

  console.log('✅ Admin password reset successfully')
  console.log('Email:', user.email)
  console.log('Password: Tameara15')

  // Verify it works
  const valid = await bcrypt.compare(password, user.passwordHash)
  console.log('✅ Password verification:', valid ? 'PASSED' : 'FAILED')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
