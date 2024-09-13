export const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son indexados desde 0
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

export const formatDateToDDMMYYYY = (isoDate: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(isoDate)) {
      throw new Error('Formato de fecha no válido. Debe ser yyyy-mm-dd.');
    }
  
    // Divide la fecha en componentes
    const [year, month, day] = isoDate.split('-');
  
    // Devuelve la fecha en formato dd-mm-yyyy
    return `${day}-${month}-${year}`;
}


export const formatDateDDMMYYYYToYYYYMMDD = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate.toISOString().split("T")[0]; // Devuelve en formato YYYY-MM-DD
};
