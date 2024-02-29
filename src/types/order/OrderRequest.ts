const { body } = require('express-validator');

export const niit_items = [
  { name: "html5", price: 2500 },
  { name: "css3", price: 5500 },
  { name: "java", price: 11000 },
  { name: "javascript", price: 10000 },
  { name: "bootstrap", price: 5000 },
  { name: "angular", price: 7500 },
  { name: "sql", price: 6520 },
  { name: "python", price: 5000 },
  { name: "graphql", price: 5200 },
  { name: "typescript", price: 75000 },
  { name: "mongodb", price: 12000 },
  { name: "react", price: 8000 },
];

const cours = niit_items.map(item => item.name);

const isInEnum = (value: string, enumValues = cours) => {
  return enumValues.includes(value);
};

export const Order = [
  body('client_email').isEmail(),
  body('item').custom((value : string) => isInEnum(value, cours)).withMessage(`Item should be one in [${cours}]`)
]
