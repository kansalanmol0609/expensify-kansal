//Object Destructuring
const person = {
    name: 'Andrew',
    age: 27,
    location: {
        city: 'Philadelphia',
        temp: 88
    }
};

const {name: firstName = 'Anonymous', age} = person;
console.log(`${firstName} is ${age}.`)

const { city, temp: temperature} = person.location;
if( city && temperature) {
    console.log(`It's ${temperature} in ${city}.`)
}

//Array Destructuring
const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, city, state = 'New York'] = address;
console.log(`You are in ${city} ${state}.`)