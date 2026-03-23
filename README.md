| №  | Endpoint | Description                                                                  | Expected result                                                         |
|----|----------|------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| 1  | Put      | Update order with valid ID (1 - 10) and includes a valid 16-digit API key    | 200 success                                                             |
| 2  | Put      | Update order with valid ID ( 1 - 10) and includes a invalid 15-digit API key | 401 Unauthorized                                                        |
| 3  | Put      | Update order with valid ID (1 - 10) and includes a invalid 17-digit API key  | 401 Unauthorized                                                        |
| 4  | Put      | Update order with invalid ID ( 11 ) and includes a valid 16-digit API key    | 400 Bad Request                                                         |
| 5  | Put      | Update order without ID includes a valid 16-digit API key                    | 405 Unauthorized                                                        |
| 6  | Put      | Update order with valid ID (1 - 10) and without API key                      | 401 Unauthorized                                                        |
| 7  | Put      | Update order with empty request body                                         | 404  Order not found - per Swagger(but devtool shows - 400 bad request) |
| 8  | Get      | Login with valid username and password                                       | 200 Success – returns a login message and the API key                   |
| 9  | Get      | Login without username and valid password                                    | 500 username or password is missing                                     |
| 10 | Get      | Login with valid username and without password                               | 500 username or password is missing                                     |
| 11 | Get      | Login without username and without password                                  | 500 username or password is missing                                     |
| 12 | Delete   | Delete order with valid ID (1 - 10) and includes a valid 16-digit API key    | 204 Order deleted successfully                                          |
| 13 | Delete   | Delete order with valid ID ( 1 - 10) without API key                         | 401 Unauthorized                                                        |
| 14 | Delete   | Delete order with invalid ID (11, 15) and includes a valid 16-digit API key  | 400 Bad Request                                                         |
| 15 | Delete   | Delete order without ID includes a valid 16-digit API key                    | 405 Unauthorized                                                        |
| 16 | Delete   | Delete order with valid ID (1 - 10) and includes a invalid 17-digit API key  | 401 Unauthorized                                                        |


 