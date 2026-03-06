## RSSB EMPLOYER CONTRIBUTION MANAGEMENT SERVER


- This API provides endpoints for managing employer contribution declarations, employee salary records, and contribution calculations. It enables employers to create, submit, validate, and track monthly contribution declarations.
- Access Hosted Server: https://rssb-employer-contribution-management-server.onrender.com

### INSTALLATION

- Clone the repository: ```git clone https://github.com/key-joshua/rssb-employer-contribution-management-server.git```
- Node Version ```v22.12.0```.

### SETUP DATABASE AND RUN APPLICATION

1. installed all the required dependencies with npm install

2. Create ```.env``` from `.env.example` then add values to all variables.

3. Setup database and run scripts below before start application server:
    - Run this command ```npm run database-migrations-create```
    - Run this script ```npm run database-tables-delete```
    - Run this script ```npm run database-tables-create```

4. Start application in development, run script  ```npm run start:dev```
