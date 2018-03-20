<template>
  <div class="image" v-on:click="imgRemove">
    <span class="close"></span>
    <div class="img-container flex1">
      <div v-on:click="imgChoose"
           v-on:dragenter="imgDragOver($event)"
           v-on:dragover="imgDragOver($event)"
           v-on:dragleave="imgDragLeave($event)"
           v-on:drop="imgDrop($event)"
           v-bind:class="{ 'img-container': true, highlighted: highlighted, loading1: loading }"
      >
        <img v-bind:src="imgUri" />
        <input type="file"
               style="display: none;visibility: hidden;"
               v-bind:guid="guid"
               v-on:change="imgUpload($event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import uuidv4 from 'uuid/v4'
import FileStorage from '../../services/FileStorage'
import Notification from '../../services/Notification'

export default {
  name: 'dd-image',
  props: [
    'uri'
  ],
  data () {
    return {
      guid: uuidv4(),
      imgUri: this.uri,
      highlighted: false,
      loading: false
    }
  },
  created () {
    this.path = 'openschedule/'
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
        this.loading = true
        FileStorage.upload(evt.target.result, this.path + this.guid, {
          contentType: f.type
        }).then(response => {
          this.loading = false
          this.imgUri = response.downloadURL
          this.$emit('imgChange', response.downloadURL)
        }).catch(err => {
          this.loading = false
          Notification.error(err)
        })
      })
      reader.readAsArrayBuffer(f)
    },
    imgRemove: function () {
      FileStorage.remove(this.path + this.guid)
        .then(() => {
          this.$emit('imgChange', '')
        })
        .catch(err => {
          Notification.error(err.message)
        })
    }
  }
}
</script>
<style scoped>
  div.image {
    position: relative;
  }
  div.image > .close {
    position: absolute;
    right: 0;
    top: 0;
  }
  div.img-container * {
    cursor: pointer;
  }
  div.img-container img {
    max-width: 100%;
  }
  div.img-container.highlighted,
  div.img-container:hover {
    background-color: var(--first-color);
  }
</style>
