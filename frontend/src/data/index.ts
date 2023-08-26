export const sales = [
  {
    month: "Jan",
    amt: 1400,
  },
  {
    month: "Feb",
    amt: 1210,
  },
  {
    month: "Mar",
    amt: 1290,
  },
  {
    month: "Apr",
    amt: 1500,
  },
  {
    month: "May",
    amt: 2181,
  },
  {
    month: "Jun",
    amt: 2230,
  },
  {
    month: "Jul",
    amt: 2500,
  },
  {
    month: "Aug",
    amt: 2400,
  },
  {
    month: "Sep",
    amt: 2210,
  },
  {
    month: "Oct",
    amt: 2290,
  },
  {
    month: "Nov",
    amt: 2000,
  },
  {
    month: "Dec",
    amt: 2181,
  },
];

export const sales2 = [
  {
    month: "Jan",
    amt: 2400,
  },
  {
    month: "Feb",
    amt: 2210,
  },
  {
    month: "Mar",
    amt: 2290,
  },
  {
    month: "Apr",
    amt: 2000,
  },
  {
    month: "May",
    amt: 2181,
  },
  {
    month: "Jun",
    amt: 2230,
  },
  {
    month: "Jul",
    amt: 2400,
  },
  {
    month: "Aug",
    amt: 2300,
  },
  {
    month: "Sep",
    amt: 2260,
  },
  {
    month: "Oct",
    amt: 2190,
  },
  {
    month: "Nov",
    amt: 2050,
  },
  {
    month: "Dec",
    amt: 2185,
  },
];

export const allSales = sales.map((sale, index) => {
  return {
    ...sale,
    currentYear: sale.amt,
    previousYear: sales2[index].amt,
  };
});

export const productsData = [
  {
    image: "https://source.unsplash.com/random",
    name: "Cupcake",
    category: "Dessert",
    price: 2.5,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Donut",
    category: "Dessert",
    price: 25,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Eclair",
    category: "Dessert",
    price: 250,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Frozen yoghurt",
    category: "Dessert",
    price: 50,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Gingerbread",
    category: "Dessert",
    price: 2.5,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Honeycomb",
    category: "Dessert",
    price: 35,
    stock: 0,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Ice cream sandwich",
    category: "Dessert",
    price: 20,
    stock: 5,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Jelly Bean",
    category: "Dessert",
    price: 2.5,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "KitKat",
    category: "Dinner",
    price: 2.5,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Lollipop",
    category: "Lunch",
    price: 2.5,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Marshmallow",
    category: "Dessert",
    price: 2.5,
    stock: 10,
  },
  {
    image: "https://source.unsplash.com/random",
    name: "Nougat",
    category: "Dessert",
    price: 2.5,
    stock: 10,
  },
];
