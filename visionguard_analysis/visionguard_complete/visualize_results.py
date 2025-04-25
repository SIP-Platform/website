import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
import os
from datetime import datetime, timedelta
from PIL import Image
import matplotlib.gridspec as gridspec

# تعيين نمط الرسوم البيانية
plt.style.use('seaborn-v0_8-darkgrid')
sns.set(font_scale=1.2)
plt.rcParams['figure.figsize'] = (12, 8)
plt.rcParams['axes.unicode_minus'] = False

# تحميل النموذج والمكونات الأخرى
with open('/home/ubuntu/visionguard_injury_prediction_model.pkl', 'rb') as f:
    model_components = pickle.load(f)

best_rf = model_components['model']
scaler = model_components['scaler']
features = model_components['features']
best_threshold = model_components['threshold']

print("تم تحميل النموذج بنجاح")

# قراءة ملف مقاييس الأداء
with open('/home/ubuntu/evaluation_plots/model_performance_metrics.txt', 'r', encoding='utf-8') as f:
    metrics_text = f.read()

print("مقاييس أداء النموذج:")
print(metrics_text)

# إنشاء لوحة تحكم تفاعلية للنتائج
def create_dashboard():
    # إنشاء مجلد للوحة التحكم
    dashboard_dir = '/home/ubuntu/visionguard_dashboard'
    os.makedirs(dashboard_dir, exist_ok=True)
    
    # إنشاء صفحة HTML للوحة التحكم
    html_content = """
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>لوحة تحكم VisionGuard - نتائج تحليل البيانات والنموذج التنبؤي</title>
        <style>
            body {
                font-family: 'Tajawal', sans-serif;
                background-color: #0D1117;
                color: #FFFFFF;
                margin: 0;
                padding: 0;
                direction: rtl;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background-color: #161B22;
                border-radius: 10px;
            }
            .header h1 {
                color: #00E5D0;
                margin-bottom: 10px;
            }
            .header p {
                color: #A3B3BC;
                font-size: 18px;
            }
            .section {
                background-color: #1A2233;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .section h2 {
                color: #00E5D0;
                border-bottom: 1px solid #2D3748;
                padding-bottom: 10px;
                margin-top: 0;
            }
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            .metric-card {
                background-color: #1E293B;
                border-radius: 8px;
                padding: 15px;
                text-align: center;
            }
            .metric-value {
                font-size: 24px;
                font-weight: bold;
                color: #00E5D0;
                margin: 10px 0;
            }
            .metric-label {
                color: #A3B3BC;
                font-size: 14px;
            }
            .plot-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            .plot-card {
                background-color: #1E293B;
                border-radius: 8px;
                padding: 15px;
            }
            .plot-title {
                color: #FFFFFF;
                font-size: 16px;
                margin-bottom: 15px;
                text-align: center;
            }
            .plot-image {
                width: 100%;
                border-radius: 5px;
            }
            .feature-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            .feature-table th, .feature-table td {
                padding: 12px 15px;
                text-align: right;
                border-bottom: 1px solid #2D3748;
            }
            .feature-table th {
                background-color: #1E293B;
                color: #00E5D0;
            }
            .feature-table tr:hover {
                background-color: #1E293B;
            }
            .importance-bar {
                height: 10px;
                background-color: #00E5D0;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                margin-top: 50px;
                padding: 20px;
                color: #A3B3BC;
                font-size: 14px;
            }
            @media (max-width: 768px) {
                .plot-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>لوحة تحكم VisionGuard - نتائج تحليل البيانات والنموذج التنبؤي</h1>
                <p>تحليل شامل لبيانات اللاعبين ونموذج التنبؤ بالإصابات الرياضية</p>
            </div>
            
            <div class="section">
                <h2>مقاييس أداء النموذج</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-label">الدقة</div>
                        <div class="metric-value">98.7%</div>
                        <div class="metric-label">Accuracy</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">الضبط</div>
                        <div class="metric-value">64.6%</div>
                        <div class="metric-label">Precision</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">الاستدعاء</div>
                        <div class="metric-value">93.6%</div>
                        <div class="metric-label">Recall</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">مقياس F1</div>
                        <div class="metric-value">76.5%</div>
                        <div class="metric-label">F1 Score</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">مساحة تحت منحنى ROC</div>
                        <div class="metric-value">99.1%</div>
                        <div class="metric-label">AUC</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>منحنيات تقييم النموذج</h2>
                <div class="plot-grid">
                    <div class="plot-card">
                        <div class="plot-title">منحنى ROC</div>
                        <img src="roc_curve.png" alt="منحنى ROC" class="plot-image">
                    </div>
                    <div class="plot-card">
                        <div class="plot-title">منحنى الدقة-الاستدعاء</div>
                        <img src="precision_recall_curve.png" alt="منحنى الدقة-الاستدعاء" class="plot-image">
                    </div>
                    <div class="plot-card">
                        <div class="plot-title">مصفوفة الارتباك</div>
                        <img src="confusion_matrix.png" alt="مصفوفة الارتباك" class="plot-image">
                    </div>
                    <div class="plot-card">
                        <div class="plot-title">توزيع احتمالات الإصابة</div>
                        <img src="probability_distribution.png" alt="توزيع احتمالات الإصابة" class="plot-image">
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>أهمية المتغيرات في التنبؤ بالإصابات</h2>
                <div class="plot-card">
                    <div class="plot-title">أهمية المتغيرات في النموذج</div>
                    <img src="feature_importance.png" alt="أهمية المتغيرات" class="plot-image">
                </div>
                <table class="feature-table">
                    <thead>
                        <tr>
                            <th>المتغير</th>
                            <th>الأهمية</th>
                            <th>التمثيل البصري</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>readiness (الجاهزية)</td>
                            <td>16.01%</td>
                            <td><div class="importance-bar" style="width: 100%"></div></td>
                        </tr>
                        <tr>
                            <td>ctl42 (الحمل المزمن 42 يوم)</td>
                            <td>14.59%</td>
                            <td><div class="importance-bar" style="width: 91%"></div></td>
                        </tr>
                        <tr>
                            <td>ctl28 (الحمل المزمن 28 يوم)</td>
                            <td>9.96%</td>
                            <td><div class="importance-bar" style="width: 62%"></div></td>
                        </tr>
                        <tr>
                            <td>acwr (نسبة الحمل الحاد:المزمن)</td>
                            <td>8.28%</td>
                            <td><div class="importance-bar" style="width: 52%"></div></td>
                        </tr>
                        <tr>
                            <td>strain (الإجهاد)</td>
                            <td>7.94%</td>
                            <td><div class="importance-bar" style="width: 50%"></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="section">
                <h2>تحليل العلاقات بين المتغيرات والإصابات</h2>
                <div class="plot-grid">
                    <div class="plot-card">
                        <div class="plot-title">العلاقة بين المتغيرات الأكثر أهمية والإصابات</div>
                        <img src="top_features_vs_injury.png" alt="العلاقة بين المتغيرات والإصابات" class="plot-image">
                    </div>
                    <div class="plot-card">
                        <div class="plot-title">مصفوفة الارتباط بين المتغيرات الأكثر أهمية</div>
                        <img src="top_features_correlation.png" alt="مصفوفة الارتباط بين المتغيرات" class="plot-image">
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>الاستنتاجات والتوصيات</h2>
                <div style="padding: 20px; background-color: #1E293B; border-radius: 8px;">
                    <h3 style="color: #00E5D0;">النتائج الرئيسية:</h3>
                    <ul>
                        <li>تم بناء نموذج تنبؤي للإصابات باستخدام بيانات الحالة الصحية وحمل التدريب بدقة عالية تصل إلى 98.7%.</li>
                        <li>المتغيرات الأكثر أهمية في التنبؤ بالإصابات هي الجاهزية (readiness) والحمل المزمن (ctl42, ctl28) ونسبة الحمل الحاد:المزمن (acwr).</li>
                        <li>وجود علاقة قوية بين ارتفاع نسبة الحمل الحاد:المزمن وزيادة مخاطر الإصابة.</li>
                        <li>تأثير كبير لمستويات الجاهزية والإجهاد على مخاطر الإصابة.</li>
                    </ul>
                    
                    <h3 style="color: #00E5D0;">التوصيات:</h3>
                    <ul>
                        <li><strong>مراقبة نسبة الحمل الحاد:المزمن:</strong> الحفاظ على نسبة متوازنة بين الحمل الحاد والمزمن لتقليل مخاطر الإصابة.</li>
                        <li><strong>إدارة الإجهاد:</strong> تطبيق استراتيجيات لتقليل الإجهاد البدني والنفسي للاعبين.</li>
                        <li><strong>مراقبة مستويات الجاهزية:</strong> تنفيذ برامج استشفاء فعالة لتحسين مستويات الجاهزية.</li>
                        <li><strong>تخصيص برامج التدريب:</strong> تعديل برامج التدريب بناءً على مخاطر الإصابة المتوقعة لكل لاعب.</li>
                        <li><strong>التدخل المبكر:</strong> اتخاذ إجراءات وقائية عند ارتفاع مخاطر الإصابة.</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <p>VisionGuard © 2025 - نحمي أبطالك قبل الإصابة، بذكاء ينقذ المواسم</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # حفظ صفحة HTML
    with open(os.path.join(dashboard_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # نسخ الرسوم البيانية إلى مجلد لوحة التحكم
    import shutil
    for plot_file in os.listdir('/home/ubuntu/evaluation_plots/'):
        if plot_file.endswith('.png'):
            shutil.copy(
                os.path.join('/home/ubuntu/evaluation_plots/', plot_file),
                os.path.join(dashboard_dir, plot_file)
            )
    
    print(f"تم إنشاء لوحة التحكم بنجاح في: {dashboard_dir}")
    return dashboard_dir

# إنشاء تقرير تحليلي شامل
def create_comprehensive_report():
    # إنشاء مجلد للتقرير
    report_dir = '/home/ubuntu/visionguard_report'
    os.makedirs(report_dir, exist_ok=True)
    
    # إنشاء ملف التقرير
    report_path = os.path.join(report_dir, 'visionguard_analysis_report.md')
    
    report_content = """# تقرير تحليل بيانات VisionGuard وبناء نموذج تنبؤي للإصابات الرياضية

## ملخص تنفيذي

تم في هذا التقرير تحليل بيانات رياضية حقيقية وبناء نموذج تنبؤي للإصابات الرياضية لمنصة VisionGuard. استخدمنا بيانات متنوعة تشمل مقاييس الحالة الصحية للاعبين (مثل التعب وجودة النوم) وبيانات حمل التدريب (مثل الحمل اليومي والأسبوعي ونسبة الحمل الحاد:المزمن) لبناء نموذج يمكنه التنبؤ بمخاطر الإصابة قبل حدوثها.

حقق النموذج النهائي دقة عالية تصل إلى 98.7% ومقياس F1 بقيمة 76.5%، مما يدل على قدرته على التنبؤ بالإصابات بشكل فعال. تم تحديد المتغيرات الأكثر أهمية في التنبؤ بالإصابات، وهي الجاهزية (readiness) والحمل المزمن (ctl42, ctl28) ونسبة الحمل الحاد:المزمن (acwr).

## مقدمة

منصة VisionGuard تستخدم الذكاء الاصطناعي والتعلم الآلي للتنبؤ بإصابات اللاعبين قبل حدوثها. الهدف من هذا التحليل هو بناء نموذج تنبؤي يمكنه تحديد اللاعبين المعرضين لخطر الإصابة قبل حدوثها، مما يساعد المدربين والأطباء على اتخاذ إجراءات وقائية لحماية اللاعبين.

## البيانات المستخدمة

تم استخدام مجموعة متنوعة من البيانات في هذا التحليل:

### بيانات الحالة الصحية (Wellness)
- **التعب (Fatigue)**: مستويات التعب اليومية للاعبين
- **جودة النوم (Sleep Quality)**: تقييم جودة النوم
- **مدة النوم (Sleep Duration)**: عدد ساعات النوم
- **الإجهاد (Stress)**: مستويات الإجهاد النفسي
- **الألم العضلي (Soreness)**: مستويات الألم العضلي
- **المزاج (Mood)**: الحالة المزاجية للاعبين
- **الجاهزية (Readiness)**: مدى جاهزية اللاعب للتدريب أو المنافسة

### بيانات حمل التدريب (Training Load)
- **الحمل اليومي (Daily Load)**: حمل التدريب اليومي
- **الحمل الأسبوعي (Weekly Load)**: حمل التدريب الأسبوعي المتراكم
- **نسبة الحمل الحاد:المزمن (ACWR)**: نسبة الحمل الحاد إلى الحمل المزمن
- **الحمل الحاد (ATL)**: حمل التدريب الحاد (قصير المدى)
- **الحمل المزمن (CTL28, CTL42)**: حمل التدريب المزمن (28 و42 يوم)
- **الإجهاد (Strain)**: مقياس للإجهاد البدني
- **الرتابة (Monotony)**: مقياس لرتابة التدريب

### بيانات الإصابات (Injury)
- سجل الإصابات يتضمن اسم اللاعب ونوع الإصابة وتاريخ حدوثها

## منهجية التحليل

تم اتباع المنهجية التالية في هذا التحليل:

1. **استكشاف وتحليل البيانات**: فهم هيكل البيانات وتوزيعها والعلاقات بينها
2. **معالجة البيانات**: تنظيف البيانات ومعالجة القيم المفقودة وتحويل البيانات إلى الشكل المناسب للنمذجة
3. **هندسة المتغيرات**: إنشاء متغير هدف للإصابات (1 إذا حدثت إصابة في الأسبوع التالي، 0 إذا لم تحدث)
4. **بناء النموذج**: استخدام خوارزمية الغابة العشوائية (Random Forest) لبناء نموذج تنبؤي
5. **تحسين النموذج**: استخدام البحث الشبكي (Grid Search) لاختيار أفضل المعلمات للنموذج
6. **تقييم النموذج**: تقييم أداء النموذج باستخدام مقاييس مختلفة مثل الدقة والضبط والاستدعاء ومقياس F1
7. **تحليل النتائج**: تحليل أهمية المتغيرات والعلاقات بينها وتأثيرها على مخاطر الإصابة

## نتائج التحليل

### أداء النموذج

حقق النموذج النهائي النتائج التالية:

- **الدقة (Accuracy)**: 98.7%
- **الضبط (Precision)**: 64.6%
- **الاستدعاء (Recall)**: 93.6%
- **مقياس F1**: 76.5%
- **مساحة تحت منحنى ROC (AUC)**: 99.1%

### أهمية المتغيرات

تم تحديد المتغيرات الأكثر أهمية في التنبؤ بالإصابات:

1. **الجاهزية (Readiness)**: 16.01%
2. **الحمل المزمن 42 يوم (CTL42)**: 14.59%
3. **الحمل المزمن 28 يوم (CTL28)**: 9.96%
4. **نسبة الحمل الحاد:المزمن (ACWR)**: 8.28%
5. **الإجهاد (Strain)**: 7.94%

### العلاقات الرئيسية

- وجود علاقة قوية بين ارتفاع نسبة الحمل الحاد:المزمن وزيادة مخاطر الإصابة
- تأثير كبير لمستويات الجاهزية على مخاطر الإصابة، حيث ترتبط المستويات المنخفضة من الجاهزية بزيادة مخاطر الإصابة
- ارتباط قوي بين الحمل المزمن (CTL42, CTL28) ومخاطر الإصابة، مما يشير إلى أهمية إدارة الحمل التدريبي على المدى الطويل

## الاستنتاجات والتوصيات

### الاستنتاجات الرئيسية

1. يمكن التنبؤ بإصابات اللاعبين قبل حدوثها بدقة عالية باستخدام بيانات الحالة الصحية وحمل التدريب
2. الجاهزية والحمل المزمن ونسبة الحمل الحاد:المزمن هي المؤشرات الأكثر أهمية للتنبؤ بالإصابات
3. التوازن بين الحمل الحاد والمزمن أمر حاسم في تقليل مخاطر الإصابة

### التوصيات

1. **مراقبة نسبة الحمل الحاد:المزمن**: الحفاظ على نسبة متوازنة بين الحمل الحاد والمزمن لتقليل مخاطر الإصابة
2. **إدارة الإجهاد**: تطبيق استراتيجيات لتقليل الإجهاد البدني والنفسي للاعبين
3. **مراقبة مستويات الجاهزية**: تنفيذ برامج استشفاء فعالة لتحسين مستويات الجاهزية
4. **تخصيص برامج التدريب**: تعديل برامج التدريب بناءً على مخاطر الإصابة المتوقعة لكل لاعب
5. **التدخل المبكر**: اتخاذ إجراءات وقائية عند ارتفاع مخاطر الإصابة

## الخطوات المستقبلية

1. جمع المزيد من البيانات لتحسين دقة النموذج
2. دمج بيانات إضافية مثل بيانات GPS وبيانات الحركة
3. تطوير نماذج تنبؤية خاصة بأنواع محددة من الإصابات
4. إنشاء نظام تنبيه في الوقت الفعلي لمخاطر الإصابة
5. تقييم فعالية التدخلات الوقائية في تقليل الإصابات

## الملحقات

- نموذج التنبؤ بالإصابات: `/home/ubuntu/visionguard_injury_prediction_model.pkl`
- لوحة تحكم تفاعلية للنتائج: `/home/ubuntu/visionguard_dashboard/index.html`
- الرسوم البيانية: `/home/ubuntu/evaluation_plots/`
"""
    
    # حفظ التقرير
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report_content)
    
    print(f"تم إنشاء التقرير التحليلي الشامل بنجاح في: {report_path}")
    return report_path

# إنشاء صورة ملخصة للنتائج
def create_summary_image():
    # إنشاء مجلد للصور
    images_dir = '/home/ubuntu/visionguard_images'
    os.makedirs(images_dir, exist_ok=True)
    
    # تحميل الصور
    roc_curve = Image.open('/home/ubuntu/evaluation_plots/roc_curve.png')
    feature_importance = Image.open('/home/ubuntu/evaluation_plots/feature_importance.png')
    confusion_matrix = Image.open('/home/ubuntu/evaluation_plots/confusion_matrix.png')
    top_features_vs_injury = Image.open('/home/ubuntu/evaluation_plots/top_features_vs_injury.png')
    
    # إنشاء صورة ملخصة
    fig = plt.figure(figsize=(20, 16))
    gs = gridspec.GridSpec(2, 2, width_ratios=[1, 1], height_ratios=[1, 1])
    
    # إضافة الصور إلى الشكل
    ax1 = plt.subplot(gs[0, 0])
    ax1.imshow(np.array(roc_curve))
    ax1.set_title('منحنى ROC', fontsize=16)
    ax1.axis('off')
    
    ax2 = plt.subplot(gs[0, 1])
    ax2.imshow(np.array(feature_importance))
    ax2.set_title('أهمية المتغيرات', fontsize=16)
    ax2.axis('off')
    
    ax3 = plt.subplot(gs[1, 0])
    ax3.imshow(np.array(confusion_matrix))
    ax3.set_title('مصفوفة الارتباك', fontsize=16)
    ax3.axis('off')
    
    ax4 = plt.subplot(gs[1, 1])
    ax4.imshow(np.array(top_features_vs_injury))
    ax4.set_title('العلاقة بين المتغيرات الأكثر أهمية والإصابات', fontsize=16)
    ax4.axis('off')
    
    plt.suptitle('ملخص نتائج نموذج التنبؤ بالإصابات الرياضية', fontsize=24)
    plt.tight_layout()
    
    # حفظ الصورة الملخصة
    summary_image_path = os.path.join(images_dir, 'visionguard_results_summary.png')
    plt.savefig(summary_image_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"تم إنشاء الصورة الملخصة بنجاح في: {summary_image_path}")
    return summary_image_path

# تنفيذ الوظائف
dashboard_dir = create_dashboard()
report_path = create_comprehensive_report()
summary_image_path = create_summary_image()

print("\nتم إنشاء جميع المخرجات بنجاح:")
print(f"1. لوحة التحكم: {dashboard_dir}/index.html")
print(f"2. التقرير التحليلي: {report_path}")
print(f"3. الصورة الملخصة: {summary_image_path}")
