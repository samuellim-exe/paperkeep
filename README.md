# PaperKeep

**PaperKeep** is a simple, user-friendly expense and income tracker that helps you log your daily financial activities and monitor them over time. Whether you want to manage your budget, keep track of your spending habits, or gain insights into your financial health, PaperKeep is here to help.

## Features

- **Expense Logging**: Record your daily expenses with categories, dates, and notes.
- **Income Tracking**: Log your income sources to keep track of earnings.

## Tech Stack

- **Framework**: Next.js
- **Database**: PostgreSQL 
- **Authentication**: Kinde
- **Styling**: Tailwind CSS , shadcn/ui

## Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Postgresql (running instance)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/samuellim-exe/paperkeep.git
   cd paperkeep
   ```

2. Install dependencies: (might have to use --force)
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the required variables:
   ```env
   DATABASE_URL=<your-database-url>
KINDE_CLIENT_ID=<your-kinde-client-id>
KINDE_CLIENT_SECRET=<your-kinde-client-secret>
KINDE_ISSUER_URL=https://<your-username>.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/success
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Sign Up / Log In**: Create an account to start logging your transactions.
2. **Add Entries**: Click on "Add Expense" or "Add Income" to record your transactions.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Start managing your finances effectively with **PaperKeep**!
