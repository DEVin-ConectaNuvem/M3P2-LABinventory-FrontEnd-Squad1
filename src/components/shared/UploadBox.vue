<template>
    <div class="uploadBox">
         <input type="file" @change="onFileSelected">
         <button @click="onUpload">Upload</button>
    </div>
</template>

<script>
export default {
    name: 'UploadBox',
    data () {
        return {
            selectedFile : null
        }
    },
    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0]
        }
    }
}
</script>

<style>
.uploadBox {
    background-color: rgb(238, 238, 238);
    border-radius: 10px;
    height: 5rem;
    border: 3px dashed gray;
    text-align: center;
}

.uploadImage{
  height: 100%;
}
</style>