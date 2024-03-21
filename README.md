HOW TO TEST
```
clone
$ npm i
$ npm run prisma:generate:dev
$ npm run start:dev

Check the test results at http://localhost:3000/test
```

IN MY CASE
```
prisma5
create: 55.07 ms
select: 330.86 ms

typeorm
create: 124.69 ms
select: 172.66 ms
```
