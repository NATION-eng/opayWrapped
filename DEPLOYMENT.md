# 🚀 OPay Wrapped - Complete Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] All tests passing (if tests are written)
- [ ] No console.log statements in production code
- [ ] Environment variables documented

### ✅ Performance
- [ ] Lighthouse score >90 for all metrics
- [ ] Images optimized and using Next.js Image
- [ ] Fonts preloaded
- [ ] Code split appropriately
- [ ] Bundle size analyzed (`npm run build` - check output)

### ✅ Accessibility
- [ ] Keyboard navigation works throughout
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Color contrast meets WCAG AAA
- [ ] Focus indicators visible
- [ ] ARIA labels on all interactive elements

### ✅ SEO
- [ ] Meta tags complete in layout.tsx
- [ ] Open Graph images generated (1200x630)
- [ ] Twitter cards configured
- [ ] Sitemap generated
- [ ] robots.txt configured

### ✅ Security
- [ ] Security headers configured (next.config.js)
- [ ] No exposed API keys
- [ ] HTTPS enforced
- [ ] XSS protection enabled
- [ ] CSP headers (if needed)

---

## Environment Setup

### Development
```env
# .env.local
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GA_ID=
```

### Staging
```env
# .env.staging
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api-staging.opay.com
NEXT_PUBLIC_GA_ID=G-STAGING123
```

### Production
```env
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.opay.com
NEXT_PUBLIC_GA_ID=G-PROD123
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## Deployment Methods

### Method 1: Vercel (Recommended)

**Why Vercel?**
- Built for Next.js
- Automatic HTTPS
- Global CDN
- Preview deployments
- Zero config

**Steps:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Vercel Dashboard Setup:**
1. Connect GitHub repository
2. Set environment variables
3. Configure custom domain
4. Enable analytics

**Custom Domain:**
```bash
vercel domains add wrapped.opay.com
# Follow DNS instructions
```

---

### Method 2: AWS (EC2 + S3 + CloudFront)

**Architecture:**
- EC2 for Next.js server
- S3 for static assets
- CloudFront for CDN
- Route53 for DNS
- ACM for SSL

**1. Build Application:**
```bash
npm run build
```

**2. EC2 Setup:**
```bash
# SSH into EC2
ssh -i key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Clone repository
git clone your-repo
cd opay-wrapped-production
npm install
npm run build

# Start with PM2
pm2 start npm --name "opay-wrapped" -- start
pm2 save
pm2 startup
```

**3. Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name wrapped.opay.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**4. SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d wrapped.opay.com
```

---

### Method 3: Docker + Kubernetes

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and Run:**
```bash
docker build -t opay-wrapped .
docker run -p 3000:3000 opay-wrapped
```

**Kubernetes Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opay-wrapped
spec:
  replicas: 3
  selector:
    matchLabels:
      app: opay-wrapped
  template:
    metadata:
      labels:
        app: opay-wrapped
    spec:
      containers:
      - name: opay-wrapped
        image: your-registry/opay-wrapped:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

---

## Monitoring & Analytics

### 1. Google Analytics
Add to `app/layout.tsx`:
```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

### 2. Sentry Error Tracking
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### 3. Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to layout:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Performance Monitoring

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Tools:
1. **Lighthouse** (Chrome DevTools)
2. **WebPageTest** (webpagetest.org)
3. **GTmetrix** (gtmetrix.com)
4. **Vercel Analytics** (if using Vercel)

---

## CDN Configuration

### Cloudflare Setup:
1. Add domain to Cloudflare
2. Update nameservers
3. Enable:
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - HTTP/2
   - HTTP/3 (QUIC)
4. Configure Page Rules:
   - Cache Level: Standard
   - Browser Cache TTL: 4 hours
   - Edge Cache TTL: 1 month (static assets)

---

## Database Setup (If Needed)

### PostgreSQL
```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database
sudo -u postgres createdb opay_wrapped

# Connection string
DATABASE_URL="postgresql://user:password@localhost:5432/opay_wrapped"
```

### Prisma Setup
```bash
npm install prisma @prisma/client
npx prisma init
npx prisma migrate dev
```

---

## Backup Strategy

### 1. Database Backups
```bash
# Daily backup cron job
0 2 * * * pg_dump opay_wrapped > /backups/opay_wrapped_$(date +\%Y\%m\%d).sql
```

### 2. Code Repository
- GitHub with protected main branch
- Required pull request reviews
- Automated CI/CD

### 3. Environment Variables
- Store in secure vault (AWS Secrets Manager, 1Password)
- Never commit to Git
- Document in separate secure location

---

## SSL/TLS Configuration

### Recommended Settings:
```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

## Testing in Production

### Smoke Tests
```bash
# Health check
curl https://wrapped.opay.com/api/health

# Homepage loads
curl -I https://wrapped.opay.com

# Check meta tags
curl https://wrapped.opay.com | grep "og:title"
```

### Load Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test with 1000 requests, 10 concurrent
ab -n 1000 -c 10 https://wrapped.opay.com/
```

---

## Rollback Plan

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Docker/K8s
```bash
# Rollback to previous version
kubectl rollout undo deployment/opay-wrapped

# Check status
kubectl rollout status deployment/opay-wrapped
```

---

## Post-Deployment Checklist

### Immediate (< 1 hour)
- [ ] Homepage loads correctly
- [ ] All sections render
- [ ] Animations work smoothly
- [ ] Data loads from API
- [ ] Share functionality works
- [ ] No console errors
- [ ] Mobile responsiveness verified

### Short-term (< 24 hours)
- [ ] Analytics tracking verified
- [ ] Error tracking configured
- [ ] Performance metrics baseline recorded
- [ ] User feedback channel established
- [ ] Support team briefed

### Long-term (< 1 week)
- [ ] Monitor error rates
- [ ] Review performance metrics
- [ ] Collect user feedback
- [ ] Plan iteration based on data
- [ ] Document lessons learned

---

## Troubleshooting

### Issue: Build fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Issue: High memory usage
```bash
# Increase Node memory
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

### Issue: Slow API responses
- Check API endpoint health
- Verify network latency
- Enable caching
- Consider CDN for API

### Issue: Animations janky
- Check device performance
- Test on lower-end devices
- Consider reducing animation complexity
- Enable reduced motion detection

---

## Contact & Support

**Development Team:**
- Lead: dev@opay.com
- Slack: #opay-wrapped
- On-call: Check PagerDuty

**Emergency Rollback:**
```bash
# Immediate rollback command (save this!)
vercel rollback [last-known-good-deployment]
```

---

## Success Metrics

### Week 1:
- [ ] 0 critical errors
- [ ] >95% uptime
- [ ] <3s average load time
- [ ] >90 Lighthouse score

### Month 1:
- [ ] User engagement metrics tracked
- [ ] Conversion rates measured
- [ ] Performance optimizations implemented
- [ ] User feedback incorporated

---

**Last Updated:** 2024
**Version:** 2.0.0
**Status:** Production Ready ✅
