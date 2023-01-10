export type transactionType = {
  id: string;
  age: number;
  name: string;
  email: string;
  phone: string;
  geoInfo: {
    latitude: number;
    longitude: number;
  };
  connectionInfo?: {
    type: string;
    confidence: number;
  };
  children?: transactionType[];
};
