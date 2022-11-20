import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPosition } from 'src/app/shared/classes/iposition';
import {
  MaterialInstance,
  MaterialService,
} from 'src/app/shared/services/material.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('categoryId') categoryId!: number;
  positions: IPosition[] = [];
  loading: boolean = false;
  modal!: MaterialInstance;
  positionId: any = null;

  form!: FormGroup;

  @ViewChild('modal') modalRef!: ElementRef;

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.modalInit(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: IPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    if (this.positionId) {
      newPosition.id = this.positionId;
      this.positionService.update(newPosition).subscribe(
        (position) => {
          const index = this.positions.findIndex(
            (pos) => pos.id === position.id
          );
          this.positions[index] = position;
        },
        (error) => {
          this.form.disable();
          console.log(error);
        },
        () => {
          this.modal.close();
          this.form.reset({ name: '', cost: 1 });
          this.form.enable();
        }
      );
    } else {
      this.positionService.create(newPosition).subscribe(
        (position) => {
          this.positions.push(position);
          this.form.enable();
        },
        (error) => {
          this.form.disable();
          console.log(error);
        },
        () => {
          this.modal.close();
          this.form.reset({ name: '', cost: 1 });
          this.form.enable();
        }
      );
    }
  }

  onDeletePosition(event: Event, position: IPosition) {
    event.stopPropagation();
    this.positionService.remove(position).subscribe(
      (response) => {
        const index = this.positions.findIndex((pos) => pos.id === position.id);
        this.positions.splice(index, 1);
      },
      (error) => console.log(error)
    );
  }

  onSelectPosition(position: IPosition) {
    this.positionId = position.id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    this.modal.open();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.patchValue({
      name: '',
      cost: 1,
    });
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }
}
