
import { Business } from './excelService';

// ID de la hoja de Google Sheets
const GOOGLE_SHEET_ID = '1XBcVme4y2jaIVzu2OfdqCf2szoIpRMkF5ndqqC-uGyw';
const SHEET_NAME = 'Sheet1'; // Nombre de la hoja, ajusta según sea necesario

export const fetchBusinessesFromGoogleSheets = async (): Promise<Business[]> => {
  try {
    // Construir la URL para la API de Google Sheets (versión pública)
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
    
    const response = await fetch(url);
    const text = await response.text();
    
    // La respuesta viene con un prefijo que debemos eliminar
    const jsonText = text.replace('/*O_o*/', '').replace(/google.visualization.Query.setResponse\(|\);$/g, '');
    const data = JSON.parse(jsonText);
    
    // Mapear los datos al formato de negocio
    const businesses: Business[] = [];
    
    // Obtener los nombres de las columnas
    const columns = data.table.cols.map((col: any) => col.label?.toLowerCase() || '');
    
    // Mapear cada fila a un objeto Business
    data.table.rows.forEach((row: any, index: number) => {
      const businessData: any = {};
      
      // Asignar valores basados en las columnas
      row.c.forEach((cell: any, cellIndex: number) => {
        const columnName = columns[cellIndex];
        if (columnName && cell) {
          businessData[columnName] = cell.v || '';
        }
      });
      
      // Crear objeto Business con mapeo de campos
      businesses.push({
        id: index + 1,
        name: businessData.nombre || businessData.name || '',
        description: businessData.descripcion || businessData.description || '',
        category: businessData.categoria || businessData.category || '',
        imageUrl: businessData.imagen || businessData.imageurl || 
                 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        catalogUrl: businessData.catalogo || businessData.catalogurl || '#'
      });
    });
    
    return businesses;
  } catch (error) {
    console.error('Error al obtener datos de Google Sheets:', error);
    throw error;
  }
};
