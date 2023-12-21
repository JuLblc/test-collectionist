export type AnyObject = { [key: string]: any };

export type AnyObjectWithId = AnyObject & { id: number };

export type APIMovie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  overview: string;
};

export type MovieWithFavoriteStatus = APIMovie & {
  isFavorite: boolean;
};
