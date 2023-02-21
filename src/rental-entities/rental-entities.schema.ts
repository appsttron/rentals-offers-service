import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RentalEntityDocument = HydratedDocument<RentalEntity>;

@Schema()
export class RentalEntity {
  @Prop({
    index: true,
    unique: true,
  })
  permit: string;

  @Prop()
  applicant: string;

  @Prop()
  contact: string;

  @Prop()
  permit_subtype_description: string;

  @Prop()
  permit_status: string;

  @Prop()
  parcel: string;

  @Prop()
  date_entered: Date;

  @Prop()
  date_issued: Date;

  @Prop()
  expiration_date: Date;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: number;

  @Prop()
  subdivision_lot: string;

  @Prop()
  purpose: string;

  @Prop()
  permit_owner_name: string;

  @Prop()
  permit_owner_addr1: string;

  @Prop()
  permit_owner_addr2: string;

  @Prop()
  permit_owner_city: string;

  @Prop()
  permit_owner_state: string;

  @Prop()
  permit_owner_zip: string;

  @Prop()
  permit_type: string;

  @Prop()
  permit_subtype: string;

  @Prop()
  council_dist: number;

  @Prop()
  census_tract: number;

  @Prop({ type: Object })
  mapped_location: {
    latitude: number;
    longitude: number;
    human_address: string;
  };
}

export const RentalEntitySchema = SchemaFactory.createForClass(RentalEntity);
