import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Treatment } from '../../models/treatment';

@Component({
  selector: 'kryptand-patient-treatment',
  templateUrl: './patient-treatment.component.html',
  styleUrls: ['./patient-treatment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientTreatmentComponent {
  @Output() treatmentSelectEventTriggered: EventEmitter<
    Treatment
  > = new EventEmitter();
  @Output() editEventTriggered: EventEmitter<Treatment> = new EventEmitter();
  @Output() deleteEventTriggered: EventEmitter<Treatment> = new EventEmitter();
  @Input() patientId: string;
  @Input() treatment: Treatment;

  public editEvent(treatment: Treatment) {
    this.editEventTriggered.next(treatment);
  }
  public deleteEvent(treatment: Treatment) {
    this.deleteEventTriggered.next(treatment);
  }
}
