import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


const STORAGE_KEY = "bookmarks"
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private storage: NativeStorage) { }

  getAllBookmarks(){
    return this.storage.getItem(STORAGE_KEY);
  }

  bookmarkedNews(id){
    return this.getAllBookmarks().then((result)=>{
      if(result){
        result.push(id);
        return this.storage.setItem(STORAGE_KEY, result);
      }else{
        return this.storage.setItem(STORAGE_KEY, [id]);
      }
    });
  }

  unBookmarkNews(id){
    return this.getAllBookmarks().then((result)=>{
      if(result){
        var index = result.indexOf(id);
        result.splice(index, 1);
        return this.storage.setItem(STORAGE_KEY, result);
      }
    });
  }

  isBookmarked(id){
    return this.getAllBookmarks().then((result)=>{
      return result && result.indexOf(id);
    })
  }
}
