export interface ProductUpload {
  productCode: number;
  newPrice: number;
  validationErrors: string[];
}

export interface ProductValidation {
  productCode: number;
  name: string;
  salesPrice: number | undefined;
  newPrice: number;
  validationErrors: string[];
}
