# TransitOps Smart 🚀

TransitOps Smart is a comprehensive, enterprise-grade Fleet Management System designed to seamlessly orchestrate drivers, vehicles, maintenance logs, and financial analytics. Built with a modern tech stack, it provides dynamic routing and strict role-based access controls for different departments.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching:** Axios
- **State Management:** React Context API

### Backend
- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens) with Role-Based Guards

---

## 👥 Role-Based Access Control (RBAC)

The system is strictly divided by roles to ensure users only see what they need to:
- **`FLEET_MANAGER`**: Manages Vehicles (Fleet) and logs Maintenance records.
- **`SAFETY_OFFICER`**: Manages Driver onboarding, certifications, and statuses.
- **`DRIVER` (Dispatcher)**: Creates and dispatches Trips, managing the live board.
- **`FINANCIAL_ANALYST`**: Tracks Fuel & Expenses, and views top-level Analytics and ROI.

*(Note: There is a fast-switching Role Override toggle built into the `/settings` page for testing purposes!)*

---

## 🏗 System Modules

1. **Dashboard:** Real-time KPI summaries, recent trip logs, and fleet utilization stats.
2. **Fleet (`/fleet`):** Complete vehicle registry. Tracks Odometer, Capacity, and Status (`AVAILABLE`, `ON_TRIP`, `IN_SHOP`, `RETIRED`).
3. **Drivers (`/drivers`):** Personnel database. Validates license expirations before dispatch.
4. **Trips (`/trips`):** Dispatcher hub. Features dynamic load-capacity validation against the vehicle, and live lifecycle transitions (`DRAFT` → `DISPATCHED` → `COMPLETED`).
5. **Maintenance (`/maintenance`):** Service logs. Logging a repair automatically pulls a vehicle `IN_SHOP`.
6. **Fuel & Expenses (`/finances`):** Logs variable operational costs across the fleet.
7. **Analytics (`/analytics`):** Generates real-time ROI by calculating total revenue against fuel and maintenance costs.

---

## 💻 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or via Docker)

### 1. Database Setup
Ensure you have a PostgreSQL database created (e.g., `transitops_db`). You can do this via `pgAdmin` or the `psql` CLI.

### 2. Backend Setup
Open a terminal and navigate to the backend directory:
```bash
cd backend

# Install dependencies
npm install

# Set up your environment variables
# Create a .env file in the root of the /backend folder and add:
# DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/transitops_db?schema=public"
# JWT_SECRET="your_super_secret_jwt_key_here"

# Push the schema to your database (creates tables)
npx prisma db push

# Generate the Prisma Client
npx prisma generate

# Start the NestJS development server (Runs on port 3001)
npm run start:dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend

# Install dependencies
npm install

# Start the Next.js development server (Runs on port 3000)
npm run dev
```

### 4. Access the Application
- Open your browser and navigate to: `http://localhost:3000`
- Since you are starting fresh, register a new user or use the API to seed initial data.

---

## 🚀 Key Workflows

- **Dispatching a Trip:** A Dispatcher (`DRIVER` role) creates a trip. The system dynamically validates if the cargo exceeds the vehicle's capacity. When dispatched, the Vehicle and Driver statuses are locked to `ON_TRIP`.
- **Maintenance Lifecycle:** A `FLEET_MANAGER` logs an oil change. The system automatically pulls that vehicle out of the Dispatcher's pool (`IN_SHOP`). Once marked as `COMPLETED`, the vehicle is returned to `AVAILABLE`.
- **Automated ROI:** The system aggregates trip revenues and subtracts maintenance and fuel logs to generate live Return On Investment percentages per vehicle.
