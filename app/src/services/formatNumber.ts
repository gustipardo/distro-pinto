export const formatNumber = (number: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 2,  // Número mínimo de decimales
      maximumFractionDigits: 2   // Número máximo de decimales
    }).format(number);
  };