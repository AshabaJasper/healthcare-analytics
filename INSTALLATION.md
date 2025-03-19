# Healthcare Analytics Application

A comprehensive healthcare data analytics platform built with Remix, Tailwind CSS, and PostgreSQL.

## Features

- **Data Upload**: Upload Excel files with healthcare claims data
- **Data Preview**: Review data before processing
- **Data Display**: View, filter, and sort uploaded data
- **Analytics Dashboard**: Visualize metrics and calculate revenue projections
- **Level of Care Analysis**: Detailed metrics for each level of care

## Prerequisites

- Node.js 14+
- PostgreSQL 12+
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd healthcare-analytics
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

Create a PostgreSQL database for the application:

```sql
CREATE DATABASE healthcare_analytics;
```

Update the `.env` file with your database connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/healthcare_analytics"
```

Replace `username` and `password` with your PostgreSQL credentials.

### 4. Push Schema to Database

```bash
npx prisma db push
```

### 5. Start the Application

In development mode:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`.

## Using the Application

### Data Upload

1. Navigate to `/upload`
2. Drag and drop your Excel file or click to select a file
3. Preview the data to ensure it's formatted correctly
4. Click "Process Data" to upload to the database

Supported Excel formats:

- `.xlsx` and `.xls` files
- Must include columns for Practice Name, LOC, Charge Amount, etc.
- See upload page for full list of expected columns

### Data View

1. Navigate to `/data`
2. Use the filters at the top to narrow down the data
3. Click on column headers to sort
4. Use the pagination controls to navigate through results
5. Click "Export to Excel" to download the filtered data

### Dashboard

1. Navigate to `/dashboard`
2. View summary metrics and charts
3. Adjust days in the revenue projection table to calculate different scenarios
4. Click on a Level of Care name to view detailed metrics

### Level of Care Details

1. From the dashboard, click on any LOC name
2. View detailed metrics for that level of care
3. Adjust treatment days to see projected revenue
4. Review payer and state distributions
5. View recent claims for this level of care

## Data Structure

The application expects healthcare claims data with the following structure:

- **Level of Care (LOC)**: Treatment category (e.g., DTX, RTC, PHP, IOP)
- **Practice Name**: Healthcare provider name
- **Charge Amount**: Amount charged for service
- **Payment Allowed Amount**: Amount allowed by insurance
- **Payment Total Paid**: Amount actually paid
- **Payer Name**: Insurance company name
- **Service Dates**: When service was provided

See the upload page for the complete list of expected fields.

## Troubleshooting

- **Database Connection Issues**: Verify that PostgreSQL is running and the connection string in `.env` is correct
- **Upload Errors**: Ensure your Excel file has the expected columns and data types
- **Dashboard Not Showing Metrics**: Check that you've uploaded and processed data successfully

## Support

For issues or questions, please contact ashabajasper@gmail.com
