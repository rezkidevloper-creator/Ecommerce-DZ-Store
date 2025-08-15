# Ecommerce DZ Store

Une application e-commerce complète développée spécialement pour le marché algérien, avec support du paiement à la livraison (COD) et interface en français.

تم التطوير من طرف **Rezki-dev**
متجر تجارة إلكترونية حديثة ومتكاملة موجهة للسوق الجزائري 🇩🇿
واجهة مستخدم فرنسية مع دعم الدفع عند التسليم.

## 🚀 Fonctionnalités / الميزات

### Frontend Client / واجهة الزبون

* **Catalogue de produits** avec recherche et filtres avancés / كتالوج منتجات مع بحث وفلاتر متقدمة
* **Panier d'achat** avec persistance localStorage / سلة مشتريات مع حفظ البيانات محليًا
* **Système de commande** avec formulaire de livraison complet / نظام طلبات مع نموذج تسليم كامل
* **Interface responsive** adaptée mobile et desktop / واجهة متجاوبة للهواتف والحواسيب
* **Paiement à la livraison (COD)** - mode de paiement principal en Algérie / الدفع عند التسليم

### Panel d'Administration / لوحة الإدارة

* **Tableau de bord** avec statistiques en temps réel / لوحة تحكم مع إحصائيات لحظية
* **Gestion des produits** (ajout, modification, suppression) / إدارة المنتجات (إضافة، تعديل، حذف)
* **Gestion des commandes** avec suivi des statuts / إدارة الطلبات مع متابعة الحالة
* **Interface d'administration** intuitive et complète / واجهة إدارة سهلة ومتكاملة

### Caractéristiques Techniques / الخصائص التقنية

* **React 18** avec TypeScript pour la robustesse / استخدام React 18 مع TypeScript للقوة والثبات
* **Vite** pour un développement rapide / استخدام Vite لتطوير سريع
* **Tailwind CSS** pour un design moderne / تصميم حديث مع Tailwind CSS
* **Context API** pour la gestion d'état / إدارة الحالة باستخدام Context API
* **localStorage** pour la persistance des données / حفظ البيانات محليًا
* **Design responsive** avec breakpoints optimisés / تصميم متجاوب مع نقاط توقف محسنة

## 🛠️ Technologies Utilisées / التقنيات المستخدمة

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React Context API
* **Storage:** localStorage (demo)
* **Build:** Vite

## 📦 Installation et Démarrage / التثبيت والتشغيل

### Prérequis / المتطلبات

* Node.js 16+
* npm ou yarn

### Installation / التثبيت

```bash
# Cloner le projet
git clone [url-du-repo]
cd ecommerce-dz-store

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Preview du build de production
npm run preview
```

### Scripts Disponibles / السكريبتات المتاحة

* `npm run dev` - Démarrage du serveur de développement / تشغيل الخادم المحلي
* `npm run build` - Build de production / بناء نسخة الإنتاج
* `npm run preview` - Aperçu du build de production / معاينة نسخة الإنتاج
* `npm run lint` - Vérification du code avec ESLint / التحقق من جودة الكود

## 🏗️ Structure du Projet / هيكل المشروع

```
src/
├── components/          # Composants réutilisables / مكونات قابلة لإعادة الاستخدام
│   ├── Layout/         # Header, Footer / الرأس والتذييل
│   ├── UI/            # Button, Modal, LoadingSpinner / أزرار ونوافذ حوار ومؤشرات تحميل
│   ├── Product/       # ProductCard, ProductFilters / بطاقة المنتج والفلاتر
│   ├── Cart/          # CartItem / عناصر السلة
│   ├── Checkout/      # CheckoutForm / نموذج الدفع
│   └── Admin/         # ProductForm, OrderCard, DashboardStats / إدارة المنتجات والطلبات
├── contexts/          # React Context pour état global / إدارة الحالة العامة
├── hooks/            # Hooks personnalisés / هوكس مخصصة
├── pages/            # Pages principales / الصفحات الرئيسية
├── types/            # Types TypeScript / أنواع TypeScript
├── utils/            # Fonctions utilitaires / دوال مساعدة
└── data/             # Données de démonstration / بيانات تجريبية
```

## 🇩🇿 Localisation Algérienne / تخصيص جزائري

* **Devise / العملة:** Dinar Algérien (DZD)
* **Paiement / الدفع:** Cash on Delivery (COD)
* **Géographie / الجغرافيا:** Liste complète des 58 wilayas / قائمة بكل الولايات
* **Langue / اللغة:** Français et arabe / الفرنسية والعربية
* **Validation / التحقق:** Numéros de téléphone algériens

## 📱 Design Responsive / تصميم متجاوب

* **Mobile First / الهواتف أولاً**
* **Breakpoints / نقاط التوقف:**

  * Mobile: < 768px
  * Tablet: 768px - 1024px
  * Desktop: > 1024px
* **Navigation / التنقل:** adaptée selon la taille d'écran
* **Layouts / تخطيطات:** Grilles flexibles et composants adaptatifs

## 🎨 Système de Design / نظام التصميم

### Couleurs / الألوان

* **Primary / رئيسية:** Blue (#3B82F6)
* **Secondary / ثانوية:** Green (#10B981)
* **Accent / تمييز:** Orange (#F97316)
* **Success / نجاح:** Green (#22C55E)
* **Warning / تحذير:** Yellow (#EAB308)
* **Error / خطأ:** Red (#EF4444)

### Typography / الخط

* **Fonts / الخطوط:** System fonts optimisés
* **Weights / السماكات:** Regular, Medium, Bold
* **Spacing / المسافات:** Système 8px pour cohérence

## 📈 Performance / الأداء

* **Build Size / حجم البناء:** Optimisé avec Vite
* **Images / الصور:** Lazy loading et optimisation
* **Code Splitting / تقسيم الكود:** Composants séparés
* **Caching / التخزين المؤقت:** localStorage pour données client

## 🤝 Contribution / المساهمة

1. Fork le projet / عمل نسخة Fork
2. Créer une branche feature / إنشاء فرع جديد
3. Commit les changes / حفظ التغييرات
4. Push sur la branche / رفع الفرع
5. Ouvrir une Pull Request / فتح طلب سحب

## 📄 Licence / الرخصة

Distribué sous licence MIT. Voir `LICENSE` pour plus d'informations.

## 📧 Contact

Pour questions ou suggestions, contactez **Rezki-dev**.

---

**Ecommerce DZ Store** - Solution e-commerce moderne adaptée au marché algérien 🇩🇿
Développé par **Rezki-dev**
