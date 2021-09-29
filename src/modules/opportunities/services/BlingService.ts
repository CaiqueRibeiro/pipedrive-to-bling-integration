import 'reflect-metadata';
import axios from 'axios';

class BlingService {
  async sendOrder(xml: string): Promise<void> {
    await axios.post(
      `${process.env.BLING_API_URL}/pedido/json`,
      {},
      {
        params: { apikey: process.env.BLING_API_KEY, xml },
      },
    );
  }
}

export default BlingService;
