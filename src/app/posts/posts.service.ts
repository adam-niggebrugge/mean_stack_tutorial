import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient,) {}

  getPosts() {
    //expects a path (will be made more dynamic later)
    //can specify this generic git what it should expect
    //Get will also our JSON object out and there no need to recast it
    this.http.get<{message: string, posts: Post[]}>("http://localhost:3000/api/posts")
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });//need something to listen to it
    
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
