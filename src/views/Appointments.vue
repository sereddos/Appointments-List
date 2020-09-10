<template>
  <div class="home">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Appointments List</h1>
      <b-button to="/make-appointments" class="h-25" variant="primary">Make Appointments</b-button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Full name</th>
          <th>Note</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody class="table_body">
        <tr v-for="appointment of allAppointments" :key="appointment.id">
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.full_name }}</td>
          <td>{{ appointment.note }}</td>
          <td>
            <b-form-checkbox
              :id="`id_`+appointment.id"
              :name="`name_`+appointment.date"
              @change="changeStatus($event, appointment.id)"
              v-model="appointment.status">
              complete
            </b-form-checkbox>
          </td>
          <td>
            <b-button
              variant="outline-primary"
              @click="showConfirm(appointment.full_name, appointment.id)"
            >
              Delete
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Appointments',
  computed: {
    // Получаем данные из state
    ...mapGetters(['allAppointments'])
  },
  async mounted () {
    // Получаем данные из localStorage
    this.fetchAppointments()
  },
  methods: {
    ...mapActions(['fetchAppointments', 'changeAppointmentsStatus', 'deleteAppointment']),
    // Меняем статус встречи
    changeStatus (event, id) {
      this.changeAppointmentsStatus({
        status: event,
        id: id
      })
    },
    // Показываем модальное окно для подтверждения удаления встречи
    showConfirm (name, id) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete: ${name}.`, {
        title: 'Please Confirm',
        okVariant: 'danger',
        okTitle: 'Yes',
        cancelTitle: 'No',
        footerClass: 'p-2'
      }).then(value => {
        if (value) {
          // Удаяем встречу
          this.deleteAppointment(id)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
