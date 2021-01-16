export default class Order {
  id: string;
  items: any;
  totalAmount: number;
  date: any;
  constructor(id: string, items: any, totalAmount: number, date: any) {
    this.date = date;
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
  }
}
