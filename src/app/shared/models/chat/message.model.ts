export interface Message {
  id: number;
  content: string;
  time: string;
  author: {
    id: number;
    full_name: string;
    environment: string;
    email: string;
  };
}
