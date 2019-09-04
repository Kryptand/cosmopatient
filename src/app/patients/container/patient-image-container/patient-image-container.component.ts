import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Platform, ToastController, PopoverController, ModalController } from "@ionic/angular";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { Photo } from "../../models/treatment";
import { PhotoPersistor } from "./../../services/patient-photo-persistor.service";
import { PatientImageComparisonComponent } from '../../components/patient-image-comparison/patient-image-comparison.component';
@Component({
  selector: "kryptand-patient-image-container",
  templateUrl: "./patient-image-container.component.html",
  styleUrls: ["./patient-image-container.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientImageContainerComponent implements OnInit {
  @Input() treatmentId: string;
  @Input() patientId: string;
  images$: Observable<Photo>;
  refresh$: BehaviorSubject<void> = new BehaviorSubject(undefined);
  selectedPhotos:Photo[]=[];
  @ViewChild("upload", { static: true }) uploadElement: ElementRef;
  constructor(
    private camera: Camera,
    private toastCtrl:ToastController,
    private photoPersistor: PhotoPersistor,
    private cd: ChangeDetectorRef,
    private modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (
      isNullOrUndefined(this.treatmentId) ||
      isNullOrUndefined(this.patientId)
    ) {
      return;
    }
    const photos$ = this.refresh$.pipe(
      switchMap(() =>
        this.photoPersistor.listForPatientAndTreatment(
          this.patientId,
          this.treatmentId
        )
      )
    );
    photos$.subscribe(values => {
      this.images$ = of(
        values.filter((value: any) => !isNullOrUndefined(value))
      );
      this.cd.markForCheck();
    });
  }
  uploadImage() {
    const fileList: FileList = this.uploadElement.nativeElement.files;
    if (fileList && fileList.length > 0) {
      this.firstFileToBase64(fileList[0]).then(
        (result: string) => {
          let photo = {
            id: "",
            content: result,
            fileName: "uploadedImage",
            createdAt: Date.now().toString()
          };
          this.photoPersistor
            .save(this.patientId, this.treatmentId, photo)
            .subscribe(_ => this.refresh$.next(undefined));
        },
        (err: any) => {
          console.error(err);
        }
      );
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = error => {
          reject(error);
        };
      } else {
        reject(new Error("No file found"));
      }
    });
  }
  uploadFromCamera() {
    if (this.platform.is("desktop")) {
      this.uploadElement.nativeElement.click();
    }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        let photo = {
          id: "",
          content: base64Image,
          fileName: "uploadedImage",
          createdAt: Date.now().toString()
        };
        this.photoPersistor
          .save(this.patientId, this.treatmentId, photo)
          .subscribe(_ => this.refresh$.next(undefined));
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
  isPhotoIncluded(photo:Photo):boolean{
    return this.selectedPhotos.some(x=>x.id===photo.id);
  }
   selectPhoto(photo:Photo){

    if(this.isPhotoIncluded(photo)){
     this.selectedPhotos=this.selectedPhotos.filter(x=>x.id!==photo.id);   
     return  this.cd.markForCheck();
    }    
    if(this.selectedPhotos.length<2){
     this.selectedPhotos=[...this.selectedPhotos,photo];
     if(this.selectedPhotos.length===2){
      this.presentToastWithOptions();
    }    
        return this.cd.markForCheck();
    }
    this.selectedPhotos.shift();
    this.selectedPhotos=[...this.selectedPhotos,photo];
    this.cd.markForCheck();
      
    
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastCtrl.create({
      header: 'Vergleichen',
      message: `${this.selectedPhotos.length} Elemente selektiert`,
      position: 'bottom',
      duration: 10000,
      buttons: [
        {
          icon: 'star',
          text: 'Vergleichen',
          handler: () => {
            this.openOverlay();
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            toast.remove();
          }
        } 
      ]
    });
    toast.present();
  }
  create() {
    this.openOverlay();
  }
  async openOverlay() {
    const modal = await this.modalController.create({
      component: PatientImageComparisonComponent,
      componentProps: { images: this.selectedPhotos, popover: this.modalController },
      cssClass:'image-overlay'
    });
    await modal.present();
    const result = await modal.onDidDismiss();
  }
  deletePhoto(photo:Photo){
    if(this.isPhotoIncluded(photo)){
       this.selectedPhotos=this.selectedPhotos.filter(x=>x.id!==photo.id);
      }
    this.photoPersistor.remove(this.patientId,this.treatmentId,photo).subscribe(_ => this.refresh$.next(undefined));
  }

}
