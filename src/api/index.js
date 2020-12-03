import request from '@/utils/request'
// import store from '@/store'

export const getInter = params => {
  return request({
    method: 'GET',
    url: '/xiaomi.php',
    params
  })
}
export const getQuantity = () => {
  return request({
    method: 'GET',
    url: '/cs.php'
  })
}

export const getList = () => {
  return request({
    method: 'GET',
    url: '/user_all.php'
  })
}
export const delKey = key => {
  return request({
    method: 'GET',
    url: '/delete.php',
    params: {
      key
    }

  })
}
export const searchkey = params => {
  return request({
    method: 'GET',
    url: '/search.php',
    params
  })
}
export const getkm = () => {
  return request({
    method: 'GET',
    url: '/from_key.php',
  })
}

export const postLx = params => {
  return request({
    method: 'GET',
    url: '/lx.php',
    params
  })
}

export const postydq = params => {
  return request({
    method: 'GET',
    url: '/ydq.php',
    params
  })
}
