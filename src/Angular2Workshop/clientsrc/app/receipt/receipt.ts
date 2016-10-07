export enum Reason {
    Hotel, Taxi, Trainticket, Planeticket, Various
}

export class Receipt {
    constructor(public id: number, public name: string, public reason: Reason, public date: string, public price: number, public comment: string) { }
}

