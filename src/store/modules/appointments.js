export default {
  actions: {
    // Вытаскиваем встречи из localStorage
    async fetchAppointments (context) {
      if (localStorage.getItem('appointments')) {
        try {
          const appointment = JSON.parse(localStorage.getItem('appointments'))
          context.commit('updateAppointments', appointment)
        } catch (e) {
          localStorage.removeItem('appointments')
        }
      }
    },
    // Создаем встречу
    createAppointments (context, newAppointments) {
      context.commit('addNewAppointments', newAppointments)
    },
    // Меняем статус у встречи
    changeAppointmentsStatus (context, param) {
      const appointments = JSON.parse(localStorage.getItem('appointments'))
      const appointmentIndex = appointments.findIndex(x => x.id === param.id)
      appointments[appointmentIndex].status = param.status

      this.dispatch('commitAppointments', appointments)
    },
    // Удаление встречи
    deleteAppointment (context, id) {
      const appointments = JSON.parse(localStorage.getItem('appointments'))
      const newAppointments = appointments.filter(x => x.id !== id)

      this.dispatch('commitAppointments', newAppointments)
    },
    // Записываем данные в localStorage и state
    commitAppointments (context, value) {
      context.commit('updateAppointments', value)
      localStorage.setItem('appointments', JSON.stringify(value))
    }
  },
  mutations: {
    // Обновляем встречи
    updateAppointments (state, appointments) {
      state.appointments = appointments
    },
    // Добавляем новую встречу
    addNewAppointments (state, appointments) {
      state.appointments.unshift(appointments)
      localStorage.setItem('appointments', JSON.stringify(state.appointments))
    }
  },
  state: {
    appointments: []
  },
  getters: {
    // Получаем встречи из state
    allAppointments (state) {
      return state.appointments
    }
  }
}
