const admin = require('firebase-admin');

var  serviceAccount = {
    "type": "service_account",
    "project_id": "collegehandbook074",
    "private_key_id": "ed7c92c7c149adba2b0bfe83cf08ebbdfce83123",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTmyb9y55l+501\nXz9etF1dRKd8+ycdA5Ec7DoZQWLbjcTGMuh4ajBThfodh9RA/f7Cq8tC/Gxxkc6P\n8PKsJEGcZ78zLDeCxnj8ZcRvRq6J6pt3HoHW59cU3/Iy0RHHTeoeO2mxlgbK5gvp\nCuO4gfOuqEIjBS3op1h7o9kZbm9mdKHvQxGou/VIXn1oOzX8NuAZVKjFYfwbxSol\nVohGNvhg4hnChwcIAOYZf5/u41rPdXztx9fkGbcDvx45+u6MCmjm6m0mGR5r766f\nI86ILMj6e1BRK6rHpXtLLIR/iLVwMPANVpANOjJVgNMTvHHHJH0g22R9pyvJc2+W\njquz8qFvAgMBAAECggEAHhXrtqNAH+1PN8e4NOdyeEY8FT9j04gcldaYaPlo2vNk\nfjl2JMUQIJYYStiarLyYprk5bufgeq2Les9Txz6EmQqUcCu9DMzDcD6V8VBo1veY\nxIjVUiZjMoAK78ypYQRCifL2MhowPD7zgoaTr9HdB2aIRHcTym4BnQHiiEp4Lluc\nP8D4Azzs0HplXqZ5XBE4m3+BeNS8GgZin35XXK04J/y/LXbqtzTMxxcmJtdyLXUo\ncxMkLl8CQgn5envVu4YbbT2f93D5BGW5h/9iIKf1byBZzhjI9RbaZ/AXsDs2ZrtW\nJRFGzj1sHcKoUhtRxYaMnGqrBwA0YYdlOV3LVPIGoQKBgQDCbuZO9a2Rxx116K3l\n7LZyjounu7Kt4lGbFpK57YoUM4fz14mxzBxGgA5DdFzPB/pth94HhemlA7ySA5tX\nlRPBOFqBFvKNurxEajArw2PZDR9Mylun4LjsFJwC5zV9LCuU2r7qCULtBwhHP5Ju\nHpSksaAZaz8pCINpT1rj1sVySQKBgQDCWFycmKr2R0b5JKNtrbaJIBMm+ihUuc5i\n56aVN27SEA0pNc5gWNc/NC3DZHSqRZidGKZUpqUxJDn7FvTqa188pCek0sOq2D50\ne/8ONFInVIujlI+2l1tDda7U6o/h8xz9Dbsa94EsBmW5ngzi8pG4kIPcYkKwqGlI\niNcqDIZ19wKBgQCISBNF5Q3z0AzmSGEbd/+p7CAXQYjMOIXansfZapYN8tCoKbtp\n1Bc9kyRsQ3OJ6Z2uiD0oKMTL1QKnlb+cc/GUzVsigGMi1HCBw6xgAGRMDtaRjIUR\n9oGneAqiPk1Pn1Ysz+ZhRHyUhwlWZ0jLxsOJbLc7GeD7cewqNGUQrclXgQKBgH4a\nD52cgfHjNe4bE9/qw3IeWc8Eqn6vQXdzj+dqXIH44FFJFGv3uVLNbJRH7ls9ZVUp\n1WM/7hgAxY5iyvAAU39plD+icku8nGnAuzJgSJ40gZbWopl7hEA1cAe/WzTlJn4c\nFrfcuPfz/rV+FCZ99oenXaf2KgeufwINqG8kSWrpAoGAXiGsHDvj4mUDWJ8e1uBy\nEGZtGeySvFmXMTdIAGChUE7xvcP8bnDpIH0/6PJEZ0cvYQf1ohg8xyBZ4iRtNEXF\nZEyDJ9MtZSjCsfldNtkuNHBIuHxxGhkXMM01KsRUSQeT7EWeNqJu1spgWo0+7fcp\nr19CKD91iuwA41rN7vGWNtY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-jkqe4@collegehandbook074.iam.gserviceaccount.com",
    "client_id": "101464674300895274905",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jkqe4%40collegehandbook074.iam.gserviceaccount.com"
  }
  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const firestore = admin.firestore();
module.exports.firestore = firestore