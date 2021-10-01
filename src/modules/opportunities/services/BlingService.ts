import 'reflect-metadata';
import axios from 'axios';
import { parse } from 'js2xmlparser';
import { parseISO, format } from 'date-fns';

import {
  IDealDTO,
  IDealProductDTO,
} from '@modules/opportunities/dtos/IDealDTO';
import {
  IFilledItemsDTO,
  IClientDTO,
} from '@modules/opportunities/dtos/destiny/IDestinyServiceDTO';
import AppError from '@shared/errors/AppError';

class BlingService {
  public async getOrder(id: number): Promise<IDealDTO> {
    try {
      const result = await axios.get(
        `${process.env.BLING_API_URL}/pedido/${id}/json`,
        {
          params: { apikey: process.env.BLING_API_KEY },
        },
      );

      return result.data.retorno.pedidos[0].pedido;
    } catch (error) {
      throw new AppError(`Error in getting to Bling!`, 403);
    }
  }

  public async sendNewOrder(xml: string): Promise<void> {
    try {
      await axios.post(
        `${process.env.BLING_API_URL}/pedido/json`,
        {},
        {
          params: { apikey: process.env.BLING_API_KEY, xml },
        },
      );
    } catch (error) {
      throw new AppError(`Error in creating order in Bling!`, 403);
    }
  }

  public async generateXml(
    deal: IDealDTO,
    products: IDealProductDTO[],
  ): Promise<string> {
    const order = {
      numero: String(deal.id),
      data: format(parseISO(deal.add_time), 'dd/MM/yyyy'),
      cliente: this.fillClientInformation(deal),
      itens: { item: this.fillItemsInformation(products) },
    };

    return parse('pedido', order, { declaration: { encoding: 'UTF-8' } });
  }

  private fillClientInformation(deal: IDealDTO): IClientDTO {
    const client = deal.person_id || deal.org_id;

    const clientInfo: IClientDTO = {
      nome: client.name,
      endereco: client.address || '',
    };

    if (deal.person_id) {
      clientInfo.id = client.value;
      clientInfo.email = client.email.length ? client.email[0].value : '';
      clientInfo.fone = client.phone.length ? client.phone[0].value : '';
    }

    return clientInfo;
  }

  private fillItemsInformation(products: IDealProductDTO[]): IFilledItemsDTO[] {
    return products.map(product => {
      return {
        descricao: product.name,
        codigo: product.product_id,
        vlr_unit: product.item_price,
        qtde: product.quantity,
      };
    });
  }
}

export default BlingService;
