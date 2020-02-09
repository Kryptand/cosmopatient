import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {Photo} from '../../models/photo';

@Component({
  selector: 'kryptand-patient-image',
  templateUrl: './patient-image.component.html',
  styleUrls: ['./patient-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientImageComponent implements OnInit {
  @Input() photo: Photo;
  @Input() withoutButtons: boolean = false;
  @Output() photoSelectEventTriggered: EventEmitter<Photo> = new EventEmitter();
  @Output() photoDeleteEventTriggered: EventEmitter<Photo> = new EventEmitter();
  @Input() selected: boolean = false;
  public formattedDateString: string;
  public selectPhoto() {
    this.photoSelectEventTriggered.emit(this.photo);
  }
  public deletePhoto() {
    setTimeout(() => {
      this.selected = false;
    }, 200);
    this.photoDeleteEventTriggered.emit(this.photo);
  }
  public ngOnInit() {
    if (!this.photo || !this.photo.createdAt) {
      return;
    }
    const createdAt = +this.photo.createdAt;
    this.formattedDateString = new Date(createdAt).toLocaleDateString();
  }
}
