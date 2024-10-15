import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('670a22a9002ab352e037');  

const databases = new Databases(client);

export { databases };
