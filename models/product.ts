class Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: string
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}
