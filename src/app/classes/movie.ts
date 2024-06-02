export interface Movie {
    movieName: string;
    public: boolean;
    // imdbId: string | null;
}

export interface User {
    userId: number;
    username: string;
    email: string;
    createdOn: string;
    movieList: Movie[];
}