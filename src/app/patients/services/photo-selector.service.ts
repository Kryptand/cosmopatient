import { Injectable } from "@angular/core";
import { Photo } from "../models/treatment";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PhotoSelector {
  selectedPhotos$: BehaviorSubject<Photo[]> = new BehaviorSubject([]);

  public selectPhotos(photos: Photo[]) {
    this.selectedPhotos$.next(photos);
  }
}
