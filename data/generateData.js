const fs = require("fs");

const { faker } = require("@faker-js/faker");

const users = [];

function createRandomUser() {
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();

  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_number: faker.phone.number("#########"),
    email: faker.helpers.unique(faker.internet.email, [first_name, last_name]),
    address_line_1: faker.address.streetAddress(),
    address_line_2: "",
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
    zip_code: faker.address.zipCode("#####"),
  };
}

function createWorkOrders() {
  return {};
}

Array.from({ length: 15 }).forEach(() => {
  users.push(createRandomUser());
});

fs.writeFile("populateCustomers.json", JSON.stringify(users), (err) => {
  // Checking for errors
  if (err) throw err;
  console.log("Done writing"); // Success
});
