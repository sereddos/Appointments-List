<template>
  <div>
    <b-card no-body>
      <b-form @submit.stop.prevent="submit">
        <b-tabs v-model="tabIndex" small card>
          <!-- Tab Info -->
          <b-tab title="Info">

            <!-- Datepicker -->
            <b-form-group id="input-group-1" label="Date:" label-for="input-1">
              <b-form-datepicker
                id="input-1"
                :state="dateValidate"
                v-model="date"
                placeholder="Date">
              </b-form-datepicker>
              <div v-if="dateValidate">This field is required</div>
            </b-form-group>

            <!-- Full name -->
            <b-form-group id="input-group-2" label="Full name:" label-for="input-2">
              <b-form-input
                id="input-2"
                :state="fullNameValidate"
                v-model="full_name"
                placeholder="Full name">
              </b-form-input>
              <div v-if="fullNameValidate">This field is required</div>
            </b-form-group>

            <!-- Note -->
            <b-form-group id="input-group-3" label="Note:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="note"
                placeholder="Note">
              </b-form-input>
            </b-form-group>

            <!-- Next button -->
            <b-button-group class="mt-2">
              <b-button variant="primary" to="/">Back</b-button>
              <b-button @click="nextTab">Next</b-button>
            </b-button-group>

          </b-tab>

          <!-- Tab Confirmation -->
          <b-tab title="Confirmation" :disabled="!disabledTab">

            <!-- List Confirmation -->
            <b-list-group>
              <b-list-group-item>Date: {{ date }}</b-list-group-item>
              <b-list-group-item>Full name: {{ full_name }}</b-list-group-item>
              <b-list-group-item>Note: {{ note }}</b-list-group-item>
            </b-list-group>

            <!-- Previous button and Create -->
            <b-button-group class="mt-2">
              <b-button @click="tabIndex--">Previous</b-button>
              <b-button type="submit" variant="primary">Create appointment</b-button>
            </b-button-group>

          </b-tab>

        </b-tabs>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      attemptSubmit: null,
      full_name: '',
      note: '',
      date: '',
      status: false,
      tabIndex: 0
    }
  },
  computed: {
    // Проверяем поле date на заполнение
    missingDate: function () {
      return this.date === ''
    },
    // Проверяем поле full_name на заполнение
    missingFullName: function () {
      return this.full_name === ''
    },
    // Валидация поля date
    dateValidate: function () {
      return this.attemptSubmit && !this.missingDate
    },
    // Валидация поля full_name
    fullNameValidate: function () {
      return this.attemptSubmit && !this.missingFullName
    },
    // Валидация Confirmation tab
    disabledTab: function () {
      return !this.missingDate && !this.missingFullName
    }
  },
  methods: {
    ...mapActions(['createAppointments']),
    // Отрабатываем клик по кнопке Next
    nextTab () {
      this.attemptSubmit = true
      if (!this.missingDate && !this.missingFullName) {
        this.tabIndex++
      }
    },
    // Отправляем данные
    submit () {
      this.createAppointments({
        full_name: this.full_name,
        note: this.note,
        date: this.date,
        status: this.status,
        id: Date.now()
      })
      // Очищаем данные формы
      this.onReset()
    },
    // Очистка данных формы и переход на страницу списка встреч
    onReset () {
      this.full_name = this.note = this.data = ''
      this.$router.push({ path: '/' })
    }
  }
}
</script>
