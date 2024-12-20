<template>
  <q-page class="q-pa-md">
    <q-card class="my-3 shadow-2 rounded-borders">
      <q-card-section>
        <div class="q-gutter-md q-mb-md">
          <div class="q-gutter-sm row items-center justify-between">
            <h4 class="text-h5 text-weight-bold">Deleted Contacts</h4>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="contacts"
          :columns="columns"
          row-key="id"
          :pagination="pagination"
          :rows-per-page-options="[5, 10, 15]"
          flat
          bordered
          class="q-mb-none table-custom"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import DeleteViewLogic from './DeleteView.js'

export default {
  name: 'DeleteView',
  mixins: [DeleteViewLogic],
}
</script>

<style>
@import './DeleteView.css'
</style>
