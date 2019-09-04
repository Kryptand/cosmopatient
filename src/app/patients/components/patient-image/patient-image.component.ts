import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from "@angular/core";
import { Treatment, Photo } from "./../../models/treatment";
import { isNullOrUndefined } from "util";

@Component({
  selector: "kryptand-patient-image",
  templateUrl: "./patient-image.component.html",
  styleUrls: ["./patient-image.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientImageComponent implements OnInit {
  @Input() photo: Photo;
  @Input() withoutButtons: boolean = false;
  @Output() photoSelectEventTriggered: EventEmitter<Photo> = new EventEmitter();
  @Output() photoDeleteEventTriggered: EventEmitter<Photo> = new EventEmitter();
  @Input() selected: boolean = false;
  formattedDateString: string;
  constructor() {}
  selectPhoto() {
    this.photoSelectEventTriggered.emit(this.photo);
  }
  deletePhoto() {
    setTimeout(() => {
      this.selected = false;
    }, 200);
    this.photoDeleteEventTriggered.emit(this.photo);
  }
  ngOnInit() {
    if (!isNullOrUndefined(this.photo.createdAt)) {
      const createdAt=+this.photo.createdAt;
      this.formattedDateString = new Date(
        createdAt
      ).toLocaleDateString();
    }
  }
}
