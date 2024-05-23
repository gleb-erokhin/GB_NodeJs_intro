const user = require("./createUser");
const createFirstName = user.generateRandomName;
const createLastName = user.generateRandomName;
const createMail = user.generateRandomMail;
const createAddress = user.generateRandomAddress;

const createUser = () => {
    const firstName = createFirstName();
    const lastName = createLastName();
    return {
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        username: `${firstName}${lastName}`,
        email: `${firstName
            .charAt(0)
            .toLowerCase()}_${lastName.toLowerCase()}@pmail.phly`,
        address: `${createAddress()}`,
    };
};

module.exports = {
    createFirstName,
    createLastName,
    createMail,
    createAddress,
    createUser,
};
