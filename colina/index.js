/* eslint-disable */
var now = new Date()
var arrival = new Date()
arrival.setMonth(arrival.getMonth() + 3)
arrival.setHours(20, 40)
var adults = 2
var children = 1
var city = 'London'
var country = 'United Kingdom'
var zip = 'EC4A 1'
var address = '1 Fetter Lane'
var destination = [address, city, zip, country].join(', ')
var name = 'John Doe'
var prefix = '+1'
var phone = '22523352'
var locale = 'en-GB'
var currency = '£'
var basePrice = 2799
var discount = .15
var promoCode = 500

var pageProperties = {
  'guest-name': name,
  'guest-email': 'johndoe@example.com',
  'guest-phone': prefix + ' ' + phone,
  'guest-company': 'WestTech Inc.',
  'address': address,
  'city': city + ', ' + country,
  'zip': zip,
  'order-date': arrival.toLocaleDateString(locale),
  'shipping-arrival': arrival.toLocaleDateString(locale),
  'transaction-time': now.toLocaleString(locale),
  'arrival-date': arrival.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }),
  'destination': destination,
  'guests': getGuests(adults, children),
  'guests-in-room': adults + children,
  'summary-amount': formatCurrency(getPrice()),
  'price': formatCurrency(basePrice),
  'discounted-price': formatCurrency(getPrice()),
  'discount': formatCurrency(getDiscount()),
  'discount-percent': discount * 100,
  'tax': formatCurrency(getTax()),
  'promocode': formatCurrency(promoCode),
  'final-price': formatCurrency(getFinalPrice())
}

var authSecret = 'HQKf3M27FbtYg_Bmok2yG7qjgT72nNh6e8on7Kcl7Loae11kn-BkD99T2BlWRkrc'
var authAppKey = 'uizy0hUmGnCSSqw87P0621TqT6Jfsmyc'

hmw({handler: function () {
  setTimeout(function () {
    var iframe = document.getElementById('iframe_hmw').contentDocument
    if(iframe) iframe.body.children[0].style.border = 0
  }, 0)
}})
hmw({
  eventTime: arrival.getTime(),
  destination: destination,
  passengers: adults + children,
  timezone: 'Europe/London',
  user: {
    name: name,
    prefix: prefix,
    phone: phone
  }
})

var auth_user = 'ford@delosincorporated.com'
var auth_expire = Math.ceil(Date.now() / 1e3) + 15 * 60
var shaObj = new jsSHA('SHA-256', 'TEXT')
shaObj.setHMACKey(authSecret, 'TEXT')
shaObj.update([btoa(authAppKey), btoa(auth_user), auth_expire].join('.'))
var data = {
  application_key: authAppKey,
  user_id: auth_user,
  expiration: auth_expire,
  hash: shaObj.getHMAC('HEX')
}
hmw({auth: data})

for (var propertyName in pageProperties) {
  var field = document.getElementById(propertyName)
  if (field) field.innerText = pageProperties[propertyName]
}
function getGuests (adults, children) {
  var result = ''
  result += adults + ' Adult' + (adults === 1 ? '' : 's')
  if (children) result += ', ' + children + ' Child' + (children === 1 ? '' : 'ren')
  return result
}
function getPrice () {
  return basePrice - getDiscount()
}
function getDiscount () {
  return basePrice * discount
}
function getTax () {
  return getPrice() * .10
}
function getFinalPrice () {
  return getPrice() - promoCode
}
function formatCurrency (price) {
  return currency + ' ' + price.toFixed(2)
}
