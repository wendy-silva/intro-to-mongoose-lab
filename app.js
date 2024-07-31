/*----------------------------- Starter Code --------------------------------*/
// NPM imports
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"
import promptSync from "prompt-sync"

// Connect to MongoDB using Mongoose
const connect = async () => {
  // Create connection
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries()
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};

const prompt = promptSync();

const username = prompt('What is your name?');
console.log(`Your name is ${username}`);

const runQueries = async () => {
  console.log(welcomeMessage.text);

  let exit = false;
  while (!exit) {
    console.log('\nPlease choose an action:');
    console.log('1. Create');
    console.log('2. View');
    console.log('3. Update');
    console.log('4. Delete');
    console.log('5. Quit');

    const choice = prompt('Enter your choice: ');

    switch (choice) {
      case '1':
        await createCustomer();
        break;
      case '2':
        await viewCustomers();
        break;
      case '3':
        await updateCustomer();
        break;
      case '4':
        await deleteCustomer();
        break;
      case '5':
        exit = true;
        break;
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
};

const messageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

const welcomeMessage = {
  text: 'Welcome to the CRM',
};

// Define functions for each CRUD operation
const createCustomer = async () => {
  const name = prompt('Enter customer name: ');
  const newCustomer = new Message({ text: name });
  await newCustomer.save();
  console.log('Customer created successfully.');
};

const viewCustomers = async () => {
  const customers = await Message.find();
  console.log('Customers:');
  customers.forEach((customer) => {
    console.log(`ID: ${customer._id}, Name: ${customer.text}`);
  });
};

const updateCustomer = async () => {
  await viewCustomers();
  const id = prompt('Enter the ID of the customer to update: ');
  const name = prompt('Enter new customer name: ');
  await Message.findByIdAndUpdate(id, { text: name });
  console.log('Customer updated successfully.');
};

const deleteCustomer = async () => {
  await viewCustomers();
  const id = prompt('Enter the ID of the customer to delete: ');
  await Message.findByIdAndDelete(id);
  console.log('Customer deleted successfully.');
};

connect();