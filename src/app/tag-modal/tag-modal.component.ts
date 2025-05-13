import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TagModalService } from './tag-modal.service';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.css'
})
export class TagModalComponent {
  tagForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TagModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tagService: TagModalService,
  ) {
    const project = localStorage.getItem('selected_project_id');
    this.tagForm = this.fb.group({
      name: [''],
      color: ['#ffffff'],
      project: [project]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.tagService.createTag(this.tagForm.value).subscribe({
      next : (response) =>{
        console.log('Tag creado :', response)
        this.dialogRef.close(response);
      },
      error: (error) => console.error('Error al crear la tarea:', error)
    });
  }
}