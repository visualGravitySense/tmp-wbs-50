export interface PartnerLogo {
  _id: string;
  name: string;
  displayType?: 'logo' | 'text';
  logo?: {
    _type: 'image';
    alt?: string;
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  url?: string;
  order?: number;
  industry?: string;
  country?: string;
}
