<template>
  <q-page>
      <div class="absolute-center full-width">
        <q-btn color="primary" outline class="full-width q-mb-lg" @click="chooseFile()">
          Choose File
        </q-btn>
        <q-list bordered padding>
          <q-item  v-if="file.filename">
            <q-item-section avatar top>
              <q-avatar color="primary" text-color="white" :icon="getIcon(file)" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{file.filename}}</q-item-label>
              <q-item-label caption>{{file.size}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item  v-else>
            <q-item-section>
              <q-item-label class="text-center">NO FILE SELECTED</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

    </div>
    <div class="absolute-bottom">
        <q-btn color="positive" class="full-width" :disabled="!file.filename" @click="upload()">
          Upload
        </q-btn>
    </div>
    <input id="library" type="file" accept="*" library style="display:none;">
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'
import fileMixins from '../mixins/file-mixins'
export default {
  name: 'PageUpload',
  mixins: [fileMixins],
  data () {
    return {
      file: {
        filename: '',
        size: '',
        mimeType: '',
        base64: ''
      }
    }
  },
  methods: {
    ...mapActions('General', ['Upload']),

    chooseFile () {
      const self = this
      let idInput = '#library'
      window.$(idInput).trigger('click')
      var hasNotified = false

      window.$(idInput).on('change', function () {
        var input = this
        if (input.files && input.files.length > 0) {
          let file = input.files[0]
          if (file.size > 52428800) {
            if (!hasNotified) {
              self.$q.notify({
                message: 'Arquivos acima de 50MB não são permitidos',
                color: 'warning',
                timeout: 1000
              })
              hasNotified = true
            }
            return
          }
          var reader = new FileReader()
          reader.onload = function (e) {
            self.$q.loading.hide()
            var base64 = e.target.result
            console.log('reader.onload => base64.length', base64.length)
            self.file.filename = file.name
            self.file.size = self.bytesToSize(file.size)
            self.file.mimeType = file.type
            console.log('self.file', self.file)
            self.file.base64 = base64
          }
          self.$q.loading.show()
          reader.readAsDataURL(input.files[0])
        }
      })
    },
    upload () {
      let formData = new FormData()
      Object.keys(this.file).forEach((key, index) => {
        formData.set(key, this.file[key])
      })
      this.$q.loading.show()
      this.Upload(formData)
        .then((data) => {
          this.$q.notify({
            message: 'File uploaded successfully',
            color: 'positive',
            timeout: 1000
          })
        })
        .finally(() => this.$q.loading.hide())
    }
  }
}
</script>
