#! /bin/bash
mysqld
npm install 
npm run build --prod 
npx prisma generate 
npx prisma db push 
node dist/index.js