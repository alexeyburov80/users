export interface Addres {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  addres: Addres;
  geo: Geo;
  phone: string;
  website: string;
  company: Company;
}
