export interface InvoiceAndPayments {
  id: number;
  entities_id: number;
  date: string;
  client: string;
  amount: number;
  cash: number;
  mp_vani: number;
  mp_gus: number;
  created_at: string;
}

export interface PendingInvoiceFromSupplier {
  invoice_id: number;
  invoice_date: string;
  supplier_name: string;
  invoice_total: string;
  total_paid: number;
  remaining_amount: number;
}

export interface SupplierInvoice {
  invoice_id: number;
  supplier_name: string;
  invoice_total: number;
  total_paid: number;
  remaining_amount: number;
}

export interface Invoice {
  id: number;
  entity_id: number;
  date: string;
  total: string;
  credit_note: number;
  cash: number;
  status: string;
  mp_gus: number;
  created_at: string;
}

export interface Payment {
  id: number;
  invoice_id: number;
  date: string;
  amount: number;
  type: string;
  payment_method: string;
  created_at: string;
}

export type PaymentMethod = "cash" | "mp_vani" | "mp_gus";

export type PaymentType = "expense" | "income";

export const paymentMethodDictionary = {
  cash: "Efectivo",
  mp_vani: "Mp Vani",
  mp_gus: "Mp Gus",
}

export interface InvoiceQueryParams {
  range: {
    from: string;
    to: string;
  };
  isPending: boolean;
  isPaid: boolean;
  isClient: boolean;
  entityId: string;

}

export interface Movement {
  date: string;
  description: string;
  amount: number;
  type: PaymentType
  payment_method: PaymentMethod;
}
