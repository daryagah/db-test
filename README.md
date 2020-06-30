# Connect an app on Google Cloud VM to Google Cloud SQL (Postgres) with docker-compose

1. Install gcloud in VM instance's shell: https://cloud.google.com/sdk/install
2. Create a Postgres database in the same project as the VM instance: https://console.cloud.google.com/sql
3. Follow the instructions at https://cloud.google.com/sdk/docs/authorizing to create a service account with Cloud SQL Admin permissions. Switch to that account as in instructions. Save the key (.json file) to your laptop, then upload to the VM. Remember the directory you've uploaded it to. Mine is /home/darya_gahramanova/ancient-medium-278316-3bcfa66d69ee.json
4. In the VM instance, change Service account to the newly created one.
5. Enable Admin API: https://console.cloud.google.com/flows/enableapi?apiid=sqladmin&redirect=https://console.cloud.google.com&_ga=2.33340862.1814207982.1592910232-564620611.1589415743&_gac=1.54275802.1590425048.CjwKCAjw2a32BRBXEiwAUcugiIlaBSavZNgX7L7hz56j8Jkpcj9LjiaKPzDYQhldp58KE0AY4C13bBoCZXIQAvD_BwE
6. Go to the SQL instance - Overview and press Connect using Cloud Shell. Use the commands in example.sql to create and populate a database.
7. On the Overview page, copy the Connection name. Mine is ancient-medium-278316:us-central1:chatbotdb
8. Go to Users, change the password of postgres user and write it somewhere.
9. Fork this project and make these changes in the docker-compose file:
  - In line starting with command: /cloud_sql_proxy change -instances=[YOUR CONNECTION NAME FROM N.7]=tcp:0.0.0.0:5432
  - Change Volumes to [DIRECTORY WITH YOUR KEY FROM N.3]:/secrets/cloudsql/credentials.json
10. Go to VM shell and type:
  - git clone [your repo]
  - cd [your repo name]
  - sudo nano touch docker-compose.yml
  - In the end add this after DATABASE_URL: postgresql://postgres:[YOUR PASSWORD FOR THE POSTGRES USER]@cloudsql-proxy:5432/marketing
  - Save the file and close it
  - sudo docker-compose up --build
11. You should see that the contents of the database have been printed in the shell.
12. You can change queries in index.js
