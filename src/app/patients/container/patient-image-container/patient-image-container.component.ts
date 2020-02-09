import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Platform, ToastController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { PhotoPersistor } from '../../services/patient-photo-persistor.service';
import { PhotoSelector } from '../../services/photo-selector.service';
import {
  createPictureComparisonToast,
  firstFileToBase64,
  getBase64ImageFromCamera,
  openComparisonModal
} from '../../../util/image';
import {Photo} from '../../models/photo';

@Component({
  selector: 'kryptand-patient-image-container',
  templateUrl: './patient-image-container.component.html',
  styleUrls: ['./patient-image-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientImageContainerComponent implements OnInit {
  @Input() treatmentId: string;
  @Input() patientId: string;
  images$: Observable<Photo[]>;
  refresh$: BehaviorSubject<void> = new BehaviorSubject(undefined);
  selectedPhotos: Photo[] = [];
  @ViewChild('upload') uploadElement: ElementRef;
  constructor(
    private camera: Camera,
    private toastCtrl: ToastController,
    private photoPersistor: PhotoPersistor,
    private cd: ChangeDetectorRef,
    private modalController: ModalController,
    public platform: Platform,
    public photoSelector: PhotoSelector
  ) {}

  ngOnInit() {
    if (!(this.treatmentId && this.patientId)) {
      return;
    }
    this.photoSelector.selectedPhotos$.subscribe(
      photos => (this.selectedPhotos = photos)
    );
    const photos$ = this.refresh$.pipe(
      switchMap(() =>
        this.photoPersistor.listForPatientAndTreatment(
          this.patientId,
          this.treatmentId
        )
      )
    );
    photos$.subscribe(photos => {
      this.images$ = of(photos.filter((photo: any) => photo));
      this.cd.markForCheck();
    });
  }
  uploadImage(uploadedImages: FileList) {
    if (!(uploadedImages && uploadedImages.length > 0)) {
      return;
    }
    firstFileToBase64(uploadedImages[0]).then((result: Photo) =>
      this.photoPersistor
        .save(this.patientId, this.treatmentId, result)
        .subscribe(_ => this.refresh$.next(undefined))
    );
  }

  uploadFromCamera() {
    if (this.platform.is('desktop')) {
      this.uploadElement.nativeElement.click();
    }
    getBase64ImageFromCamera(this.camera).then(image => {
      this.photoPersistor
        .save(this.patientId, this.treatmentId, image)
        .subscribe(_ => this.refresh$.next(undefined));
    });
  }

  isPhotoIncluded(photo: Photo): boolean {
    return this.selectedPhotos.some(x => x.id === photo.id);
  }
  selectPhoto(photo: Photo) {
    if (this.isPhotoIncluded(photo)) {
      this.photoSelector.selectedPhotos$.next(
        this.selectedPhotos.filter(x => x.id !== photo.id)
      );
      this.cd.markForCheck();
      return;
    }
    if (this.selectedPhotos.length < 2) {
      this.photoSelector.selectedPhotos$.next([...this.selectedPhotos, photo]);
      if (this.selectedPhotos.length === 2) {
        this.presentToastWithOptions(this.selectedPhotos).then(r => r);
      }
      this.cd.markForCheck();
      return;
    }
    this.selectedPhotos.shift();
    this.photoSelector.selectedPhotos$.next([...this.selectedPhotos, photo]);
    this.cd.markForCheck();
  }

  async presentToastWithOptions(photos: Photo[]) {
    const toast = await createPictureComparisonToast(
      photos,
      this.toastCtrl,
      () => {
        openComparisonModal(photos, this.modalController);
      }
    );
    await toast.present();
  }
  deletePhoto(photo: Photo) {
    if (this.isPhotoIncluded(photo)) {
      this.photoSelector.selectedPhotos$.next(
        this.selectedPhotos.filter(x => x.id !== photo.id)
      );
    }
    this.photoPersistor
      .remove(this.patientId, this.treatmentId, photo)
      .subscribe(_ => this.refresh$.next(undefined));
  }
}
