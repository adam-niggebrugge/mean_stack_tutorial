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
    this.http.get<{message: string, posts: Post[]}>("http://localhost:3000/api/get")
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
    this.http
      .post<{message: string}>("http://localhost:3000/api/posts", post)
        .subscribe((responseData) => {
          console.log(responseData.message);
          //this is moved due to the subscribe will only work when asynchronous post returns success.
          this.posts.push(post);//local data which is fine to keep since we will probably want to mess with it on the client side
          this.postsUpdated.next([...this.posts]);
        });
  }

}
