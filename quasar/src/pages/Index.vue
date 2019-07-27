<template>
<q-page class="flex flex-center">
    <div class="row">
        <div class="col-8 offset-2">
            <q-btn color="primary" icon="cloud_upload" class="full-width q-mb-xl" to="/upload">
                <span class="q-pl-md">Upload File</span>
            </q-btn>
        </div>
        <div class="col-8 offset-2">
            <q-btn color="primary" outline icon="list" class="full-width" to="/list">
                <span class="q-pl-md">List Files</span>
            </q-btn>
        </div>
    </div>
</q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
