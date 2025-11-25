# Hướng dẫn Setup Backend cho Reviews

Hiện tại reviews đang lưu vào localStorage nên mỗi người chỉ thấy đánh giá của mình. Để mọi người thấy chung, cần setup backend.

## Giải pháp đơn giản nhất: Firebase Realtime Database (Miễn phí)

### Bước 1: Tạo Firebase Project
1. Vào https://console.firebase.google.com/
2. Tạo project mới
3. Chọn Realtime Database
4. Chọn chế độ "Start in test mode" (cho phép đọc/ghi tự do)

### Bước 2: Cài đặt Firebase
```bash
npm install firebase
```

### Bước 3: Tạo file config
Tạo file `src/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
```

### Bước 4: Cập nhật Reviews.jsx
```javascript
import { ref, push, onValue } from 'firebase/database';
import { database } from '../firebase';

// Load reviews
useEffect(() => {
  const reviewsRef = ref(database, 'reviews');
  onValue(reviewsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const reviewsList = Object.values(data).sort((a, b) => b.id - a.id);
      setReviews(reviewsList);
    }
  });
}, []);

// Save review
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const review = {
    id: Date.now(),
    ...newReview,
    wallet: currentAccount?.slice(0, 10) + '...' + currentAccount?.slice(-8),
    date: new Date().toLocaleDateString('vi-VN'),
  };

  const reviewsRef = ref(database, 'reviews');
  await push(reviewsRef, review);

  // Reset form
  setNewReview({ name: '', major: '', rating: 5, comment: '' });
  setIsSubmitting(false);
};
```

## Giải pháp khác: Backend API đơn giản

Nếu anh muốn tự host, có thể dùng:
- **Vercel Serverless Functions** (miễn phí, dễ deploy)
- **Node.js + Express + MongoDB** (cần server)
- **Supabase** (giống Firebase, miễn phí)

Anh muốn em setup cái nào thì bảo em nhé!
