<template>
  <div>
    <div v-on:click="imgChoose"
         v-on:dragenter="imgDragOver($event)"
         v-on:dragover="imgDragOver($event)"
         v-on:dragleave="imgDragLeave($event)"
         v-on:drop="imgDrop($event)"
         v-bind:class="{ 'img-container': true, highlighted : highlighted }"
    >
      <img v-bind:src="uri" />
      <input type="file"
             style="display: none;visibility: hidden;"
             v-bind:guid="guid"
             v-on:change="imgUpload($event)"
      />
    </div>
  </div>
</template>
<script>
import uuidv4 from 'uuid/v4'
import FileStorage from '@/services/FileStorage'
import Notification from '@/services/Notification'

export default {
  name: 'dd-image',
  data () {
    return {
      uri: '',
      guid: uuidv4(),
      highlighted: false
    }
  },
  created () {
    console.log(this.guid)
  },
  methods: {
    // Drag Droop upload
    imgDragOver: function (event) {
      event.preventDefault()
      event.stopPropagation()
      this.highlighted = true
      return false
    },
    imgDragLeave: function (event) {
      event.preventDefault()
      event.stopPropagation()
      this.highlighted = false
      return false
    },
    imgChoose: function () {
      document.querySelector('input[guid="' + this.guid + '"]').click()
    },
    imgUpload: function (event) {
      const f = event.target.files[0]
      this.uploadFile(f, this.guid)
      return false
    },
    imgDrop: function (event) {
      event.preventDefault()
      event.stopPropagation()
      this.highlighted = false
      if (!event.dataTransfer.files.length) return false
      const f = event.dataTransfer.files[0]
      this.uploadFile(f)
      return false
    },
    uploadFile: function (f) {
      // Only process image files.
      if (!f.type.match('image/jpeg') && !f.type.match('image/png')) {
        alert('The file must be an image')
        return false
      }
      const reader = new FileReader()
      reader.addEventListener('loadend', evt => {
        if (evt.target.result.byteLength > 1048576) {
          alert('Image too large, size must be less than 1MB')
          return false
        }
        FileStorage.upload(evt.target.result, 'openschedule/' + this.guid, {
          contentType: f.type
        }).then(response => {
          this.uri = response.downloadURL
        }).catch(err => {
          Notification.error(err)
        })
      })
      reader.readAsArrayBuffer(f)
    }
  }
}
</script>
<style scoped>
  div.img-container {
    border: 1px solid var(--first-color);
    cursor: pointer;
    min-width: 150px;
    min-height: 150px;
  }
  div.img-container.highlighted,
  div.img-container:hover {
    background-color: var(--first-color);
  }
</style>
