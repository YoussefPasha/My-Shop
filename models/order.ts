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
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    return Moment(this.date).format("MMMM Do YYYY, hh:mm").toString();
  }
}
