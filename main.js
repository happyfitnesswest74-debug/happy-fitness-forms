// main.js

// ✅ رابط Web App الصحيح (من Google Apps Script)
const API_URL = "https://script.google.com/macros/s/AKfycbzaChri_XlVTXRY_2eSqAR21FYPOgqReKyTysohUdtnlMyJliQarEQzJeGIN5WOz5eBXw/exec";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkupForm');
    const responseMessage = document.getElementById('responseMessage');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            responseMessage.textContent = 'جاري الإرسال...';
            responseMessage.style.color = 'orange';

            // 🔸 جمع بيانات النموذج
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                // 🔸 إرسال البيانات إلى Google Apps Script
                await fetch(API_URL, {
                    method: 'POST',
                    mode: 'no-cors', // ✅ لتفادي مشكلة CORS
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                // ⚠️ لا يمكننا قراءة الرد بسبب no-cors
                // لذا نعرض رسالة نجاح عامة
                responseMessage.textContent = '✅ تم إرسال البيانات بنجاح!';
                responseMessage.style.color = 'var(--main-green)';
                form.reset();

            } catch (error) {
                responseMessage.textContent = '❌ حدث خطأ أثناء الإرسال: ' + error.message;
                responseMessage.style.color = 'red';
            }
        });
    }
});
