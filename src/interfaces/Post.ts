export interface Author {
    id: string;
    username: string;
}
export interface Post {
    id: string;
    title: string;
    content: string;
    topic: string;
    author: Author;
    createdAt: string;
}