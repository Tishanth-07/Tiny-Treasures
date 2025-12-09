# <h1 align="center"> Tiny Treasures – 3D Miniature E-Commerce Platform </h1>

A fully featured **3D Miniature E-Commerce Website** developed using **Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, and MongoDB**.

This platform enables customers to browse miniature 3D frames, customize them online, place secure orders, add reviews, manage profiles, and receive home delivery.
The system includes a complete **Admin Dashboard, Role-Based Authentication, Social Logins, Dynamic Pricing, Coupons, and Order Management**.

---

## 🔹Overview
**Tiny Treasures** is a **full-stack e-commerce application** built as a **2nd-year software development project** for the client Tiny Treasure, a business specializing in customized 3D miniature artworks.

The website is designed with:
  - High performance
  - Fully responsive UI
  - User-friendly ordering workflow
  - Secure authentication
  - Reliable data storage
  - Modern UI/UX design principles

This project demonstrates real-world e-commerce features, including user management, product customization, online payments, review systems, and admin controls.

---

## 🔹Features

### 💠 Customer Features
❖ **Shopping Experience** 
-  Browse all 3D miniature frame products
-  View product galleries with zoom previews 
-  Check availability, pricing, customization options    
-  Product recommendations and related items 

❖ **Customization System** 
-  Customize miniature frame: Colors, Texts / Messages, Themes, Add-ons
-  Dynamic pricing automatically adjusts based on chosen options

❖ **Ordering & Payments** 
- Add to cart / Remove / Update quantity
- Apply valid coupon codes
- Secure payment via Stripe
- Choose delivery address
- Receive order confirmation email

❖ **Engagement Features** 
- Add product to Wishlist
- Leave reviews with star ratings
- View review summaries & rating averages
- Subscribe for newsletters and product updates

❖ **User Account Management** 
- Register / login (Email + Password)
- Social Login (Google, Facebook, Instagram)
- Manage profile details
- Manage multiple delivery addresses
- View past orders & order status
- Review history page


### 💠 Admin Features
❖ **Product & Store Management** 
- Add / Edit / Delete products
- Upload and manage product images (Cloudinary)
- Manage customization options
- Manage advertisements & homepage banners

❖ **User Management** 
- View customer list
- Manage blocked / active status

❖ **Order Management** 
- Update order status (Pending → Processing → Shipped → Delivered)
- View detailed order info
- Refund / Cancel processing

❖ **Review Moderation**
- Approve, hide, or remove customer reviews

❖ **Coupon Management**
- Create discount coupons
- Set validity periods and usage limits 

❖ **Security**
- Role-based authentication - Admin, Customer

---

## 🔹Technologies Used

### 💠 Frontend (Next.js + TypeScript)
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios
- Zustand / Context API
- React Hook Form
- Swiper.js (image sliders)
- Framer Motion (animations)

### 💠 Backend (Node.js + Express)
- Express.js REST API
- JWT Authentication
- Bcrypt password hashing
- OAuth integration (Google, Facebook, Instagram)
- Stripe payment gateway
- Cloudinary image hosting
- Nodemailer for emails

### 💠 Database
- MongoDB
- Mongoose ORM

### 💠 Tools
- Git & GitHub
- Postman
- Vercel (Frontend Deployment)
- Render / Railway (Backend Deployment)

---

## 🔹Project Structure

### 💠 Frontend

```text
FrontEnd/
└── next/
    ├── app/
    │   ├── about/
    │   │   └── page.tsx
    │   ├── Admin/
    │   │   ├── advertisement/[id]/
    │   │   │   └── page.tsx
    │   │   ├── cop/
    │   │   │   ├── create/
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   ├── customer/
    │   │   │   ├── [id]/
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── edit/[id]/
    │   │   │   └── page.tsx
    │   │   ├── general/
    │   │   │   └── page.tsx
    │   │   ├── notification/
    │   │   │   └── page.tsx
    │   │   ├── notificationSetting/
    │   │   ├── order-customer/
    │   │   ├── Product/
    │   │   ├── profile/
    │   │   ├── refunds/
    │   │   └── security/
    │   ├── api/
    │   │   └── auth/
    │   │       └── [...nextauth]/
    │   │           └── route.ts
    │   ├── authentication/
    │   │   ├── forgot-password/
    │   │   │   └── page.tsx
    │   │   ├── login/
    │   │   ├── newPassword/
    │   │   ├── passwordSuccess/
    │   │   ├── reset-password/
    │   │   ├── resetPassword/
    │   │   ├── signup/
    │   │   └── success/
    │   ├── cart/
    │   │   ├── order-summary.tsx
    │   │   └── page.tsx
    │   ├── checkout/
    │   │   └── payments/
    │   │       ├── page.tsx
    │   │       └── page.tsx
    │   ├── contact/
    │   │   └── page.tsx
    │   ├── customerAccount/
    │   │   └── orders/
    │   │       └── page.tsx
    │   ├── profile/
    │   │   ├── page.tsx
    │   │   ├── reviews/
    │   │   │   └── page.tsx
    │   │   └── settings/
    │   │       ├── faq/
    │   │       │   └── page.tsx
    │   │       ├── feedback/
    │   │       │   ├── layout.tsx
    │   │       │   └── page.tsx
    │   │       ├── help-and-support/
    │   │       ├── customize/
    │   │       │   ├── layout.tsx
    │   │       │   └── page.tsx
    │   │       ├── home/
    │   │       ├── my-account/
    │   │       ├── order-placed/
    │   │       ├── payment/
    │   │       ├── payment-shipping/
    │   │       ├── privacy/
    │   │       ├── return-refund/
    │   │       ├── shop/
    │   │       ├── success/
    │   │       ├── terms-and-conditions/
    │   │       └── wishlist/
    │   ├── document.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── addtowish/
    │   ├── admin/
    │   │   └── Admin_sidebar/
    │   ├── auth-components/
    │   ├── checkout/
    │   ├── customer-account/
    │   ├── footer/
    │   ├── header/
    │   ├── imageSlide/
    │   ├── payment/
    │   ├── pdf/
    │   ├── Privacy/
    │   ├── product-details/
    │   ├── refund/
    │   ├── review/
    │   ├── search/
    │   ├── shop-components/
    │   ├── symbol/
    │   ├── term/
    │   ├── user-history/
    │   ├── ClientWrapper.tsx
    │   └── SampleNavbarwish.tsx
    ├── context/
    │   ├── AppContext.tsx
    │   └── WishlistContext.tsx
    ├── node_modules/
    ├── public/
    ├── services/
    ├── types/
    ├── utils/
    │   ├── Admin/
    │   ├── auth-utils/
    │   ├── payment/
    │   ├── AppContext.tsx
    │   ├── auth.ts
    │   ├── dateUtils.ts
    │   ├── formatUtils.ts
    │   ├── maskUtils.ts
    │   └── profileApi.ts
    ├── .gitignore
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    ├── tailwind.config.js
    └── tsconfig.json
```

### 💠 Backend

```text
3DMINIATURE/
├── BackEnd/
│   ├── node_modules/
│   └── src/
│       ├── config/
│       │   ├── db.js
│       │   ├── facebookStrategy.js
│       │   ├── instagramStrategy.js
│       │   └── passport.js
│       ├── controllers/
│       │   ├── admin_controller/
│       │   │   ├── advertisementController.js
│       │   │   ├── authController.js
│       │   │   ├── card-controller.js
│       │   │   ├── coupon-check.js
│       │   │   ├── coupon-controller.js
│       │   │   ├── facebookAuthController.js
│       │   │   ├── feedback-controller.js
│       │   │   ├── filterController.js
│       │   │   ├── image-controller.js
│       │   │   ├── instagramAuthController.js
│       │   │   ├── order-controller.js
│       │   │   ├── order-filter.js
│       │   │   ├── pdfController.js
│       │   │   ├── product-controller.js
│       │   │   ├── productDetailsController.js
│       │   │   ├── productsearch-controller.js
│       │   │   ├── profileController.js
│       │   │   ├── refundController.js
│       │   │   ├── reviewController.js
│       │   │   └── reviewHistoryController.js
│       │   ├── user-controller.js
│       │   └── wishlistController.js
│       ├── docs/
│       ├── middleware/
│       │   ├── admin_middleware/
│       │   │   └── ind.js
│       │   ├── uploadsFrame.js
│       │   ├── auth.js
│       │   ├── multer.js
│       │   ├── profile.js
│       │   ├── upload-middleware.js
│       │   └── user-upload.js
│       ├── models/
│       │   ├── Admin_models/
│       │   │   ├── Address.js
│       │   │   ├── Advertisement.js
│       │   │   ├── Counter.js
│       │   │   ├── Coupon.js
│       │   │   ├── Customer.js
│       │   │   ├── enquiry.js
│       │   │   ├── Feedback.js
│       │   │   ├── Order.js
│       │   │   ├── Product.js
│       │   │   ├── productModel.js
│       │   │   ├── refundForm.js
│       │   │   ├── Review.js
│       │   │   ├── subscribe.js
│       │   │   ├── User.js
│       │   │   └── Wishlist.js
│       │   └── productModel.js
│       ├── routes/
│       │   ├── admin_routes/
│       │   │   ├── coupon_routes.js
│       │   │   ├── create_coup.js
│       │   │   ├── dashboardroutes.js
│       │   │   ├── new_Order.js
│       │   │   ├── add_order.js
│       │   │   ├── admin_profile.js
│       │   │   ├── advertRoutes.js
│       │   │   ├── completed.js
│       │   │   ├── customer.js
│       │   │   ├── editRoutes.js
│       │   │   ├── notification.js
│       │   │   ├── order-customer.js
│       │   │   ├── orderdynamic_rout.js
│       │   │   ├── orders.js
│       │   │   ├── pending.js
│       │   │   ├── pendingstats.js
│       │   │   ├── refund_route.js
│       │   │   └── advertisementRoutes.js
│       │   ├── products/
│       │   ├── testing/
│       │   ├── authRoutes.js
│       │   ├── cart-routes.js
│       │   ├── checkout.js
│       │   ├── coupon-routes.js
│       │   ├── enquiryRoutes.js
│       │   ├── facebookAuthRoutes.js
│       │   ├── feedback-routes.js
│       │   ├── imageRoutes.js
│       │   ├── instagramAuthRoutes.js
│       │   ├── locations.js
│       │   ├── order-routes.js
│       │   ├── pdfRoutes.js
│       │   ├── product-routes.js
│       │   ├── productDetailsRoute.js
│       │   ├── productRoute.js
│       │   ├── profileRoutes.js
│       │   ├── refundRoutes.js
│       │   ├── reviewHistoryRoutes.js
│       │   ├── reviewRoutes.js
│       │   ├── subscribeRoutes.js
│       │   ├── uploadRoutes.js
│       │   ├── useraddress-route.js
│       │   ├── userImage-routes.js
│       │   ├── verify-payment.js
│       │   └── wishlistRoutes.js
│       ├── service/
│       │   ├── productService.js
│       │   └── profileServices.js
│       ├── uploads/
│       ├── utils/
│       ├── cron/
│       │   ├── advertisementExpiration.js
│       │   ├── couponExpiration.js
│       │   ├── createNotification.js
│       │   └── cronjob.js
│       ├── emailService.js
│       ├── hashPassword.js
│       ├── mailer.js
│       ├── pdfoption.js
│       ├── template.html
│       └── index.js
├── .env
├── .gitignore
├── package-lock.json
└── package.json
```

---

## 🔹Setup Instructions

### 💠 Frontend Setup 
- Navigate into frontend folder - `cd frontend`
- Install Tailwind CSS (if not installed) - `npm install -D tailwindcss postcss autoprefixer` `npx tailwindcss init -p`
- Install Axios - `npm install axios`
- Install nodemodules - `npm install`
- Start frontend - `npm run dev`
- Local URL - `http://localhost:3000`

### 💠 Backend Setup
- Navigate into BackEnd folder - `cd BackEnd`
- Install nodemodules - `npm install`
- Start BackEnd - `npm run dev`
- Backend runs at - `http://localhost:5000`

### 💠 Running Entire Project
- Start backend - `cd BackEnd` `npm run dev`
- Start frontend - `cd FrontEnd` `npm run dev`
- Open browser - `http://localhost:3000`

---

## 🔹Screenshots

### 💠 Home Page
![Home Screenshot](frontend/public/screenshots/home1.png)
![Home Screenshot](frontend/public/screenshots/home2.png)

### 💠 Advertisement
![Product Page](frontend/public/screenshots/products1.png)

### 💠 Product Details
![Product Page](frontend/public/screenshots/products2.png)

### Customization Page
![Product Page](frontend/public/screenshots/products3.png)
![Product Page](frontend/public/screenshots/products4.png)

### 💠 LOGIN Page
![Login Page](frontend/public/screenshots/login.png)

### 💠 Shopping Cart
![cart Page](frontend/public/screenshots/cart1.png)
![cart Page](frontend/public/screenshots/cart2.png)

### 💠 Add Review page
![review Page](frontend/public/screenshots/review1.png)

### 💠 Profile Page 
![profile Page](frontend/public/screenshots/profile.jpeg)

### 💠 About page
![about Page](frontend/public/screenshots/about.png)

### 💠 Contact us page 
![review Page](frontend/public/screenshots/contact.png)

### 💠 Terms and policy
![terms Page](frontend/public/screenshots/terms.png)

### 💠 Feed back 
![feedback Page](frontend/public/screenshots/feedback.png)

### 💠 Admin Dashboard
![admin Page](frontend/public/screenshots/admin1.jpeg)
![admin Page](frontend/public/screenshots/admin2.jpeg)
![admin Page](frontend/public/screenshots/admin3.jpeg)

---