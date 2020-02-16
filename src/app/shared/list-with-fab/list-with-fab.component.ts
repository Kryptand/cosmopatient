import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'kryptand-list-with-fab',
  templateUrl: './list-with-fab.component.html',
  styleUrls: ['./list-with-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWithFabComponent {
  @Input() entities$: Observable<any[]>;
  @Input() entityTemplateRef: TemplateRef<any>;
  @Output() fabButtonPressed: EventEmitter<void> = new EventEmitter<void>();
}
