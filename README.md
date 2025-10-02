# Airways System

Professional backend for an airways ticketing and management system. Built with NestJS, TypeORM, PostgreSQL, and TypeScript.

## Features
- Flight search and booking (with seat/class selection, round-trip, cancellation)
- User, Admin, Super-Admin roles (JWT authentication, guards)
- Admin panel: manage flights, tickets, reviews, news, users
- Reviews: rating and comment for flights
- Loyalty program: points, levels, referral system
- News: CRUD for admin announcements
- Payment system: booking payments, integration-ready
- Notifications: user and admin messages
- Full ER diagram and DrawSQL
- Swagger/Postman documentation
- Clean code, validation, error handling

## Technologies
- NestJS
- TypeORM
- PostgreSQL
- TypeScript
- Swagger/Postman
- Docker (for deployment)

## Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/omonovdev/Airways-System.git
   cd Airways-System
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (see `.env.example`).
4. Run migrations and start the server:
   ```bash
   npm run start:dev
   ```
5. Access API docs at `/api` (Swagger/Postman).

## Project Structure
- `src/` — all modules (users, admin, booking, flights, payment, news, reviews, loyalty, etc.)
- `src/entities/` — TypeORM entities
- `src/dto/` — DTOs with validation
- `src/controllers/` — REST API endpoints
- `src/services/` — business logic
- `src/utils/` — helpers, error handling

## ER Diagram
See `docs/DrawSQL.png` for full database structure.

## Deployment
- Dockerfile and Railway/Heroku ready
- CI/CD pipeline via GitHub Actions
- Domain: airways.ism-fam.uz

## Bonus Features
- Microservice architecture (NestJS microservices)
- Redis caching
- Payment integration (Stripe, Payme, Click)
- Frontend UI (React/Next.js)

## Author
Ahrorbek Omonov

## License
MIT

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
