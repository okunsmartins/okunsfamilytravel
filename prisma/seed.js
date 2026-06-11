const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const password = process.env.ADMIN_PASSWORD || 'OkunsAdmin2025!'
  const hash = await bcrypt.hash(password, 12)
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@okunsfamilytravel.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@okunsfamilytravel.com',
      passwordHash: hash,
      name: 'Okuns Admin',
    },
  })
  console.log('✅ Admin user created')

  // Seed destinations
  const destinations = [
    { name: 'Cork', country: 'Ireland', tagline: 'The Rebel County', description: 'Vibrant city culture, stunning coastlines, and world-famous food scenes await.', image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&q=80', posts: 14, tag: 'Ireland' },
    { name: 'Dublin', country: 'Ireland', tagline: "Ireland's Capital City", description: 'Georgian architecture, buzzing streets, iconic castles and a world of family fun.', image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=800&q=80', posts: 22, tag: 'Ireland' },
    { name: 'Galway', country: 'Ireland', tagline: 'City of the Tribes', description: 'Wild Atlantic coastline, colourful streets, and the warmest Irish welcome you will find.', image: 'https://images.unsplash.com/photo-1590486803833-1b5dc97207f2?w=800&q=80', posts: 10, tag: 'Ireland' },
    { name: 'Waterford', country: 'Ireland', tagline: "Ireland's Oldest City", description: 'Viking history, crystal heritage, and breathtaking Copper Coast scenery.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', posts: 8, tag: 'Ireland' },
    { name: 'Leitrim', country: 'Ireland', tagline: "Ireland's Hidden Gem", description: 'Pristine lakes, lush green valleys, and the most peaceful retreat in all of Ireland.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', posts: 6, tag: 'Ireland' },
    { name: 'Kildare', country: 'Ireland', tagline: 'The Thoroughbred County', description: 'Rolling stud farms, medieval castles, and premium outlet shopping for the whole family.', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80', posts: 9, tag: 'Ireland' },
    { name: 'Europe', country: 'Continent', tagline: 'Across the Continent', description: 'From Paris to Lisbon, Barcelona to Rome — family adventures across the finest European cities.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80', posts: 18, tag: 'World' },
    { name: 'Africa', country: 'Continent', tagline: 'The Ultimate Safari', description: 'Wildlife encounters, golden savannahs, and once-in-a-lifetime family memories.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', posts: 7, tag: 'World' },
    { name: 'Worldwide', country: 'Adventures', tagline: 'Beyond the Horizon', description: 'The world is our playground — follow our family on adventures to every corner of the globe.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80', posts: 24, tag: 'World' },
  ]

  for (const d of destinations) {
    await prisma.destination.upsert({
      where: { id: destinations.indexOf(d) + 1 },
      update: {},
      create: d,
    })
  }
  console.log('✅ Destinations seeded')

  // Seed videos
  const videos = [
    { title: 'Exploring Cork City with the Family — Hidden Gems & Best Spots!', thumbnail: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=640&q=80', duration: '18:42', views: '12.4K', date: 'June 2025', category: 'Ireland Travel', youtubeUrl: 'https://www.youtube.com/@OkunsFamily' },
    { title: 'We Stayed in an Irish CASTLE! 🏰 Full Review & Tour', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80', duration: '24:15', views: '28.7K', date: 'May 2025', category: 'Castle Stays', youtubeUrl: 'https://www.youtube.com/@OkunsFamily' },
    { title: 'Best Family Day Out in Dublin — Things To Do With Kids!', thumbnail: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=640&q=80', duration: '21:08', views: '19.2K', date: 'April 2025', category: 'Family Days Out', youtubeUrl: 'https://www.youtube.com/@OkunsFamily' },
    { title: 'Ireland Road Trip Vlog 🚗 Wild Atlantic Way in 5 Days!', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80', duration: '32:54', views: '45.1K', date: 'March 2025', category: 'Road Trips', youtubeUrl: 'https://www.youtube.com/@OkunsFamily' },
    { title: 'The BEST Family Hotel in Galway — Full Tour & Experience', thumbnail: 'https://images.unsplash.com/photo-1590486803833-1b5dc97207f2?w=640&q=80', duration: '16:30', views: '9.8K', date: 'February 2025', category: 'Hotels', youtubeUrl: 'https://www.youtube.com/@OkunsFamily' },
    { title: 'African Safari Family Trip 🦁 Most Incredible Experience of Our Lives', thumbnail: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=640&q=80', duration: '41:22', views: '67.3K', date: 'January 2025', category: 'World Travel', youtubeUrl: 'https://www.youtube.com/@OkunsFamily' },
  ]

  for (const v of videos) {
    await prisma.video.create({ data: v }).catch(() => {})
  }
  console.log('✅ Videos seeded')

  // Seed blog posts
  const posts = [
    { title: 'Best Family Days Out in Ireland', excerpt: "From adventure centres to scenic coastal walks, we've rounded up the very best family-friendly days out across every corner of Ireland.", content: "Full article content goes here. This is a placeholder for the full blog post content that you can edit in the admin panel.", image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80', category: 'Family Days Out', date: 'June 8, 2025', readTime: '8 min read' },
    { title: 'Our Favourite Castle Stays in Ireland', excerpt: "We've stayed in some of Ireland's most breathtaking castle hotels. Here are the ones that truly delivered magic for the whole family.", content: "Full article content goes here. This is a placeholder for the full blog post content that you can edit in the admin panel.", image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', category: 'Castle Stays', date: 'May 22, 2025', readTime: '10 min read' },
    { title: 'Family Food Adventures Around Ireland', excerpt: "Ireland's food scene has exploded. From Michelin-starred restaurants to roadside chippers, discover our favourite family food moments on the road.", content: "Full article content goes here. This is a placeholder for the full blog post content that you can edit in the admin panel.", image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', category: 'Food & Restaurants', date: 'April 14, 2025', readTime: '7 min read' },
    { title: 'How We Plan Family Travel on a Budget', excerpt: "Travelling as a family doesn't have to cost a fortune. Here are our honest tips, tricks, and strategies for seeing more of the world without breaking the bank.", content: "Full article content goes here. This is a placeholder for the full blog post content that you can edit in the admin panel.", image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80', category: 'Travel Tips', date: 'March 30, 2025', readTime: '9 min read' },
    { title: "Ireland's Most Beautiful Beaches for Families", excerpt: "Ireland's coastline is jaw-droppingly beautiful. We've explored the best family-friendly beaches, from hidden coves to sweeping golden strands.", content: "Full article content goes here. This is a placeholder for the full blog post content that you can edit in the admin panel.", image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', category: 'Beaches & Nature', date: 'March 10, 2025', readTime: '6 min read' },
    { title: 'Wild Atlantic Way Road Trip: Our Complete Family Guide', excerpt: "The Wild Atlantic Way is one of the world's great road trips. Here's everything you need to know to drive it with kids.", content: "Full article content goes here. This is a placeholder for the full blog post content that you can edit in the admin panel.", image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Road Trips', date: 'February 18, 2025', readTime: '12 min read' },
  ]

  for (const p of posts) {
    await prisma.blogPost.create({ data: p }).catch(() => {})
  }
  console.log('✅ Blog posts seeded')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
