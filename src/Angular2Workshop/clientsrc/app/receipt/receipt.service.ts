import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Receipt } from './receipt';

@Injectable()
export class ReceiptService {
    private receiptUrl = 'http://localhost:3001/receipts';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getReceipts(): Observable<Receipt[]> {
        return this.http.get(this.receiptUrl)
            .map(this.mapReceipts)
            .catch(this.handleError);
    }

    getReceipt(id: number): Observable<Receipt> {
        return this.getReceipts()
            .map((receipts: Receipt[]) => receipts.find(p => p.id === id));
    }

    createReceipt(receipt: Receipt): Observable<Receipt> {
        return this.http.post(this.receiptUrl, JSON.stringify(receipt), { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateReceipt(receipt: Receipt): Observable<Receipt> {
        const url = `${this.receiptUrl}/${receipt.id}`;
        return this.http.put(url, JSON.stringify(receipt), { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    deleteReceipt(receipt: Receipt): Observable<Response> {
        const url = `${this.receiptUrl}/${receipt.id}`

        return this.http.delete(url, { headers: this.headers, body: "" });
    }

    private mapReceipts(response: Response) {
        let mappedReceipts = response.json() || [];
        mappedReceipts.forEach((receipt: any) => {
            let dateArray = receipt.date.split("-");
            var theDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            receipt.date = theDate.toISOString().slice(0, 10);
        });

        return mappedReceipts;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
