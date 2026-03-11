## RSSB EMPLOYER CONTRIBUTION MANAGEMENT SERVER


- This API provides endpoints for managing employer contribution declarations, employee salary records, and contribution calculations. It enables employers to create, submit, validate, and track monthly contribution declarations.
- Access Hosted Server: https://rssb-employer-contribution-management-server.onrender.com

### INSTALLATION

- Clone the repository: ```git clone https://github.com/key-joshua/rssb-employer-contribution-management-server.git```
- Node Version ```v22.12.0```.

### SETUP DATABASE AND RUN APPLICATION LOCALLY WITH NO DOCKER

1. Create ```.env``` from `.env.example` then add values to all variables.

2. Setup database and run scripts below before start application server:
    - First delete this file if already exist ("XXXXXXXXXXXXX-InitialMigration")
    - Run this command ```npm run database-migrations-create```
    - Run this script ```npm run database-tables-create```

3. Run this docker commands to build image and containers
    - Run this command ```docker compose up --build```

4. Visit this URL: http://localhost:3000/api/health



### SETUP DATABASE AND RUN APPLICATION LOCALLY WITH NO DOCKER

1. Installed all the required dependencies with ```npm install```

2. Create ```.env``` from `.env.example` then add values to all variables.

3. Setup database and run scripts below before start application server:
    - First delete this file if already exist ("XXXXXXXXXXXXX-InitialMigration")
    - Run this command ```npm run database-migrations-create```
    - Run this script ```npm run database-tables-create```

4. Start application in development, run script  ```npm run start:dev```
    
5. Visit this URL: http://localhost:3000/api/health

### TESTING APPLICATION FUNCTIONALITIES

    - Registered admin(ADMIN):
        {
            "email": "admin@admin.com",
            "password": "Admin@123"
        }

    - Registered user(EMPLOYER):
        {
            "email": "employer@employer.com",
            "password": "Employer@123"
        }
    