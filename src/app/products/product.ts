export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MoviesList {
  Search: Movie[];
  Response;
  totalResults;
  Error;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: string;
  Metascore: string;
  imdbID: string;
  imdbRating: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface MovieListSearch {
  search: string;
}

export interface MovieIdSearch {
  search: string;
}
