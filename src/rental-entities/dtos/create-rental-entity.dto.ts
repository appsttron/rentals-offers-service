export class CreateRentalEntityDto {
  permit: string;
  applicant: string;
  contact: string;
  permit_subtype_description: string;
  parcel: string;
  date_entered: Date;
  date_issued: Date;
  expiration_date: Date;
  permit_status: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  subdivision_lot: string;
  purpose: string;
  permit_owner_name: string;
  permit_owner_addr1: string;
  permit_owner_addr2: string;
  permit_owner_city: string;
  permit_owner_state: string;
  permit_owner_zip: string;
  permit_type: string;
  permit_subtype: string;
  council_dist: number;
  census_tract: number;
  mapped_location: {
    latitude: number;
    longitude: number;
    human_address: string;
  };
}
