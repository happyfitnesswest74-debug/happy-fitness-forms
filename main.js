// main.js

// **هام: استبدل هذا المتغير برابط Web App URL الذي حصلت عليه من Apps Script.**
const API_URL = "https://script.google.com/macros/s/AKfycbyFhscw7zZrnRkwCnjAJyPMD_90X166HOd4pelZD8hEZGlXc6EoQPBfXbbz1DXFfc5zgA/exec"; 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkupForm');
    const responseMessage = document.getElementById('responseMessage');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // منع الإرسال الافتراضي للصفحة

            responseMessage.textContent = 'جاري الإرسال...';
            responseMessage.style.color = 'orange';

            // جمع بيانات النموذج
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                // إرسال البيانات إلى Apps Script API باستخدام Fetch API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    mode: 'cors', // مهم للسماح بالطلبات الخارجية
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                // تحليل استجابة JSON
                const result = await response.json();
                
                if (result.success) {
                    responseMessage.textContent = result.message;
                    responseMessage.style.color = 'var(--main-green)';
                    form.reset(); // تفريغ النموذج بعد النجاح
                } else {
                    responseMessage.textContent = 'فشل التسجيل: ' + result.message;
                    responseMessage.style.color = 'red';
                }

            } catch (error) {
                responseMessage.textContent = 'حدث خطأ في الاتصال بالخادم: ' + error.message;
                responseMessage.style.color = 'red';
            }
        });
    }
});