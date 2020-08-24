// This file will contain all the functions that will required on multiple places.

export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // It will convert all properties into URL encoded String "user name" => "user%20name"
    let encodedValue = encodeURIComponent(params[property]); //if user name value is "sonu 123" => "sonu%20123"
    formBody.push(encodedKey + '=' + encodedValue); // example -> fromBody = ['username=sonu', 'password=1234']
  }
  return formBody.join('&'); // It will return a string like -> 'username=sonu&password=1234'
}
