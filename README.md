This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

#### Install the dependencies:

```bash
npm install
```

#### Create env file and update the variables:

```bash
cp env.example .env.local
```

##### Run the development server:

```bash
npm run dev
```

#### Edit webhook destination in Stripe:

Use ngrok to expose the local development server to the internet:

```bash
ngrok http http://localhost:3000
```

Then add `/api/webhooks/stripe` to the webhook destination.

Open [http://localhost:3000/store](http://localhost:3000/store) with your browser to see the result.

## Stripe Test Card

```bash
Visa
4242424242424242
CV: Any 3 digits
EXP: Any future date
```

## Check successful purchases:

Visit `http://localhost:3000/api/purchases?email=your_email` to see the purchases made by your email.
