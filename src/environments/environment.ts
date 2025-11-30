export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Priyanka Malikar Portfolio',
  version: '0.1.0',
  // Add emailjs config here (replace with your keys)
  emailjs: {
    userId: '',
    serviceId: '',
    templateId: ''
  },
  // Optional GitHub token for higher rate limits
  github: {
    token: ''
  }
  ,
  // tawk.to property id (set to your property id to enable chat)
  tawk: {
    propertyId: ''
  }
};