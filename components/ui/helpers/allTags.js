const slugify = (str) => str.replace(/\s+/g, '-').toLowerCase();

const tags = [
  {
    name: "next.js",
    slug: slugify('next.js'),
    bgColor: "bg-yellow-500",
    fontColor: "text-gray-100",
  },
  {
    name: "node",
    slug: slugify('node'),
    bgColor: "bg-green-400",
    fontColor: "text-gray-100",
  },
  {
    name: "netlify",
    slug: slugify('netlify'),
    bgColor: "bg-green-400",
    fontColor: "text-gray-100",
  },
  {
    name: "firebase",
    slug: slugify('fiebase'),
    bgColor: "bg-gray-700",
    fontColor: "text-gray-100",
  },
  {
    name: "writing",
    slug: slugify('writing'),
    bgColor: "bg-yellow-200",
    fontColor: "text-gray-700",
  },
  {
    name: "javascript",
    slug: slugify('javascript'),
    bgColor: "bg-yellow-200",
    fontColor: "text-gray-700",
  },  
  {
    name: "tools",
    slug: slugify('tools'),
    bgColor: "bg-yellow-300",
    fontColor: "text-gray-800",
  },
  {
    name: "react",
    slug: slugify('react'),
    bgColor: "bg-blue-300",
    fontColor: "text-gray-800",
  },
  {
    name: "gatsby",
    slug: slugify('gatsby'),
    bgColor: "bg-purple-600",
    fontColor: "text-gray-200",
  },
  {
    name: "tailwindcss",
    slug: slugify('tailwind'),
    bgColor: "bg-green-400",
    fontColor: "text-gray-200",
  },
  {
    name: "css",
    slug: slugify('css'),
    bgColor: "bg-purple-600",
    fontColor: "text-gray-200",
  },
  {
    name: "reactnative",
    slug: slugify('reactnative'),
    bgColor: "bg-blue-300",
    fontColor: "text-gray-800",
  },
  {
    name: "expo",
    slug: slugify('expo'),
    bgColor: "bg-gray-900",
    fontColor: "text-gray-200",
  },
];

export default tags;