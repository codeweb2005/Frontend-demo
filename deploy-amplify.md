# Deploy Frontend lên AWS Amplify

## Bước 1: Chuẩn bị Repository
```bash
# Tạo Git repository cho frontend
cd frontend
git init
git add .
git commit -m "Initial commit"

# Push lên GitHub/GitLab
git remote add origin <your-repo-url>
git push -u origin main
```

## Bước 2: Deploy trên AWS Amplify Console

1. **Truy cập AWS Amplify Console**
   - Đăng nhập AWS Console
   - Tìm "AWS Amplify" service

2. **Tạo New App**
   - Chọn "Host web app"
   - Connect repository (GitHub/GitLab)
   - Chọn repository và branch

3. **Cấu hình Build Settings**
   - Amplify sẽ tự detect `amplify.yml`
   - Hoặc sử dụng build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```

4. **Environment Variables**
   - Thêm trong Amplify Console:
   - `VITE_API_URL`: URL của API Gateway
   - `VITE_STRIPE_PUBLIC_KEY`: Stripe public key

5. **Deploy**
   - Click "Save and deploy"
   - Amplify sẽ build và deploy tự động

## Bước 3: Cấu hình Domain (Optional)
- Trong Amplify Console > Domain management
- Thêm custom domain nếu cần

## Bước 4: Auto Deploy
- Mỗi khi push code mới, Amplify sẽ tự động build và deploy

## URL sau khi deploy:
- Amplify sẽ cung cấp URL dạng: `https://branch-name.d1234567890.amplifyapp.com`