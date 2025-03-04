# Tech Assessment

### Installation

- Clone the repository:

```sh
git clone https://github.com/iMichael02/tech-assessment.git
cd tech-assessment
```

# Local Development Without Docker

## Front-End

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

- Install dependencies:

```sh
cd frontend
npm install
```

### Running the Application

1. Start the development server:

```sh
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173/declare-health` or `http://localhost:5173/health-declaration-list`.

### Building for Production

1. Build the application:

```sh
npm run build
```

2. The production-ready files will be in the `dist` directory. To start the built application, run:

```sh
npm run preview
```

## Back-End

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

- Install dependencies:

```sh
cd backend
npm install
```

### Running the Application

1. Start the development server:

```sh
npm run dev
```

2. Run Front-End or use tools such as Postman to see the APIs in action with the folloing endpoints:

- Create new health declaration:

```sh
POST: http://localhost:3000/health-declaration
```

- Request body example:

```sh
{
  "name": "Dimmu Borgir",
  "temperature": 39,
  "symptoms": ["cough", "headaches"],
  "contactedWithCovid19Suspects": true
}
```

- Get health declaration list:

```sh
GET: http://localhost:3000/health-declaration
```

### Building for Production

1. Build the application:

```sh
npm run build
```

2. The production-ready files will be in the `dist` directory. To start the built application, run:

```sh
npm run start
```
