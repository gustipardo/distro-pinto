interface RelateInvoiceToRoadmapByDate {
  roadmapDate: string;
  invoiceId: number;
}

export const relateInvoiceToRoadmapByDate = async ({ roadmapDate, invoiceId }: RelateInvoiceToRoadmapByDate) => {

  console.log("Relacionando Invoice a roadmap por fecha con", roadmapDate, invoiceId)
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices/roadmap/relatedByDate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roadmapDate, invoiceId })
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }

}

