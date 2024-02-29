![Opengraph Image](/public/opengraph-image.png)
[Demo](https://gitpost.up.railway.app) (The site may crush due to deployment service or database sleeping, if you encounter any problem in demo website, feel free to contact me)

## Introduction

This Dcard 2024 Frontend Intern Homework, whose goal is to connect with GitHub OAuth API to implement login, and user can create open issue as their blog post, close issue as deleting post.
Author can "read", "create", "edit", "delete" their post and comment, and others can only "read" post and comment.

## Tack Stack

- Next.js + TypeScript
- Tailwind CSS - Styling
- [ShadcnUI](https://ui.shadcn.com/) - Component Library
- [Zustand](https://zustand-demo.pmnd.rs/) - State Management
- [react-markdown](https://remarkjs.github.io/react-markdown/) + [react-markdown-editor](https://uiwjs.github.io/react-markdown-editor/) + [next-remote-mdx](https://www.npmjs.com/package/next-mdx-remote) + [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography) - Rendering Markdown and Markdown Editor
- Axios -Sending API Request
- GitHub OAuth API - User Login
- [Turso](https://turso.tech/) - Database
- [Prisma ORM](https://www.prisma.io/orm) - ORM for Mutating Data

## Getting Started

First, set environment variable:

```ts
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

SECRET_KEY=

TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

BASE_URL=
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Work

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
