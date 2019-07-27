<template>
  <q-page padding>
    <q-list padding>
      <q-item
        clickable
        v-ripple
        v-for="(file, index) in files"
        :key="index"
        @click="downloadFile(file)"
      >
        <q-item-section avatar top>
          <q-avatar color="primary" text-color="white" :icon="getIcon(file)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{file.filename}}</q-item-label>
          <q-item-label caption>{{bytesToSize(file.size)}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
    <div class="absolute-center" v-if="loading">
      <q-icon name="fas fa-sync-alt fa-spin"></q-icon>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'
import fileMixins from '../mixins/file-mixins'
export default {
  name: 'PageList',
  mixins: [fileMixins],
  data () {
    return {
      loading: false,
      files: []
    }
  },
  mounted () {
    this.listFiles()
  },
  methods: {
    ...mapActions('General', ['List', 'Download']),
    listFiles () {
      this.loading = true
      this.List()
        .then((data) => {
          this.files = data
        })
        .finally(() => {
          this.loading = false
        })
    },
    downloadFile (file) {
      this.$q.dialog({
        message: `Do you want to download "${file.filename}"?`,
        ok: 'Confirm',
        cancel: 'Cancel'
      }).onOk(() => {
        this.$q.loading.show()
        this.Download(file)
          .then((data) => {
            let anchor = document.createElement('a')
            const byteCharacters = atob(data.base64)
            const byteNumbers = new Array(byteCharacters.length)
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            anchor.href = window.URL.createObjectURL(new Blob([byteArray]))
            anchor.download = file.filename
            anchor.click()

            this.$q.notify({
              message: 'File downloaded successfully',
              color: 'positive',
              timeout: 1000
            })
          })
          .finally(() => this.$q.loading.hide())
      }).onCancel(() => {
      })
    }
  }
}
</script>
