export interface TransactionElement {
    _id: string;
    date: number;
    sender: { firstName: string; lastName: string; dateOfBirth: string; IDNumber: string; };
    recipient: { firstName: string; lastName: string; email: string; accountNumber: string; bank: string; };
    Amount: number;
    CurrencyCd: string;
    Comments: string;
    status: string;
}
