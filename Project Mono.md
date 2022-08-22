# Project Mono

---

Application Name: uSayit

Description:

    Aplikasi yang dapat mengirim pesan sesuai yang diinput oleh pengguna ke berbagai macam official platform sosial media yang bersifat anonim.

---

## Development

- Social Media Platforms
    
    - Twitter
        
    - Instagram
        
- Website Application
    - UI/UX Design: https://www.figma.com/file/vG4tOzFFlFurGfPcM4rHcq/Mono?node-id=0%3A1
    - Landing Page
        - Halaman Informasi tentang Aplikasi
        - Informasi Platform yang tersedia
        - Kebijakan dalam penggunaan aplikasi
        - Button menuju ke halaman message page
        - FAQ
        - Kolom Saran berupa text input dan button post. Setelah button post di click akan mengirim data melalui api dan akan dikirim ke Channel Discord
        - Button menuju ke halaman Credits Page
    - Message Page
        - Button menuju ke Landing Page
        - Text Input Box dengan limit karakter 270
        - Check box platform yang tersedia
        - Button image preview untuk platform instagram ketika chekbox instagram = true. Data image preview akan diakses melalui API
        - Button Post hanya muncul ketika panjang karakter ≥ 6. Setelah button post di click, Text yang terdapat pada Text Input Box akan dikirim melalui API beserta dengan IP address pengirim
    - Credits Page
        - Nama-nama contributor beserta job desk dan akun sosial media
        - Button Menuju Landing Page
- Database
    - Software: MogoDB
    - Collections
        - history_message
            - Document Template:
                
                ```jsx
                {
                
                	_id: Object,
                	uuid: String,
                	timestamp: Epoch Timestamp,
                	ipv4: String,
                	deviceInfo: String,
                	message: String,
                	instagram: Boolean,
                	twitter: Boolean
                
                }
                ```
                
        - instagram_cookies
            - Document Template
                
                ```jsx
                {
                	_id: Object,
                	index: 0,
                	cookies: String
                }
                ```
                
- Application Programing Interface (API)
    - Language: JavaScript (NodeJS)
    - NPM: [express](https://www.npmjs.com/package/express), [sequelize](https://www.npmjs.com/package/sequelize)
    - API Documentation
        - End-Point: /sendMessage
            - Method: POST
                - Description: Post ke platform sesuai dengan data yang dikirim menggunakan twitter dan instagram automation, menambahkan data ke database
                - Request Payload
                    
                    ```json
                    {
                    	"text": "Isi pesan disini",
                    	"instagram": true,
                    	"twitter": true,
                    	"ipv4": "ip",
                    	"deviceInfo": "device"
                    }
                    ```
                    
                - Response Data
                    - Status: OK
                        
                        ```json
                        {
                        	"statusCode": 200, 
                        	"resCode": "sendMessage-OK", 
                        	"message": "OK"
                        }
                        ```
                        
                    - Status: ERROR
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-1", 
                        	"message": "Text not valid"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-2", 
                        	"message": "Text not valid, Maximum 25 char per words"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-3", 
                        	"message": "Invalid Character"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-4", 
                        	"message": "No platforms found"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-5", 
                        	"message": "IPv4 not valid"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-6", 
                        	"message": "Device Info not valid"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-7-1", 
                        	"message": "This message is already post in Instagram and Twitter, please send another message"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-7-2", 
                        	"message": "This message is already post in Instagram, please send another message or you can post to Twitter only"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendMessage-invalid-7-3", 
                        	"message": "This message is already post in Twitter, please send another message or you can post to Instagram only"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 400, 
                        	"resCode": "middleware-1", 
                        	"message": "Error JSON Parse"
                        }
                        ```
                        
                
        - End-Point: /igPreview
            - Method: POST
                - Description: Mendapatkan preview image untuk feed IG dari hasil image manipulation
                - Request Payload
                    
                    ```json
                    {
                    	"text": "Isi pesan disini"
                    }
                    ```
                    
                - Response Data
                    - Status: OK
                        
                        ```json
                        {
                        	"statusCode": 200, 
                        	"resCode": "igPreview-OK",
                        	"message": "OK",
                        	"image": "base64-image"
                        }
                        ```
                        
                    - Status: ERROR
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "igPreview-invalid-1", 
                        	"message": "Text not valid"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "igPreview-invalid-2", 
                        	"message": "Text not valid, Maximum 25 char per words"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "igPreview-invalid-3", 
                        	"message": "Invalid Character"
                        }
                        ```
                        
        - End-Point: /sendFeedback
            - Method: POST
                - Description: Kirim Feedback ke Channel Discord
                - Request Payload
                    
                    ```json
                    {
                    	"text": "Isi pesan disini",
                    	"ipv4": "ip",
                    	"deviceInfo": "device"
                    }
                    ```
                    
                - Response Data
                    - Status: OK
                        
                        ```json
                        {
                        	"statusCode": 200, 
                        	"resCode": "sendFeedback-OK", 
                        	"description": "OK"
                        }
                        ```
                        
                    - Status: ERROR
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendFeedback-invalid-1", 
                        	"description": "Text not valid"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendFeedback-invalid-2", 
                        	"message": "IPv4 not valid"
                        }
                        ```
                        
                        ```json
                        {
                        	"statusCode": 405, 
                        	"resCode": "sendFeedback-invalid-3", 
                        	"message": "Device Info not valid"
                        }
                        ```
                        
        
- Image Manipulation
    - Description: Memanipulasi text yang akan dipost ke instagram menjadi image
    - Language: JavaScript  (NodeJS)
    - NPM: [jimp](https://www.npmjs.com/package/jimp)
- Instagram Content Automation
    - Description: Untuk mengelola content yang akan ditampilkan pada Instagram
    - Language JavaScript (NodeJS)
    - NPM: [instagram-web-api](https://www.npmjs.com/package/instagram-web-api)
- Twitter Content Automation
    - Description: Untuk mengelola content yang akan ditampilkan pada Twitter
    - Language JavaScript (NodeJS)
    - NPM: [twitter-api-v2](https://www.npmjs.com/package/twitter-api-v2)
- Server Requirements: -
- Domain: -

---

## Contributor and Job-Desk

- Mik
    - Back-End (Lead)
        - Image Manipulation
        - Instagram & Twitter Automation
        - Database Setup
        - API Endpoint & Parameter
- Zka
    - Front-End (Lead)
        - Landing Page
        - Message Page
        - Credits Page
- Vno
    - Front-End
        - Landing Page
- Ryu
    - UI/UX (Lead)
        - Logo
        - Template Feed Instagram
        - Landing Page
        - Message Page
        - Credits Page
- Mal
    - UI/UX
        - Logo
        - Template Feed Instagram
        - Landing Page
        - Message Page
        - Credits Page
- Dyl
    - Front-End
        - Credits Page
- Lim
    - Back-End
        - Database Setup
        - API Endpoint & Parameter

---