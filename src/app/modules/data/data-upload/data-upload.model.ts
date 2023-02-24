export interface DataUpload {
  alreadyExist: string[];
  alreadyExistCount: number;
  imported: string[];
  importedCount: number;

  file: {
    id: number;
    filename: string;
    createdAt: string;
    completePath: string;
  };
}
