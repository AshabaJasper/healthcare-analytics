
# Healthcare Analytics Platform

A comprehensive web application for healthcare data analytics, visualization, and revenue projection.

![Healthcare Analytics Dashboard](https://via.placeholder.com/800x450?text=Healthcare+Analytics+Dashboard)

## Overview

The Healthcare Analytics Platform helps healthcare providers analyze claim data, generate metrics, and project revenue. Built with modern web technologies, it offers a full suite of tools for healthcare data management.

## Features

- **Data Upload**: Upload Excel files with healthcare claims data and preview before processing
- **Data Display**: View, filter, search, and export claim records
- **Analytics Dashboard**: Visualize key metrics and statistics
- **Revenue Projection**: Calculate projected revenue based on treatment days
- **Level of Care Analysis**: Detailed metrics for each level of care (LOC)

## Tech Stack

- **Frontend**: React, Remix, Tailwind CSS
- **Backend**: Node.js, Remix (server-side)
- **Database**: PostgreSQL with Prisma ORM
- **Data Visualization**: Recharts
- **File Processing**: XLSX, PapaParse

## Getting Started

See [INSTALLATION.md](INSTALLATION.md) for detailed setup instructions.

Quick start:

```bash
# Clone the repository
git clone <repository-url>
cd healthcare-analytics

# Install dependencies
npm install

# Set up database
# 1. Create PostgreSQL database
# 2. Update .env with connection string
# 3. Push Prisma schema
npx prisma db push

# Start development server
npm run dev
```

## Usage

1. Upload healthcare claims data through the Upload page
2. Explore uploaded data in the Data page with filtering and sorting
3. View analytics and metrics in the Dashboard
4. Generate revenue projections based on Level of Care (LOC)
5. Dive into detailed metrics for specific Levels of Care

## Project Structure

```
healthcare-analytics/
├── app/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Database and utility libraries
│   ├── routes/        # Application routes and pages
│   ├── services/      # Server-side services
│   ├── styles/        # CSS styles (Tailwind)
│   └── utils/         # Helper functions
├── prisma/            # Database schema and migrations
├── public/            # Static assets
└── README.md          # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Remix](https://remix.run/) - The full stack web framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Prisma](https://www.prisma.io/) - For database ORM
- [Recharts](https://recharts.org/) - For data visualizations
