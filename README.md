# Users API

REST API بسيطة لإدارة المستخدمين باستخدام Node.js + Express + PostgreSQL (مكتبة `pg`) بدون ORM.

## التشغيل

1. ثبّت المكتبات:
   ```bash
   npm install
   ```
2. أنشئ قاعدة البيانات والجدول (من `psql`):
   ```bash
   psql -U postgres
   ```
   ```sql
   CREATE DATABASE users_api_db;
   \c users_api_db
   \i schema.sql
   ```
   (أو انسخ محتوى `schema.sql` والصقه يدويًا.)
3. افتح `.env` وضع كلمة مرور PostgreSQL في `DB_PASSWORD`.
4. شغّل السيرفر:
   ```bash
   npm run dev
   ```
   ثم افتح http://localhost:3000/users

## Endpoints

| Method | Path | الوظيفة |
|---|---|---|
| GET | /users | كل المستخدمين |
| GET | /users/:id | مستخدم واحد |
| POST | /users | إنشاء مستخدم |
| PUT | /users/:id | تعديل مستخدم |
| DELETE | /users/:id | حذف مستخدم |

مثال Body لـ POST و PUT:
```json
{ "name": "Hamza", "email": "hamza@example.com", "age": 22 }
```

## رموز الأخطاء

- 400: بيانات ناقصة أو id غير صحيح
- 404: المستخدم غير موجود
- 409: البريد مكرر
- 500: خطأ في قاعدة البيانات
