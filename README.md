This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
weatherapp/
├── public/                     # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   └── error.tsx          # Error boundary
│   ├── components/            # React components
│   │   ├── ui/                # UI primitives (shadcn/ui)
│   │   └── [Feature]/         # Feature-specific components
│   ├── constants/             # App constants and configuration
│   ├── context/               # React Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions (shadcn/ui)
│   ├── providers/             # App-level providers (Theme, Query)
│   ├── services/              # API service functions
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions and helpers
├── components.json            # shadcn/ui configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
