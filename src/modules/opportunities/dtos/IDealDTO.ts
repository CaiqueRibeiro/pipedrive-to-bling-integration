export interface IDealDTO {
  id: number;
  creator_user_id: {
    id: number;
    name: string;
    email: string;
    has_pic: number;
    pic_hash: string;
    active_flag: boolean;
    value: number;
  };
  user_id: {
    id: number;
    name: string;
    email: string;
    has_pic: number;
    pic_hash: string;
    active_flag: boolean;
    value: number;
  };
  person_id: {
    active_flag: boolean;
    name: string;
    email: Array<string>;
    phone: Array<string>;
    owner_id: number;
    value: number;
  };
  org_id?: number;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time?: string;
  active: boolean;
  deleted: boolean;
  status: 'won' | 'lost';
  close_time: string;
  pipeline_id: number;
  won_time: string;
  first_won_time: string;
  lost_time: null;
  products_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  email_messages_count: number;
  activities_count: number;
  participants_count: number;
  expected_close_date: string;
  label?: string;
  stage_order_nr: number;
  person_name: 'Teste';
  group_id?: number;
  group_name?: string;
  formatted_value: string;
  weighted_value: number;
  formatted_weighted_value: string;
  weighted_value_currency: string;
  owner_name: string;
}

export interface IDealProductDTO {
  id: number;
  deal_id: number;
  order_nr: number;
  product_id: number;
  product_variation_id?: number;
  item_price: number;
  discount_percentage: number;
  duration: number;
  duration_unit: string;
  sum_no_discount: number;
  sum: number;
  currency: string;
  enabled_flag: boolean;
  add_time: string;
  last_edit?: string;
  comments?: string;
  active_flag: boolean;
  tax: number;
  name: string;
  sum_formatted: string;
  quantity_formatted: string;
  quantity: number;
}
