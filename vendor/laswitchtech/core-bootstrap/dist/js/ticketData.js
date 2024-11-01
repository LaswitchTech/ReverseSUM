var array = [];
for(const [key, contact] of Object.entries(sampleContacts)){
    array.push({id: contact, text: contact});
}
const Contacts = array;
const Owner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
const AssignedTo = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
const Records = sampleRecords.tickets;
const Record = Records[2];
const Statuses = sampleStatuses.tickets;
const Priorities = samplePriorities.tickets;
const Categories = sampleCategories.tickets;
