import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { ICategory } from 'src/app/shared/classes/ICategory';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  isNewForm = true;
  form!: FormGroup;
  image!: File;
  imagePreview: any;
  category!: ICategory;

  @ViewChild('input') inputRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNewForm = false;
            return this.categoryService.getById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        (category) => {
          if (category) {
            this.form.patchValue({ name: category.name });
            this.imagePreview = category.imageSrc;
            this.category = category;
          }
          this.form.enable();
        },
        (error) => console.log(error)
      );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const isConfirm = confirm('Are you sure to delete this category');
    if (isConfirm) {
      this.categoryService.removeById(this.category.id).subscribe(
        (response) => alert(response.message),
        (error) => console.log(error),
        () => this.router.navigate(['/categories'])
      );
    }
  }

  onSubmit() {
    let $stream;
    this.form.disable();
    if (this.isNewForm) {
      $stream = this.categoryService.create(this.form.value.name, this.image);
    } else {
      $stream = this.categoryService.update(
        this.category.id,
        this.form.value.name,
        this.image
      );
    }
    $stream.subscribe(
      (category) => {
        this.category = category;
        this.form.enable();
      },
      (error) => {
        console.log(error);
        this.form.enable();
      }
    );
  }
}
