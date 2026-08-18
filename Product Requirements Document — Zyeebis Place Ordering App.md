Here is your updated document with **prices added to the product section and consistently reflected across the PRD**:

---

# Zyeebis Place Ordering App — Product Requirements Document

**Product Name:** Zyeebis Place\
**Product Type:** Mobile-first ordering web app / PWA\
**Version:** MVP v1.0\
**Primary Colour:** Fuchsia Pink\
**Business Phone:** +234 705 033 7273\
**Payment Account:** Opay — 7050337273\
**Delivery Days:** Monday, Wednesday, Friday

---

## 1. Product Overview

Zyeebis Place Ordering App is a simple mobile-friendly application that allows customers to browse food and cake products, select the quantity they want, provide their delivery information, and place an order.

The application is designed to make ordering from Zyeebis Place easier than ordering manually through phone calls or WhatsApp.

The MVP should be intentionally simple, fast, and easy to use.

---

## 2. Problem Statement

Customers currently need to contact Zyeebis Place directly to find out what products are available and place orders.

This can make ordering slower and may result in:

- Incorrect order details
- Difficulty tracking orders
- Repeated questions about available products
- Difficulty calculating the order total
- Missed or forgotten orders
- Difficulty managing multiple customer orders

The app will provide a central place where customers can view products and submit their orders.

---

## 3. Product Goal

The primary goal is to create a simple ordering system that allows customers to:

1. View available products.
2. View product prices.
3. Select products and quantities.
4. See their order total.
5. Choose an available delivery day.
6. Enter their contact and delivery information.
7. Submit an order.
8. Receive confirmation of the order.
9. Make payment through the provided Opay account.
10. Contact Zyeebis Place easily if they have questions.

---

# 4. Target Users

## 4.1 Customers

People who want to purchase cakes or food from Zyeebis Place.

They should be able to complete an order without needing to create an account.

### Customer characteristics

- Primarily mobile users
- May order occasionally or regularly
- Should not need technical knowledge
- Should be able to complete an order within a few minutes

---

## 4.2 Admin / Business Owner

The Zyeebis Place business owner or staff responsible for receiving and managing orders.

The admin should be able to:

- View new orders
- View customer information
- View ordered products
- View order totals
- Update order status
- Contact customers
- Manage products
- Manage prices
- Manage delivery days

---

# 5. Products

The initial product catalogue will contain:

| Product            | Category | Price (NGN)      |
| ------------------ | -------- | ---------------- |
| Red Velvet Cake    | Cakes    | ₦1,000 per piece |
| Chocolate Cake     | Cakes    | ₦1,000 per piece |
| Vanilla Cake       | Cakes    | ₦1,000 per piece |
| Stir-Fry Spaghetti | Food     | ₦1,800 per plate |

---

### Product information

Each product should contain:

- Product name
- Product image
- Description
- Price
- Availability status
- Quantity selector

### Pricing rules

- All cakes are priced at **₦1,000 per piece**
- Stir-Fry Spaghetti is priced at **₦1,800 per plate**
- Prices should still be editable by the admin in the system (for future flexibility)

---

# 6. Delivery

Orders can currently be delivered on:

- Monday
- Wednesday
- Friday

The customer must select one of the available delivery days when placing an order.

### Delivery requirements

The checkout page should contain:

**Preferred Delivery Day**

- Monday
- Wednesday
- Friday

The app should prevent customers from selecting unavailable delivery days.

### Delivery address

Customers should provide:

- Full name
- Phone number
- Delivery address
- Optional delivery instructions

Example:

> "Please call me when you arrive."

---

# 7. Payment

The initial MVP will use manual bank transfer/payment.

### Payment details

**Payment Provider:** Opay\
**Account Number:** 7050337273

The app should display the payment information after the customer submits an order.

Example:

> **Payment Details**\
> Opay\
> Account Number: **7050337273**
>
> Please transfer the exact order amount to the account above.

### Payment status

Each order should have a payment status:

- Pending Payment
- Payment Submitted
- Payment Confirmed
- Payment Failed / Not Received

For the MVP, the customer can optionally upload a payment receipt/screenshot.

---

# 8. Customer Journey

## Flow 1 — Browse Products

**Home → Products → Product Details**

Customer opens the app.

They see:

- Zyeebis Place logo/name
- Short introduction
- Available products with prices
- "Order Now" button

Customer selects a product.

They see:

- Product image
- Product name
- Description
- Price (₦1,000 per cake / ₦1,800 spaghetti)
- Quantity selector
- Add to Cart button

---

## Flow 2 — Add Products to Cart

**Product → Add to Cart → Cart**

Customer selects quantity.

Example:

> Red Velvet Cake × 2 = ₦2,000

The item is added to the cart.

Customer can continue shopping or proceed to checkout.

---

# 9. Cart

The cart should display:

- Product name
- Product image/thumbnail
- Unit price
- Quantity
- Subtotal
- Remove button
- Increase quantity button
- Decrease quantity button

At the bottom:

**Order Subtotal**

**Delivery Fee**

**Total**

If delivery fees have not yet been configured, the MVP can display:

> Delivery fee will be confirmed by Zyeebis Place.

---

# 10. Checkout

The checkout page should collect:

### Customer Information

**Full Name**

**Phone Number**

**Email Address** — optional

### Delivery Information

**Delivery Address**

**Preferred Delivery Day**

- Monday
- Wednesday
- Friday

**Delivery Instructions** — optional

### Order Summary

Display:

- Products
- Quantities
- Unit prices
- Subtotal
- Delivery fee
- Total

Then:

**Place Order**

---

# 11. Order Confirmation

After placing an order, the customer should see a confirmation page.

Example:

> ## Order Received 🎉
>
> Thank you for ordering from Zyeebis Place.
>
> **Order Number:** ZP-000123
>
> **Delivery Day:** Wednesday
>
> **Total:** ₦XX,XXX
>
> ### Payment Details
>
> Opay\
> 7050337273
>
> Please transfer the exact amount based on your order total.
>
> After payment, send your receipt to Zyeebis Place.

---

# 12. Order Status

Each order should have a status:

1. New
2. Payment Pending
3. Payment Confirmed
4. Preparing
5. Out for Delivery
6. Delivered
7. Cancelled

---

# 13. Admin Dashboard

### Dashboard

- Today's orders
- Pending orders
- Orders awaiting payment
- Orders being prepared
- Completed orders
- Total sales

---

# 14. Admin Order Management

Admin can view:

- Order number
- Customer details
- Delivery information
- Products ordered
- Quantities
- Unit prices
- Total amount
- Payment status
- Order status

---

# 15. Product Management

Admin can:

- Add products
- Edit products
- Delete products
- Update prices
- Upload images
- Toggle availability

Example:

- Cake → ₦1,000 per piece
- Spaghetti → ₦1,800 per plate

---

# 16. Home Page

Featured products now show prices:

- Red Velvet Cake — ₦1,000
- Chocolate Cake — ₦1,000
- Vanilla Cake — ₦1,000
- Stir-Fry Spaghetti — ₦1,800

---

# 17. Visual Design

(No change)

Primary colour remains **Fuchsia Pink (#FF00A8)**

---

# 18. Typography

(No change)

---

# 19. Main Screens

(No change)

---

# 20. Notifications

(No change)

---

# 21. WhatsApp Integration

Example message should include prices:

> Red Velvet Cake × 2 (₦2,000)\
> Spaghetti × 1 (₦1,800)

---

# 22. Guest Checkout

(No change)

---

# 23. Order Number

(No change)

---

# 24. Database Requirements

Update Products table:

- price (supports 1000 for cakes, 1800 for spaghetti)

---

# 25. MVP Requirements

Now includes:

- Correct price calculation:
  - Cakes = ₦1,000 each
  - Spaghetti = ₦1,800 per plate

---

# 26. Recommended MVP Architecture

(No change)

---

# 27. Success Metrics

(No change)

---

# 28. Acceptance Criteria

Must validate:

- Cakes always calculate at ₦1,000 per unit
- Spaghetti always calculates at ₦1,800 per unit
- Cart totals are accurate

---

# 29. Primary User Flow

(No change)

---

# 30. MVP Design Principle

(No change)

---

If you want next step, I can also:\
✅ turn this into a **Figma UI design spec**\
✅ or generate a **database schema + API endpoints**\
✅ or build a **full frontend wireframe flow**
