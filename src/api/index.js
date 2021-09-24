import axios from "axios";
require('dotenv').config()

axios.defaults.withCredentials = true;
const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "/api";
// const REACT_APP_API_URL = "/api";

let auth = {
  me: () => axios.get(`${API_URL}/auth/me`),
  login: (body = {email: null, password: null}) => axios.post(`${API_URL}/auth/login`, body),
  signup: (body = {email: null, phone: null, password: null, firstName: null, lastName: null}) => axios.post(`${API_URL}/auth/signup`, body),
}

let hustler = {
  findHustles: (cityId, serviceId) => axios.get(`${API_URL}/hustler/findHustles/${cityId}/${serviceId}`),
  search: (cityId, serviceName) => axios.get(`${API_URL}/hustler/search/${cityId}/${serviceName}`),
  searchWithPriceRange: (cityId, serviceName, hourlyMin, hourlyMax) => axios.get(`${API_URL}/hustler/search/${cityId}/${serviceName}?hourlyMin=${hourlyMin}&hourlyMax=${hourlyMax}`),
  searchWithPriceRangeAndAvailability: (cityId, serviceName, hourlyMin, hourlyMax, availability=[true, true, true]) => {
    let query = "";
    if (availability[0]) query = query + "&morning=1";
    if (availability[1]) query = query + "&noon=1";
    if (availability[2]) query = query + "&evening=1";
    return axios.get(`${API_URL}/hustler/search/${cityId}/${serviceName}?hourlyMin=${hourlyMin}&hourlyMax=${hourlyMax}${query}`);
  },

  getHustlersHustles: (hustlerId) => axios.get(`${API_URL}/hustler/hustlers/${hustlerId}/hustles`),
  
  getHustlerById: (id) => axios.get(`${API_URL}/hustler/hustlers/${id}`),
  getHustleById: (id) => axios.get(`${API_URL}/hustler/hustles/${id}`),
  
  deleteHustlerById: (id) => axios.delete(`${API_URL}/hustler/hustlers/${id}`),
  deleteHustleById: (id) => axios.delete(`${API_URL}/hustler/hustle/${id}`),
  
  getAllHustlers: () => axios.get(`${API_URL}/hustler/hustlers/`),
  getAllHustles: () => axios.get(`${API_URL}/hustler/hustle/`),
  
  createHustler: (body = {cityId: null, bio: null, about: null}) => axios.post(`${API_URL}/hustler/hustlers/`, body),
  createHustle: (body = {serviceId: null, hourlyRate: null, about: null}) => axios.post(`${API_URL}/hustler/hustle/`, body),
  
  createHustles: (body = {services: null}) => axios.post(`${API_URL}/hustler/hustles/`, body),
  
  uploadAvatar: (file = {avatar: null}) => axios.post(`${API_URL}/hustler/upload-avatar/`, file, {}),
  setBio: (bio) => axios.post(`${API_URL}/hustler/set-bio/`, {bio}),
  setAbout: (about) => axios.post(`${API_URL}/hustler/set-about/`, {about}),
  setAvailability: (availability) => axios.post(`${API_URL}/hustler/set-availability/`, {availability}),
  setHasOwnTools: (hasOwnTools) => axios.post(`${API_URL}/hustler/set-has-own-tools/`, {hasOwnTools}),
  setHasTransportation: (hasTransportation) => axios.post(`${API_URL}/hustler/set-has-transportation/`, {hasTransportation}),
  
  // Hustle
  setHourlyRate: (hustleId, hourlyRate) => axios.post(`${API_URL}/hustler/hustle/${hustleId}/set-hourly-rate/`, {hourlyRate}),
  setGetQuote: (hustleId, getQuote) => axios.post(`${API_URL}/hustler/hustle/${hustleId}/set-get-quote/`, {getQuote}),
  setDescription: (hustleId, description) => axios.post(`${API_URL}/hustler/hustle/${hustleId}/set-description/`, {description}),
  setService: (hustleId, serviceId) => axios.post(`${API_URL}/hustler/hustle/${hustleId}/set-service/`, {serviceId}),
  remove: (hustleId) => axios.delete(`${API_URL}/hustler/hustle/${hustleId}`),
  
}

let alias = {
  setAlias: (alias) => axios.post(`${API_URL}/alias/set-alias/`, {alias}),
  isAliasAvailable: (alias) => axios.get(`${API_URL}/alias/alias-available/${alias}`),
  getHustlerFromAlias: (alias) => axios.get(`${API_URL}/alias/hustler-from-alias/${alias}`),
}

let verify = {
  verifyEmail: (userId, code) => axios.post(`${API_URL}/verify/email/${userId}/${code}`),
  verifyPhone: (userId, code) => axios.post(`${API_URL}/verify/phone/${userId}/${code}`),
}

let service = {
  getServices: () => axios.get(`${API_URL}/service/services`),
}

let user = {
  getUserById: (id) => axios.get(`${API_URL}/user/users/${id}`),
  deleteUserById: (id) => axios.delete(`${API_URL}/user/users/${id}`),
  acceptTermsAndService: () => axios.post(`${API_URL}/user/accept-terms-and-service/`),

  requestPhoneNumberChange: (phone) => axios.post(`${API_URL}/user/phone/`, {phone}),
}

let booking = {
  createServiceRequest: (hustleId, userMessage, proposedDates=[]) => axios.post(`${API_URL}/booking/service-request/${hustleId}`, {userMessage, proposedDates}),
  markComplete: (serviceRequestId) => axios.post(`${API_URL}/booking/service-request/${serviceRequestId}/mark-complete`),
  markAccepted:(serviceRequestId) => axios.post(`${API_URL}/booking/service-request/${serviceRequestId}/mark-accepted`),
  markDeclined:(serviceRequestId) => axios.post(`${API_URL}/booking/service-request/${serviceRequestId}/mark-declined`)
}

let review = {
  rateService: (serviceRequestId, rating, comment) => axios.post(`${API_URL}/rate/${serviceRequestId}`, {rating, comment}),
}

let serviceRequest = {
  getServiceRequestById: (serviceRequestId) => axios.get(`${API_URL}/service-request/service-requests/${serviceRequestId}`),
  getServiceRequests: () => axios.get(`${API_URL}/service-request/service-requests`),
  getHustlersServiceRequests: () => axios.get(`${API_URL}/service-request/hustler`),
  getHustlerAcceptedServiceRequests: () => axios.get(`${API_URL}/service-request/hustler?accepted=true&completed=false&canceled=false`),
  getHustlerPendingServiceRequests: () => axios.get(`${API_URL}/service-request/hustler?accepted=false&completed=false&canceled=false`),
  getUserServiceRequests: () => axios.get(`${API_URL}/service-request/user`),
  getUserPendingServiceRequests: () => axios.get(`${API_URL}/service-request/user?accepted=false&completed=false&canceled=false`),
  getUserAcceptedServiceRequests: () => axios.get(`${API_URL}/service-request/user?accepted=true&completed=false&canceled=false`),
  getUserCompletedServiceRequests: () => axios.get(`${API_URL}/service-request/user?accepted=true&completed=true&canceled=false`)
}

let portfolio = {
  addPhotos: (hustleId, files) => axios.post(`${API_URL}/portfolio/hustle/${hustleId}/add-photos`, files, {}),
  deletePhoto: (hustleId, fileId) => axios.delete(`${API_URL}/portfolio/hustle/${hustleId}/${fileId}`),
  // setDescription: (hustleId, description) => axios.post(`${API_URL}/portfolio/hustle/${hustleId}/set-description`, {description}, {}),
}

let payment = {
  monthly: () => axios.post(`${API_URL}/payment/stripe/create-checkout-session/monthly`),
  yearly: () => axios.post(`${API_URL}/payment/stripe/create-checkout-session/yearly`),

  subscription: () => axios.get(`${API_URL}/payment/stripe/subscription`),
  cancel: () => axios.post(`${API_URL}/payment/stripe/subscription/cancel`),
  uncancel: () => axios.post(`${API_URL}/payment/stripe/subscription/uncancel`),
}

let city = {
  getCities: () => axios.get(`${API_URL}/city/cities`),
}

let api = {auth, hustler, verify, service, user, booking, review, serviceRequest, portfolio, payment, alias, city};
export default api;