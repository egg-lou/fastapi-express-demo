export class Movie {
    id: number;
    title: string;
    directorId: number;

    constructor(id: number, title: string, directorId: number) {
        this.id = id;
        this.title = title;
        this.directorId = directorId;
    }
}