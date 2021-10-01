import 'reflect-metadata';

interface IDealAmountPerDayDTO {
  date: string;
  value: number;
}

class AggregateDeals {
  public aggregateDeal(deals: IDealAmountPerDayDTO[]): any {
    const aggregatedDeals: IDealAmountPerDayDTO[] = deals.reduce(
      (accumulator: IDealAmountPerDayDTO[], current: IDealAmountPerDayDTO) => {
        const found = accumulator.findIndex(a => a.date === current.date);
        if (found >= 0) {
          accumulator[found].value += current.value;
        } else {
          accumulator.push({ date: current.date, value: current.value });
        }

        return accumulator;
      },
      [],
    );

    return aggregatedDeals;
  }
}

export default AggregateDeals;
