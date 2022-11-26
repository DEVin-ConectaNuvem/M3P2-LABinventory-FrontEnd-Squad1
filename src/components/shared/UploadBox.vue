<template>
  <div class="uploadBox">
    <input type="file" class="w-100" @change="onFileSelected" />
    <button class="btn btn-sm btn-success" @click="onUpload">Upload</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UploadBox',
  props: ['fileProps'],
  emits: ['fileReady'],
  data() {
    return {
      selectedFile: null
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    async onUpload() {
      const fileObject = await this.getBase64(this.selectedFile)
      if (this.fileProps == 'image') {
        try {
          this.isFileAnImage(fileObject)
          this.isFileSizeValid(fileObject)
          this.$emit('fileReady', fileObject)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          this.isFileSizeValid(fileObject)
          this.$emit('fileReady', fileObject)
        } catch (e) {
          console.log(e)
        }
      }
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader()
        reader.onload = function () {
          return resolve({
            base64: reader.result,
            name: file.name,
            size: file.size,
            type: file.type
          })
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
    isFileAnImage(file) {
      if (file.type.includes('image')) {
        return true
      }
      throw 'Objeto não é uma imagem'
    },
    isFileSizeValid(file) {
      if (file.size <= 3000000) {
        return true
      }
      throw 'O tamanho do arquivo excede o limite de 3mb'
    }
  }
}
</script>

<style>
.uploadBox {
  background-color: rgb(238, 238, 238);
  border-radius: 10px;
  border: 3px dashed gray;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;

  gap: 1rem;
}

.uploadImage {
  height: 100%;
}
</style>
