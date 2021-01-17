import Moment from "moment";
export default class Order {
  id: string;
  items: any;
  totalAmount: number;
  date: Date;
  constructor(id: string, items: any, totalAmount: number, date: any) {
    this.date = date;
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
  }
  get readDate() {
    return Moment(this.date).format("MMMM Do YYYY, hh:mm").toString();
  }
}
