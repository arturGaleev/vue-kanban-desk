import Vue from 'vue'
import Vuex from 'vuex'
import Repository from '../repository/repository.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    users: [],
    boards: [],
    comments: [],
    boardsFilter: [],
    usersFilter: [],
    nameFilter: [],
    popup: false,
    currentTaskForComment: null
  },
  mutations: {
    setDataKanban (state, payload) {
      state.tasks = payload.tasks
      state.users = payload.users
      state.boards = payload.boards
      state.comments = payload.comments
    },
    setUserInTask (state, payload) {
      let task = state.tasks.find(task => task.id === payload.taskID)
      task.userIDs = payload.usersSelected
    },
    setBoardInTask (state, payload) {
      let task = state.tasks.find(task => task.id === payload.taskID)
      task.boardID = payload.boardID
    },
    setNameFilterInTask (state, payload) {
      let filter = state.tasks
        .filter(task => {
          let title = task.title.toLowerCase()
          let searchText = payload.searchText.toLowerCase()
          return title.indexOf(searchText) !== -1
        })
      state.nameFilter = filter.map(i => i.id)
    },
    setFilter (state, payload) {
      state[payload.filter + 'Filter'] = payload.value
    },
    showPopup (state) {
      state.popup = true
    },
    setTaskForComment (state, payload) {
      state.currentTaskForComment = state.tasks.find(task => task.id === payload.taskID)
    },
    addCommit (state, payload) {
      let arrForMax = state.comments.map(i => +i.id)
      let id = Math.max.apply(null, arrForMax) + 1
      let commentText = payload.commentText
      state.comments.push({
        id,
        body: commentText,
        userID: 0
      })
      state.currentTaskForComment.commentID.push(id)
    },
    closePopup (state) {
      state.popup = false
    }
  },
  actions: {
    async fetchData ({ commit }) {
      try {
        const dataKanban = await Repository.get('/data')
        if (dataKanban.status === 200) {
          commit('setDataKanban', dataKanban.data)
        } else {
          alert('Что-то пошло не так, перезагрузите страницу')
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    getListTasks (state) {
      return function (param) {
        let board = state.boards.find(i => i.name === param)
        return state.tasks.filter(task => task.boardID === board.id)
      }
    },
    users (state) {
      return state.users
    },
    getUser (state) {
      return function (param) {
        let user = state.users.find(user => user.id === param)
        return user
      }
    },
    usersFilter (state) {
      return state.usersFilter
    },
    nameFilter (state) {
      return state.nameFilter
    },
    boards (state) {
      return state.boards
    },
    boardsFilter (state) {
      return state.boardsFilter
    },
    comments (state) {
      return function (param) {
        let comments = []
        param.forEach(i => {
          let comment = state.comments.find(comment => comment.id === i)
          comments.push(comment)
        })
        return comments
      }
    },
    popup (state) {
      return state.popup
    },
    getTaskForComment (state) {
      return state.currentTaskForComment
    }
  }
})
