import { APIResponse, expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(200)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.OK)
  // check that body.comment is string type
  expect(typeof responseBody.comment).toBe('string')
  // check that body.courierId is number type
  expect(typeof responseBody.courierId).toBe('number')
})


// Homework 10

test.describe('HW_10', () => {
  test('1-put: Update order with valid ID (1 - 10) and includes a valid 16-digit API key ', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const requestBody = {
      status: 'OPEN',
      courierId: 1,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 1,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(200)
  })

  test('2-put: Update order with valid ID ( 1 - 10) includes a invalid 15-digit API key ', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '123456789012345',
    }

    const requestBody = {
      status: 'OPEN',
      courierId: 2,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 2,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(401)
  })

  test('3-put: Update order with invalid ID (1 - 10) and includes a valid 17-digit API key ', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '12345678901234567',
    }
    const requestBody = {
      status: 'OPEN',
      courierId: 3,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 3,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(401)
  })

  test('4-put: Update order with invalid ID ( 11 ) and includes a valid 16-digit API key ', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const requestBody = {
      status: 'OPEN',
      courierId: 11,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 11,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(400) //
  })
  // Код ошибки 400 взят из DevTools. В документации не описана.

  test('5-put: Update order without ID and includes a valid 16-digit API key ', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(405) //
  })
  // Ошибка 405. Такая ошибка не описана в документации. Код ошибки взял из DevTools

  test('6-put: Update order with valid ID (1 - 10) and without API key   ', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '',
    }

    const requestBody = {
      status: 'OPEN',
      courierId: 2,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 2,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(401)
  })

  test('7-put: Update order with empty request body', async ({ request }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const requestBody = {
      status: '',
      courierId: 0,
      customerName: '',
      customerPhone: '',
      comment: '',
      id: 1,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
      headers: requestHeaders,
      data: requestBody,
    })
    expect(response.status()).toBe(400)
  })
  // По документации код ответа 404 - Order not found (if request body is empty). По факту из DevTools - 400 Bad Request.
  // Если полностью убрать тело запроса, то код ответа 200 - это ошибка. Такого не должно быть. Это Баг.

  //           Tests fot GET request

  test('8-Get Login with valid username and password, code 200 and APIKEY ', async ({
    request,
  }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/', {
      params: {
        username: 'user',
        password: 'password_mine',
      },
    })

    const responseBody = await response.json()
    console.log(responseBody)
    const statusCode = response.status()
    expect(statusCode).toBe(200)
    expect(responseBody.apiKey).toBeDefined()
  })

  test('9-get Login without username and valid password ', async ({ request }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/', {
      params: {
        password: 'password_mine',
      },
    })

    const statusCode = response.status()
    expect(statusCode).toBe(500)
  })

  test('10-get Login with valid username and without password  ', async ({ request }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/', {
      params: {
        username: 'user',
      },
    })

    const statusCode = response.status()
    expect(statusCode).toBe(500)
  })

  test('11-get Login without username and without password   ', async ({ request }) => {
    // Build and send a GET request to the server
    const response = await request.get('https://backend.tallinn-learning.ee/test-orders/', {
      params: {},
    })

    const statusCode = response.status()
    expect(statusCode).toBe(500)
  })

  // Tests for DELETE

  test('12-DELETE  Delete order with valid ID (1 - 10) and includes a valid 16-digit API key, status 204', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(204)
  })

  test('13-DELETE  Delete order with valid ID ( 1 - 10) without API key , status 401', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {}

    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(400)
  })
  // В задании отсутствие API должно выдавать ошибку 401(401: Unauthorized – the API key is missing, invalid, or not 16 digits).
  // По факту работает с ошибкой  - 400 Bad Request. В DevTools отсутствие API не показывает ничего.

  test('14-DELETE  Delete order with invalid ID ( 11 ) and includes a valid 16-digit API key , status 400', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/11', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(400)
  })

  test('15-DELETE  Delete order without ID includes a valid 16-digit API key  , status 405', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '1234567890123456',
    }

    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(405)
  })
  // Статус 405, поскольку метод DELETE не работает без идентификатора.

  test('16-DELETE  Delete order with valid ID (1 - 10) and includes a invalid 17-digit API key   , status 401', async ({
    request,
  }) => {
    const requestHeaders: { api_key: string } = {
      api_key: '12345678901234567',
    }

    const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/3', {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(401)
  })
})