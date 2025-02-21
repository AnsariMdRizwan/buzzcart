import Select from 'react-select'
export const registerFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    componentType: 'input',
    type: "text",
  },
  {
    name: 'email',
    label: 'E-mail',
    placeholder: 'Enter your Email ',
    componentType: 'input',
    type: "email ",
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your Password',
    componentType: 'password',
    type: "password",
  },
]
export const LoginFormControls = [

  {
    name: 'email',
    label: 'E-mail',
    placeholder: 'Enter your Email ',
    componentType: 'input',
    type: "email ",
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your Password',
    componentType: 'password',
    type: "password",
  },
]


export const addProductFormElements = [
  {
    label: 'Title',
    name: 'title',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter product title',
  },
  {
    label: 'Price',
    name: 'price',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter product price',
    min: 0,
  },
  {
    label: 'Description',
    name: 'description',
    componentType: 'textarea',
    placeholder: 'Enter product description',
  },
  {
    label: 'Category',
    name: 'category',
    componentType: 'select',
    type: 'dropdown',
    options: [
      { id: 'men', label: 'Men' },
      { id: 'women', label: 'Women' },
      { id: 'kids', label: 'Kids' },
      { id: 'accessories', label: 'Accessories' },
      { id: 'footwear', label: 'Footwear' },
    ],
  },
  {
    label: 'Brand',
    name: 'brand',
    componentType: 'react-select', // Change this to use react-select
    placeholder: 'Select a brand or type your own',
    options: [
      { id: 'puma', label: 'Puma' },
      { id: 'adidas', label: 'Adidas' },
      { id: 'nike', label: 'Nike' },
      { id: 'reebok', label: 'Reebok' },
      { id: 'underarmour', label: 'Under Armour' },
    ],
    required: true,
  },
  {
    label: 'Sale Price',
    name: 'salePrice',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter the Sale Price',
  },
  {
    label: 'Total Stock',
    name: 'totalStock',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter the total stock',
  },
];


export const shoppingViewHeaderMenuitems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shop/home'
  },
  {
    id: 'products',
    label: 'Products',
    path: '/shop/listing'
  },
  {
    id: 'men',
    label: 'Men',
    path: '/shop/listing'
  },
  {
    id: 'women',
    label: 'Women',
    path: '/shop/listing'
  },
  {
    id: 'kids',
    label: 'Kids',
    path: '/shop/listing'
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/shop/listing'
  },
  {
    id: 'footwear',
    label: 'Footwear',
    path: '/shop/listing'
  },
  {
    id: 'search',
    label: 'Search',
    path: '/shop/search'
  },
]

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids " },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "addidas", label: "Addidas" },
    { id: "puma", label: "Puma" },
    { id: "zara", label: "Zara" },
    { id: "levi", label: "Levi" },
    { id: "handm", label: "H & M" },
  ]
}


export const sortOptions =[
  {id:"price-lowtohigh",label:"Price :Low to High"},
  {id:"price-hightolow",label:"Price :high to low"},
  {id:"title-atoz",label:"Title  :A to Z"},
  {id:"title-ztoa",label:"title :Z to A"},
]



export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text ",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
