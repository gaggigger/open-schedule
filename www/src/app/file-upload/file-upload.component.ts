import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private divActive: boolean = false;
  @Output() onUpload = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onDrop(event) {
    event.preventDefault();
    this.divActive = false;

    if(event.dataTransfer.files.length) {
      this.uploadFile(event.dataTransfer.files);
    }
    return false;
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.divActive = true;
  }

  onDragEnter(event) {
    this.divActive = true;
    return false;
  }
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.divActive = false;
    return false;
  }

  uploadFile(files) {
    Array.from(files).map(f => {
      // Only process image files.
      if (!f['type'].match('image/jpeg') && !f['type'].match('image/png')) {
        alert('The file must be an image') ;
        return false ;
      }
      let reader = new FileReader();
      reader.onload = (event) => {
        this.handleUpload(event);
      };
      reader.readAsDataURL(<Blob> f);
    });
  }

  handleUpload(evt) {
    this.onUpload.emit(evt.target.result);
  }
}
