import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
import os
from sklearn.metrics import roc_curve, auc, precision_recall_curve, confusion_matrix

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
print(f"عتبة التنبؤ المثلى: {best_threshold:.3f}")

# تحميل البيانات المعالجة
data_path = '/home/ubuntu/data_analysis/subjective/'

# قراءة بيانات الإصابات
injury_df = pd.read_csv(os.path.join(data_path, 'injury/injury.csv'))

# تحميل البيانات المعالجة من ملف build_model.py
# نفترض أننا قمنا بحفظ البيانات المعالجة في ملف CSV
# إذا لم يكن الملف موجودًا، سنقوم بإعادة تشغيل الكود السابق

# تحديد مسار ملف البيانات المعالجة
processed_data_path = '/home/ubuntu/processed_data.csv'

# التحقق من وجود ملف البيانات المعالجة
if not os.path.exists(processed_data_path):
    print("ملف البيانات المعالجة غير موجود، سيتم إعادة معالجة البيانات...")
    
    # إعادة تشغيل الكود السابق لمعالجة البيانات
    exec(open('/home/ubuntu/build_model.py').read())
    
    # حفظ البيانات المعالجة في ملف CSV
    model_data.to_csv(processed_data_path, index=False)
else:
    # قراءة البيانات المعالجة من الملف
    model_data = pd.read_csv(processed_data_path)
    print("تم تحميل البيانات المعالجة بنجاح")

# تقسيم البيانات إلى متغيرات مستقلة ومتغير تابع
X = model_data[features]
y = model_data['injury_next_week']

# تطبيع البيانات
X_scaled = scaler.transform(X)

# التنبؤ باحتمالية الإصابة
y_prob = best_rf.predict_proba(X_scaled)[:, 1]

# تطبيق العتبة المثلى على التنبؤات
y_pred = (y_prob >= best_threshold).astype(int)

# إنشاء مجلد للرسوم البيانية
os.makedirs('/home/ubuntu/evaluation_plots', exist_ok=True)

# رسم منحنى ROC
plt.figure(figsize=(10, 8))
fpr, tpr, _ = roc_curve(y, y_prob)
roc_auc = auc(fpr, tpr)
plt.plot(fpr, tpr, label=f'منحنى ROC (AUC = {roc_auc:.3f})')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('معدل الإيجابيات الخاطئة', fontsize=12)
plt.ylabel('معدل الإيجابيات الصحيحة', fontsize=12)
plt.title('منحنى ROC للنموذج', fontsize=14)
plt.legend(loc="lower right")
plt.grid(True, linestyle='--', alpha=0.7)
plt.savefig('/home/ubuntu/evaluation_plots/roc_curve.png', dpi=300, bbox_inches='tight')
plt.close()

# رسم منحنى الدقة-الاستدعاء
plt.figure(figsize=(10, 8))
precision, recall, thresholds = precision_recall_curve(y, y_prob)
plt.plot(recall, precision, linewidth=2)
plt.xlabel('الاستدعاء', fontsize=12)
plt.ylabel('الدقة', fontsize=12)
plt.title('منحنى الدقة-الاستدعاء', fontsize=14)
plt.grid(True, linestyle='--', alpha=0.7)
plt.savefig('/home/ubuntu/evaluation_plots/precision_recall_curve.png', dpi=300, bbox_inches='tight')
plt.close()

# رسم مصفوفة الارتباك
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('مصفوفة الارتباك للنموذج', fontsize=14)
plt.xlabel('القيم المتنبأ بها', fontsize=12)
plt.ylabel('القيم الحقيقية', fontsize=12)
plt.savefig('/home/ubuntu/evaluation_plots/confusion_matrix.png', dpi=300, bbox_inches='tight')
plt.close()

# رسم أهمية المتغيرات
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': best_rf.feature_importances_
})
feature_importance = feature_importance.sort_values('importance', ascending=False)

plt.figure(figsize=(12, 8))
sns.barplot(x='importance', y='feature', data=feature_importance)
plt.title('أهمية المتغيرات في النموذج', fontsize=14)
plt.xlabel('الأهمية', fontsize=12)
plt.ylabel('المتغير', fontsize=12)
plt.grid(True, linestyle='--', alpha=0.7)
plt.savefig('/home/ubuntu/evaluation_plots/feature_importance.png', dpi=300, bbox_inches='tight')
plt.close()

# تحليل توزيع احتمالات الإصابة
plt.figure(figsize=(12, 8))
sns.histplot(y_prob, bins=30, kde=True)
plt.axvline(x=best_threshold, color='r', linestyle='--', label=f'عتبة التنبؤ ({best_threshold:.3f})')
plt.title('توزيع احتمالات الإصابة', fontsize=16)
plt.xlabel('احتمالية الإصابة', fontsize=14)
plt.ylabel('التكرار', fontsize=14)
plt.legend()
plt.grid(True, linestyle='--', alpha=0.7)
plt.savefig('/home/ubuntu/evaluation_plots/probability_distribution.png', dpi=300, bbox_inches='tight')
plt.close()

# تحليل العلاقة بين المتغيرات الأكثر أهمية ومخاطر الإصابة
top_features = feature_importance.head(4)['feature'].tolist()

plt.figure(figsize=(16, 12))
for i, feature in enumerate(top_features):
    plt.subplot(2, 2, i+1)
    sns.boxplot(x=y, y=model_data[feature])
    plt.title(f'العلاقة بين {feature} والإصابة', fontsize=12)
    plt.xlabel('الإصابة', fontsize=10)
    plt.ylabel(feature, fontsize=10)
    plt.xticks([0, 1], ['لا', 'نعم'])
plt.tight_layout()
plt.savefig('/home/ubuntu/evaluation_plots/top_features_vs_injury.png', dpi=300, bbox_inches='tight')
plt.close()

# تحليل العلاقة بين المتغيرات الأكثر أهمية
plt.figure(figsize=(12, 10))
sns.heatmap(model_data[top_features].corr(), annot=True, cmap='coolwarm', vmin=-1, vmax=1, center=0, fmt='.2f')
plt.title('مصفوفة الارتباط بين المتغيرات الأكثر أهمية', fontsize=14)
plt.tight_layout()
plt.savefig('/home/ubuntu/evaluation_plots/top_features_correlation.png', dpi=300, bbox_inches='tight')
plt.close()

print("تم إنشاء جميع الرسوم البيانية لتقييم النموذج بنجاح")
print("مسار الرسوم البيانية: /home/ubuntu/evaluation_plots/")

# حساب مقاييس الأداء الإضافية
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

accuracy = accuracy_score(y, y_pred)
precision = precision_score(y, y_pred)
recall = recall_score(y, y_pred)
f1 = f1_score(y, y_pred)

print("\nمقاييس أداء النموذج:")
print(f"الدقة (Accuracy): {accuracy:.3f}")
print(f"الضبط (Precision): {precision:.3f}")
print(f"الاستدعاء (Recall): {recall:.3f}")
print(f"مقياس F1: {f1:.3f}")
print(f"مساحة تحت منحنى ROC (AUC): {roc_auc:.3f}")

# إنشاء ملف تقرير لمقاييس الأداء
with open('/home/ubuntu/evaluation_plots/model_performance_metrics.txt', 'w', encoding='utf-8') as f:
    f.write("مقاييس أداء نموذج التنبؤ بإصابات اللاعبين\n")
    f.write("==========================================\n\n")
    f.write(f"الدقة (Accuracy): {accuracy:.3f}\n")
    f.write(f"الضبط (Precision): {precision:.3f}\n")
    f.write(f"الاستدعاء (Recall): {recall:.3f}\n")
    f.write(f"مقياس F1: {f1:.3f}\n")
    f.write(f"مساحة تحت منحنى ROC (AUC): {roc_auc:.3f}\n\n")
    f.write(f"عتبة التنبؤ المثلى: {best_threshold:.3f}\n\n")
    f.write("أهمية المتغيرات في النموذج:\n")
    for index, row in feature_importance.iterrows():
        f.write(f"{row['feature']}: {row['importance']:.4f}\n")

print("\nتم حفظ مقاييس الأداء في ملف: /home/ubuntu/evaluation_plots/model_performance_metrics.txt")
