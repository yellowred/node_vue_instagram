import fetch from 'node-fetch';
var BACKEND_URL = 'http://192.168.10.100:3000'


export function fetchByType (type) {
  return fetch(`${BACKEND_URL}/${type}`)
          .then(res => res.json())
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function addToFeatured (id) {
  return fetch(`${BACKEND_URL}/fresh/${id}/featured`, { method: 'PATCH' })
          .then(res => res.json())
}


export default {
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchByType(type)
      .then(items => {
        items = items.slice(0, 10)
        console.log('(╯°□°）╯', items);
        
        commit('SET_LIST', { type, items })
        commit('SET_ITEMS', { items })
      })
  },
  ITEM_ADD_TO_FEATURED: ({ commit, dispatch, state }, { id }) => {
    return addToFeatured(id)
  }
}