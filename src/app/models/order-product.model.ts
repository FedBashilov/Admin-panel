export class OrderProduct {
  public id: number = null;
  public name: string = '';
  public amount: number = null;

  constructor(id, name, amount){
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}
