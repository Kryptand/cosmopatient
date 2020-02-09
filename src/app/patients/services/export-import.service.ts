import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
interface ExportItem {
  key: string;
  id: string;
}
const csvExport = (filename: string, rows: object[]) => {
  if (!rows || !rows.length) {
    return;
  }
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell =
              cell instanceof Date
                ? cell.toLocaleString()
                : cell.toString().replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
@Injectable()
export class ImportExportService {
  constructor(private storage: Storage) {}
  async exportToCsv() {
    const patients = await this.getAllValues('[PATIENTS]');
    const photos = await this.getAllValues('[PHOTO]');
    const treatments = await this.getAllValues('[TREATMENT]');
    csvExport(`cosmosurge-export-patients.csv`, patients);
    csvExport(`cosmosurge-export-photos.csv`, photos);
    csvExport(`cosmosurge-export-treatments.csv`, treatments);
  }
  importFromCsv() {}
  async getAllValues(prefix: string): Promise<ExportItem[]> {
    let items = [];
    await this.storage.forEach((storageItem, storageKey) => {
      if (storageKey.startsWith(prefix)) {
        let item = storageItem;
        item.key = storageKey;
        items = [...items, item];
      }
    });
    return items;
  }
}
