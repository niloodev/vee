export interface DataTabProps {
  itemCount: number;
  onExport: () => void;
  onImport: (file: File) => void;
  onReplay: () => void;
}
