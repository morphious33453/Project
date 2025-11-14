# Advanced Features & Pro Tips

## 🚀 Optional Enhancements

### 1. Add Video Background Support

Replace static image with video background for high-impact collections:

```liquid
{%- if section.settings.use_video_background and section.settings.video_url != blank -%}
  <video
    class="collection-hero__background-video"
    autoplay
    muted
    loop
    playsinline
    poster="{{ collection.image | image_url: width: 1500 }}"
  >
    <source src="{{ section.settings.video_url }}" type="video/mp4">
  </video>
{%- endif -%}
```

Add to schema:
```json
{
  "type": "checkbox",
  "id": "use_video_background",
  "label": "Use video background",
  "default": false
},
{
  "type": "url",
  "id": "video_url",
  "label": "Video URL (MP4)"
}
```

CSS:
```css
.collection-hero__background-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
```

---

### 2. Add Countdown Timer for Limited Collections

Perfect for seasonal print promotions:

```liquid
{%- if section.settings.show_countdown -%}
  <div class="collection-hero__countdown" data-end-date="{{ section.settings.countdown_date }}">
    <div class="countdown-item">
      <span class="countdown-number" data-days>00</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" data-hours>00</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" data-minutes>00</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" data-seconds>00</span>
      <span class="countdown-label">Seconds</span>
    </div>
  </div>

  <script>
    (function() {
      const countdownEl = document.querySelector('.collection-hero__countdown');
      if (!countdownEl) return;

      const endDate = new Date(countdownEl.dataset.endDate).getTime();

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
          countdownEl.innerHTML = '<p>Promotion Ended</p>';
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
        countdownEl.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
        countdownEl.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
        countdownEl.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    })();
  </script>
{%- endif -%}
```

---

### 3. Add Customer Reviews/Rating Display

Show collection-level social proof:

```liquid
{%- if section.settings.show_collection_rating -%}
  <div class="collection-hero__rating">
    <div class="star-rating" aria-label="4.8 out of 5 stars">
      <span class="stars">★★★★★</span>
      <span class="rating-count">(1,247 reviews)</span>
    </div>
  </div>
{%- endif -%}
```

CSS:
```css
.collection-hero__rating {
  margin-top: 1rem;
}

.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.stars {
  color: #FFD700;
  letter-spacing: 2px;
}

.rating-count {
  font-size: 0.9rem;
  opacity: 0.9;
}
```

---

### 4. Add Quick Filter Pills

Help customers navigate to subcategories:

```liquid
{%- if section.settings.show_quick_filters -%}
  <div class="collection-hero__filters">
    <a href="{{ collection.url }}?filter.p.tag=bestseller" class="filter-pill">
      🔥 Bestsellers
    </a>
    <a href="{{ collection.url }}?filter.p.tag=new" class="filter-pill">
      ✨ New Arrivals
    </a>
    <a href="{{ collection.url }}?sort_by=price-ascending" class="filter-pill">
      💰 Under $20
    </a>
    <a href="{{ collection.url }}?filter.p.tag=custom" class="filter-pill">
      🎨 Customizable
    </a>
  </div>
{%- endif -%}
```

CSS:
```css
.collection-hero__filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.5rem;
}

.filter-pill {
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.filter-pill:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
```

---

### 5. Add Parallax Scrolling Effect

Create depth and visual interest:

```javascript
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.collection-hero__background-image');
    if (!heroImage) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  });
</script>
```

---

### 6. Add Urgency Indicators

Boost conversions with scarcity/urgency:

```liquid
{%- assign low_stock_count = 0 -%}
{%- for product in collection.products limit: 20 -%}
  {%- if product.selected_or_first_available_variant.inventory_quantity < 10 -%}
    {%- assign low_stock_count = low_stock_count | plus: 1 -%}
  {%- endif -%}
{%- endfor -%}

{%- if low_stock_count > 0 -%}
  <div class="collection-hero__urgency">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
    </svg>
    <span>{{ low_stock_count }} items are low in stock - Order soon!</span>
  </div>
{%- endif -%}
```

CSS:
```css
.collection-hero__urgency {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #FF6B6B;
  color: white;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}
```

---

### 7. Add Collection Size Chart Quick Access

For print shops with size-dependent products:

```liquid
{%- if section.settings.show_size_guide -%}
  <button type="button"
          class="collection-hero__size-guide"
          onclick="document.getElementById('size-chart-modal').style.display='block'">
    📏 View Size Guide
  </button>
{%- endif -%}
```

---

### 8. Add Social Share Buttons

Increase organic reach:

```liquid
{%- if section.settings.show_social_share -%}
  <div class="collection-hero__social-share">
    <span>Share:</span>
    <a href="https://www.facebook.com/sharer/sharer.php?u={{ shop.url | append: collection.url | url_encode }}"
       target="_blank"
       rel="noopener"
       aria-label="Share on Facebook">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    </a>
    <a href="https://twitter.com/intent/tweet?url={{ shop.url | append: collection.url | url_encode }}&text={{ collection.title | url_encode }}"
       target="_blank"
       rel="noopener"
       aria-label="Share on Twitter">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    </a>
    <a href="https://pinterest.com/pin/create/button/?url={{ shop.url | append: collection.url | url_encode }}&media={{ collection.image | image_url: width: 1000 | url_encode }}&description={{ collection.title | url_encode }}"
       target="_blank"
       rel="noopener"
       aria-label="Share on Pinterest">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    </a>
  </div>
{%- endif -%}
```

CSS:
```css
.collection-hero__social-share {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.collection-hero__social-share a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  transition: all 0.3s ease;
}

.collection-hero__social-share a:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}
```

---

### 9. Add Smart Collection Recommendations

"Customers also viewed" at collection level:

```liquid
{%- if section.settings.show_related_collections -%}
  <div class="collection-hero__related">
    <h3>Related Collections</h3>
    <div class="related-collections-grid">
      {%- for tag in collection.tags limit: 3 -%}
        {%- assign related_collection = collections[tag] -%}
        {%- if related_collection and related_collection.handle != collection.handle -%}
          <a href="{{ related_collection.url }}" class="related-collection-card">
            {%- if related_collection.image -%}
              <img src="{{ related_collection.image | image_url: width: 300 }}"
                   alt="{{ related_collection.title }}"
                   loading="lazy">
            {%- endif -%}
            <h4>{{ related_collection.title }}</h4>
          </a>
        {%- endif -%}
      {%- endfor -%}
    </div>
  </div>
{%- endif -%}
```

---

### 10. Add Newsletter Signup in Hero

Capture emails above the fold:

```liquid
{%- if section.settings.show_newsletter -%}
  <div class="collection-hero__newsletter">
    <form action="{{ routes.root_url }}contact#newsletter"
          method="post"
          class="newsletter-form">
      <input type="hidden" name="contact[tags]" value="newsletter">
      <input type="email"
             name="contact[email]"
             placeholder="Enter your email for exclusive offers"
             required
             aria-label="Email address">
      <button type="submit">Subscribe</button>
    </form>
  </div>
{%- endif -%}
```

CSS:
```css
.newsletter-form {
  display: flex;
  gap: 0.5rem;
  max-width: 500px;
  margin: 1.5rem auto 0;
}

.newsletter-form input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  border-radius: 4px;
  font-size: 1rem;
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-form button {
  padding: 0.875rem 2rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
```

---

## 📊 Analytics Tracking

### Add Google Analytics Events

Track user interactions:

```liquid
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Track CTA clicks
    document.querySelectorAll('.collection-hero__cta').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cta_click', {
            'event_category': 'Collection Hero',
            'event_label': '{{ collection.title }}',
            'value': '{{ btn.textContent.trim() }}'
          });
        }
      });
    });

    // Track scroll depth
    let scrollTracked = false;
    window.addEventListener('scroll', function() {
      if (!scrollTracked && window.scrollY > 500) {
        scrollTracked = true;
        if (typeof gtag !== 'undefined') {
          gtag('event', 'scroll_depth', {
            'event_category': 'Collection Hero',
            'event_label': '{{ collection.title }}',
            'value': '500px'
          });
        }
      }
    });
  });
</script>
```

---

## 🎨 Print Shop Specific Features

### Custom Print Size Selector in Hero

```liquid
{%- if section.settings.show_size_selector -%}
  <div class="collection-hero__size-selector">
    <label>Popular Sizes:</label>
    <div class="size-buttons">
      <button onclick="filterBySize('4x6')">4×6"</button>
      <button onclick="filterBySize('5x7')">5×7"</button>
      <button onclick="filterBySize('8x10')">8×10"</button>
      <button onclick="filterBySize('11x14')">11×14"</button>
      <button onclick="filterBySize('16x20')">16×20"</button>
    </div>
  </div>

  <script>
    function filterBySize(size) {
      window.location.href = '{{ collection.url }}?filter.p.m.custom.size=' + size;
    }
  </script>
{%- endif -%}
```

### Material/Finish Quick Filter

```liquid
<div class="collection-hero__material-filter">
  <button onclick="filterByMaterial('matte')">Matte Finish</button>
  <button onclick="filterByMaterial('glossy')">Glossy Finish</button>
  <button onclick="filterByMaterial('canvas')">Canvas</button>
  <button onclick="filterByMaterial('metal')">Metal Print</button>
</div>
```

---

## 🔧 Advanced SEO Tips

### 1. Add FAQ Schema

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What print sizes are available?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We offer prints from 4×6 inches to 40×60 inches..."
    }
  }]
}
</script>
```

### 2. Add Organization Schema

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{ shop.name }}",
  "url": "{{ shop.url }}",
  "logo": "{{ shop.logo | image_url: width: 500 }}",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "Customer Service"
  }
}
</script>
```

---

## 💡 Performance Pro Tips

1. **Preload critical resources**:
```liquid
<link rel="preload"
      as="image"
      href="{{ collection.image | image_url: width: 1500 }}"
      imagesrcset="
        {{ collection.image | image_url: width: 750 }} 750w,
        {{ collection.image | image_url: width: 1500 }} 1500w
      ">
```

2. **Use WebP with fallback**:
```liquid
<picture>
  <source srcset="{{ collection.image | image_url: width: 1500, format: 'webp' }}" type="image/webp">
  <img src="{{ collection.image | image_url: width: 1500 }}" alt="{{ collection.title }}">
</picture>
```

3. **Implement critical CSS**:
Extract above-the-fold styles and inline them in `<head>`.

---

## 🎯 Conversion Optimization Checklist

- [ ] Clear, action-oriented CTA text
- [ ] High-contrast button colors
- [ ] Trust signals visible above fold
- [ ] Mobile-optimized touch targets
- [ ] Fast page load (< 3 seconds)
- [ ] Social proof (reviews/ratings)
- [ ] Urgency/scarcity indicators
- [ ] Clear value proposition
- [ ] Easy navigation to products
- [ ] Professional, high-quality images

---

**Remember**: Test everything! Use A/B testing to find what works best for YOUR audience.
