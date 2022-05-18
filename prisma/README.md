npm run migrate:dev => FOR MIGRATION DEVELOPMENT
npm run migrate:stag => FOR MIGRATION STAGING
npm run migrate:prod => FOR MIGRATION PRODUCTION

npx prisma db seed => FOR SEEDING (DON'T FORGET CHANGE ENV IN package.json)
npx prisma validate => FOR VALIDATING schema.prisma
npx prisma format => FOR REFORMAT STRUCTURE schema.prisma