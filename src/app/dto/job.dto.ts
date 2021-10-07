export interface JobResponse {
  count: number;
  mean: number;
  results: Job[];
  __CLASS__: string;
}

export interface Job {
  adref: string;
  category: { __CLASS__: string; label: string; tag: string };
  company: { display_name: string; __CLASS__: string };
  created: Date;
  description: string;
  id: string;
  latitude: number;
  location: { __CLASS__: string; area: string[]; display_name: string };
  longitude: number;
  redirect_url: string;
  salary_is_predicted: string;
  title: string;
  __CLASS__: string;
  imageUrl?: string;
}
