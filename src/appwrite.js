import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('670d6948002084e6b2f1');  

const databases = new Databases(client);

export { databases };
