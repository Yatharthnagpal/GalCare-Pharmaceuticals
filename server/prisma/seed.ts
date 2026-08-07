import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create default ADMIN user
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@galcare.com';
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'GalcareAdmin2026!';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      name: 'Galcare Admin',
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      name: 'Galcare Admin',
      role: 'ADMIN',
    },
  });
  console.log(`Upserted ADMIN user: ${adminEmail}`);

  // 2. Seed Jobs
  const jobs = [
    {
      title: 'Senior Formulation Scientist',
      department: 'R&D',
      location: 'Bengaluru',
      type: 'Full-time',
      description: 'Lead formulation development for new generic products.',
    },
    {
      title: 'Regulatory Affairs Manager',
      department: 'Quality',
      location: 'Mumbai',
      type: 'Full-time',
      description: 'Ensure compliance with state and national regulatory standards.',
    },
    {
      title: 'Medical Representative',
      department: 'Sales',
      location: 'Remote',
      type: 'Full-time',
      description: 'Promote Galcare products to healthcare professionals.',
    },
    {
      title: 'Clinical Research Associate',
      department: 'R&D',
      location: 'Hyderabad',
      type: 'Full-time',
      description: 'Monitor clinical trials and ensure data integrity.',
    }
  ];

  for (const job of jobs) {
    const existingJob = await prisma.job.findFirst({ where: { title: job.title } });
    if (!existingJob) {
      await prisma.job.create({ data: job });
    } else {
      await prisma.job.update({ where: { id: existingJob.id }, data: job });
    }
  }
  console.log('Seeded Jobs');

  // 3. Seed NewsArticles
  const news = [
    {
      title: 'Galcare Launches New Dermatological Line',
      category: 'Product Launch',
      date: '2026-07-15',
      excerpt: 'Expanding our portfolio with advanced skincare solutions.',
      content: 'Detailed content about the new dermatological line...',
      published: true,
    },
    {
      title: 'Annual Sustainability Report Published',
      category: 'Company News',
      date: '2026-06-20',
      excerpt: 'Read about our commitment to sustainable manufacturing.',
      content: 'Detailed content about sustainability efforts...',
      published: true,
    },
    {
      title: 'Partnership with Global Health NGO',
      category: 'Partnership',
      date: '2026-05-10',
      excerpt: 'Collaborating to bring affordable medicines to underserved communities.',
      content: 'Detailed content about the NGO partnership...',
      published: true,
    }
  ];

  for (const article of news) {
    const existing = await prisma.newsArticle.findFirst({ where: { title: article.title } });
    if (!existing) {
      await prisma.newsArticle.create({ data: article });
    } else {
      await prisma.newsArticle.update({ where: { id: existing.id }, data: article });
    }
  }
  console.log('Seeded NewsArticles');

  // 4. Seed ManufacturingCapability
  const capabilities = [
    { formatName: 'Creams, Ointments & Gels (Derma)', capacity: 'High Volume', description: 'Advanced dermatological formulations', sortOrder: 1 },
    { formatName: 'Tablets & Capsules (Solid Oral Doses)', capacity: 'High Volume', description: 'Solid oral dosage forms', sortOrder: 2 },
    { formatName: 'Liquid Oral Suspensions & Syrups', capacity: 'High Volume', description: 'Liquid oral dosage forms', sortOrder: 3 },
    { formatName: 'Hair Serums, Lotions & Shampoos', capacity: 'High Volume', description: 'Cosmetic and therapeutic hair care', sortOrder: 4 },
  ];

  for (const cap of capabilities) {
    const existing = await prisma.manufacturingCapability.findFirst({ where: { formatName: cap.formatName } });
    if (!existing) {
      await prisma.manufacturingCapability.create({ data: cap });
    } else {
      await prisma.manufacturingCapability.update({ where: { id: existing.id }, data: cap });
    }
  }
  console.log('Seeded Manufacturing Capabilities');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
