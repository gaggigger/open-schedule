import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentService} from "../Services/attachment.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private divActive: boolean = false;
  @Input() item: object = {};
  @Input() readonly: boolean = true;
  @Input() pictures: Array<string> = [];
  @Input() itemData: number = null;
  @Output() onUpload = new EventEmitter<any>();

  constructor(
    private attachment: AttachmentService,
  ) { }

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
    this.attachment.upload(evt.target.result).then(result => {
      this.onUpload.emit({
        id : this.itemData['id'],
        item: this.item,
        data: result
      });
    }).catch(error => {
      console.error(error);
    });
  }
}
