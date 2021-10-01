import {
  IDealDTO,
  IDealProductDTO,
} from '@modules/opportunities/dtos/IDealDTO';

import axios from 'axios';
import 'reflect-metadata';

class PipedriveService {
  public async returnDeals(): Promise<IDealDTO[] | null> {
    try {
      const {
        data: { data: allDeals },
      } = await axios.get(`${process.env.PIPEDRIVE_API_URL}/deals`, {
        params: {
          api_token: process.env.PIPEDRIVE_API_KEY,
          status: 'won',
        },
      });
      return allDeals;
    } catch (error) {
      return null;
    }
  }

  public async returnDealWithProducts(
    id: number,
  ): Promise<IDealProductDTO[] | null> {
    try {
      const {
        data: { data: result },
      } = await axios.get(
        `${process.env.PIPEDRIVE_API_URL}/deals/${id}/products`,
        {
          params: {
            api_token: process.env.PIPEDRIVE_API_KEY,
          },
        },
      );
      return result;
    } catch (error) {
      return null;
    }
  }
}

export default PipedriveService;
