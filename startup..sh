#! /bin/bash
mysqld
npm run build
npx prisma generate
npx prisma db push
node dist/index.js