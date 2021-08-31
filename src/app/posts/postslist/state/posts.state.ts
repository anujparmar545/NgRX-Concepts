import { Post } from "src/app/models/posts.model";

export interface PostState {
  posts: Post[]
}

export const initialState: PostState = {
  posts: [
    {id:1, title: 'Title 1', description: 'Description1'},
    {id:2, title: 'Title 2', description: 'Description2'},
    {id:3, title: 'Title 3', description: 'Description3'},
  ]
}
