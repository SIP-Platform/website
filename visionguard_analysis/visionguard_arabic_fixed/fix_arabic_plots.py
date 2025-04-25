import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pickle
import os
from sklearn.metrics import confusion_matrix, roc_curve, auc, precision_recall_curve

# تحميل النموذج والمكونات الأخرى
with open('/home/ubuntu/visionguard_injury_prediction_model.pkl', 'rb') as f:
    model_components = pickle.load(f)

best_rf = model_components['model']
scaler = model_components['scaler']
features = model_components['features']
best_threshold = model_components['threshold']

# تحميل البيانات المعالجة
model_data = pd.read_csv('/home/ubuntu/visionguard_processed_data.csv')

# تقسيم البيانات إلى متغيرات مستقلة ومتغير تابع
X = model_data[features]
y = model_data['injury_next_week']

# تحديد المتغيرات المستقلة
wellness_metrics = ['fatigue', 'sleep_quality', 'sleep_duration', 'stress', 'soreness', 'mood', 'readiness']
training_metrics = ['daily_load', 'weekly_load', 'acwr', 'atl', 'ctl28', 'ctl42', 'strain', 'monotony']

# إنشاء مجلد للرسوم البيانية المصححة
os.makedirs('/home/ubuntu/fixed_arabic_plots', exist_ok=True)

# تعيين الخط العربي
arabic_font = {
    'family': 'Arial, sans-serif',
    'size': 14
}

# 1. رسم توزيع متغير الهدف
injury_counts = model_data['injury_next_week'].value_counts()
fig_target_dist = px.pie(
    names=['لا إصابة', 'إصابة'],
    values=[injury_counts[0], injury_counts[1]],
    title='توزيع متغير الهدف (الإصابات في الأسبوع التالي)',
    color_discrete_sequence=['#3498db', '#e74c3c'],
    hole=0.4
)
fig_target_dist.update_layout(
    font=arabic_font,
    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    title_font=arabic_font
)
fig_target_dist.write_image("/home/ubuntu/fixed_arabic_plots/target_distribution.png", scale=2)

# 2. رسم أهمية المتغيرات
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': best_rf.feature_importances_
})
feature_importance = feature_importance.sort_values('importance', ascending=False)

# تعريب أسماء المتغيرات
feature_arabic_names = {
    'readiness': 'الجاهزية',
    'ctl42': 'الحمل المزمن 42 يوم',
    'ctl28': 'الحمل المزمن 28 يوم',
    'acwr': 'نسبة الحمل الحاد:المزمن',
    'strain': 'الإجهاد',
    'weekly_load': 'الحمل الأسبوعي',
    'monotony': 'الرتابة',
    'atl': 'الحمل الحاد',
    'sleep_duration': 'مدة النوم',
    'daily_load': 'الحمل اليومي',
    'sleep_quality': 'جودة النوم',
    'stress': 'التوتر',
    'soreness': 'الألم العضلي',
    'mood': 'المزاج',
    'fatigue': 'التعب'
}

# إنشاء عمود جديد للأسماء العربية
feature_importance['arabic_name'] = feature_importance['feature'].map(feature_arabic_names)

fig_importance = px.bar(
    feature_importance,
    x='importance',
    y='arabic_name',
    orientation='h',
    title='أهمية المتغيرات في النموذج',
    color='importance',
    color_continuous_scale='Viridis'
)
fig_importance.update_layout(
    font=arabic_font,
    yaxis=dict(title=''),
    xaxis=dict(title='الأهمية'),
    height=600,
    title_font=arabic_font
)
fig_importance.write_image("/home/ubuntu/fixed_arabic_plots/feature_importance.png", scale=2)

# 3. رسم منحنى ROC
# تقييم النموذج على بيانات الاختبار
X_scaled = scaler.transform(X)
y_prob = best_rf.predict_proba(X_scaled)[:, 1]

fpr, tpr, _ = roc_curve(y, y_prob)
roc_auc = auc(fpr, tpr)

fig_roc = go.Figure()
fig_roc.add_trace(
    go.Scatter(
        x=fpr, y=tpr,
        mode='lines',
        name=f'منحنى ROC (AUC = {roc_auc:.3f})',
        line=dict(color='#2ecc71', width=3)
    )
)
fig_roc.add_trace(
    go.Scatter(
        x=[0, 1], y=[0, 1],
        mode='lines',
        name='خط الأساس',
        line=dict(color='#7f7f7f', width=2, dash='dash')
    )
)
fig_roc.update_layout(
    title='منحنى ROC للنموذج',
    xaxis=dict(title='معدل الإيجابيات الخاطئة'),
    yaxis=dict(title='معدل الإيجابيات الصحيحة'),
    font=arabic_font,
    legend=dict(x=0.7, y=0.1),
    width=800,
    height=600,
    title_font=arabic_font
)
fig_roc.write_image("/home/ubuntu/fixed_arabic_plots/roc_curve.png", scale=2)

# 4. رسم منحنى الدقة-الاستدعاء
precision, recall, thresholds = precision_recall_curve(y, y_prob)

# تحديد العتبة المثلى
f1_scores = []
for i in range(len(precision)):
    if recall[i] == 0 or precision[i] == 0:
        f1_scores.append(0)
    else:
        f1 = 2 * (precision[i] * recall[i]) / (precision[i] + recall[i])
        f1_scores.append(f1)

best_threshold_idx = np.argmax(f1_scores)
best_threshold = thresholds[best_threshold_idx] if best_threshold_idx < len(thresholds) else 0

fig_pr = go.Figure()
fig_pr.add_trace(
    go.Scatter(
        x=recall, y=precision,
        mode='lines',
        name='منحنى الدقة-الاستدعاء',
        line=dict(color='#9b59b6', width=3)
    )
)
fig_pr.add_trace(
    go.Scatter(
        x=[recall[best_threshold_idx]], y=[precision[best_threshold_idx]],
        mode='markers',
        name=f'العتبة المثلى ({best_threshold:.3f})',
        marker=dict(color='#e74c3c', size=12)
    )
)
fig_pr.update_layout(
    title='منحنى الدقة-الاستدعاء',
    xaxis=dict(title='الاستدعاء'),
    yaxis=dict(title='الدقة'),
    font=arabic_font,
    legend=dict(x=0.7, y=0.1),
    width=800,
    height=600,
    title_font=arabic_font
)
fig_pr.write_image("/home/ubuntu/fixed_arabic_plots/precision_recall_curve.png", scale=2)

# 5. رسم مصفوفة الارتباك
y_pred = (y_prob >= best_threshold).astype(int)
cm = confusion_matrix(y, y_pred)
fig_cm = px.imshow(
    cm,
    text_auto=True,
    labels=dict(x="القيم المتنبأ بها", y="القيم الحقيقية"),
    x=['لا إصابة', 'إصابة'],
    y=['لا إصابة', 'إصابة'],
    color_continuous_scale='Blues',
    title='مصفوفة الارتباك للنموذج'
)
fig_cm.update_layout(
    font=arabic_font,
    width=600,
    height=600,
    title_font=arabic_font
)
fig_cm.write_image("/home/ubuntu/fixed_arabic_plots/confusion_matrix.png", scale=2)

# 6. تحليل توزيع احتمالات الإصابة
fig_prob = go.Figure()
fig_prob.add_trace(
    go.Histogram(
        x=y_prob,
        nbinsx=30,
        name='توزيع الاحتمالات',
        marker_color='#3498db'
    )
)
fig_prob.add_trace(
    go.Scatter(
        x=[best_threshold, best_threshold],
        y=[0, 500],
        mode='lines',
        name=f'عتبة التنبؤ ({best_threshold:.3f})',
        line=dict(color='#e74c3c', width=3, dash='dash')
    )
)
fig_prob.update_layout(
    title='توزيع احتمالات الإصابة',
    xaxis=dict(title='احتمالية الإصابة'),
    yaxis=dict(title='التكرار'),
    font=arabic_font,
    legend=dict(x=0.7, y=0.9),
    width=800,
    height=600,
    title_font=arabic_font
)
fig_prob.write_image("/home/ubuntu/fixed_arabic_plots/probability_distribution.png", scale=2)

# 7. تحليل العلاقة بين المتغيرات الأكثر أهمية ومخاطر الإصابة
top_features = feature_importance.head(4)['feature'].tolist()
top_features_arabic = [feature_arabic_names[f] for f in top_features]

fig_top_features = make_subplots(
    rows=2, cols=2,
    subplot_titles=[f'العلاقة بين {feature_arabic_names[feature]} والإصابة' for feature in top_features]
)

for i, feature in enumerate(top_features):
    row = i // 2 + 1
    col = i % 2 + 1
    
    # إنشاء بيانات للرسم
    feature_data_0 = X[feature][y == 0]
    feature_data_1 = X[feature][y == 1]
    
    fig_top_features.add_trace(
        go.Box(
            y=feature_data_0,
            name='لا إصابة',
            marker_color='#3498db',
            boxmean=True
        ),
        row=row, col=col
    )
    
    fig_top_features.add_trace(
        go.Box(
            y=feature_data_1,
            name='إصابة',
            marker_color='#e74c3c',
            boxmean=True
        ),
        row=row, col=col
    )

fig_top_features.update_layout(
    title='العلاقة بين المتغيرات الأكثر أهمية والإصابات',
    font=arabic_font,
    height=800,
    width=1000,
    showlegend=False,
    title_font=arabic_font
)
fig_top_features.write_image("/home/ubuntu/fixed_arabic_plots/top_features_vs_injury.png", scale=2)

# 8. تحليل العلاقة بين المتغيرات الأكثر أهمية
corr_matrix = model_data[top_features].corr()

# إنشاء مصفوفة الارتباط مع الأسماء العربية
corr_matrix_arabic = corr_matrix.copy()
corr_matrix_arabic.index = [feature_arabic_names[f] for f in top_features]
corr_matrix_arabic.columns = [feature_arabic_names[f] for f in top_features]

fig_corr = px.imshow(
    corr_matrix_arabic,
    text_auto='.2f',
    color_continuous_scale='RdBu_r',
    title='مصفوفة الارتباط بين المتغيرات الأكثر أهمية',
    zmin=-1,
    zmax=1
)
fig_corr.update_layout(
    font=arabic_font,
    width=700,
    height=600,
    title_font=arabic_font
)
fig_corr.write_image("/home/ubuntu/fixed_arabic_plots/top_features_correlation.png", scale=2)

# 9. إنشاء صورة ملخصة للنتائج
fig_summary = make_subplots(
    rows=2, cols=2,
    subplot_titles=[
        'أهمية المتغيرات في النموذج',
        'منحنى ROC للنموذج',
        'مصفوفة الارتباك',
        'العلاقة بين المتغيرات الأكثر أهمية والإصابات'
    ],
    specs=[
        [{"type": "xy"}, {"type": "xy"}],
        [{"type": "xy"}, {"type": "xy"}]
    ]
)

# إضافة أهمية المتغيرات
for i, row in feature_importance.head(5).iterrows():
    fig_summary.add_trace(
        go.Bar(
            x=[row['importance']],
            y=[row['arabic_name']],
            orientation='h',
            marker_color='#3498db',
            showlegend=False
        ),
        row=1, col=1
    )

# إضافة منحنى ROC
fig_summary.add_trace(
    go.Scatter(
        x=fpr, y=tpr,
        mode='lines',
        name=f'AUC = {roc_auc:.3f}',
        line=dict(color='#2ecc71', width=2),
        showlegend=False
    ),
    row=1, col=2
)
fig_summary.add_trace(
    go.Scatter(
        x=[0, 1], y=[0, 1],
        mode='lines',
        line=dict(color='#7f7f7f', width=1, dash='dash'),
        showlegend=False
    ),
    row=1, col=2
)

# إضافة مصفوفة الارتباك
fig_summary.add_trace(
    go.Heatmap(
        z=cm,
        x=['لا إصابة', 'إصابة'],
        y=['لا إصابة', 'إصابة'],
        colorscale='Blues',
        showscale=False,
        text=cm,
        texttemplate="%{text}",
        textfont={"size": 14}
    ),
    row=2, col=1
)

# إضافة العلاقة بين المتغيرات الأكثر أهمية والإصابات
fig_summary.add_trace(
    go.Box(
        y=X[top_features[0]][y == 0],
        name='لا إصابة',
        marker_color='#3498db',
        boxmean=True,
        showlegend=True
    ),
    row=2, col=2
)
fig_summary.add_trace(
    go.Box(
        y=X[top_features[0]][y == 1],
        name='إصابة',
        marker_color='#e74c3c',
        boxmean=True,
        showlegend=True
    ),
    row=2, col=2
)

fig_summary.update_layout(
    title='ملخص نتائج نموذج التنبؤ بالإصابات الرياضية',
    font=arabic_font,
    height=800,
    width=1000,
    title_font=arabic_font,
    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
)

# تحديث تخطيط الرسوم البيانية
fig_summary.update_xaxes(title_text="الأهمية", row=1, col=1)
fig_summary.update_yaxes(title_text="", row=1, col=1)
fig_summary.update_xaxes(title_text="معدل الإيجابيات الخاطئة", row=1, col=2)
fig_summary.update_yaxes(title_text="معدل الإيجابيات الصحيحة", row=1, col=2)
fig_summary.update_xaxes(title_text="القيم المتنبأ بها", row=2, col=1)
fig_summary.update_yaxes(title_text="القيم الحقيقية", row=2, col=1)
fig_summary.update_xaxes(title_text="", row=2, col=2)
fig_summary.update_yaxes(title_text=feature_arabic_names[top_features[0]], row=2, col=2)

fig_summary.write_image("/home/ubuntu/fixed_arabic_plots/visionguard_results_summary.png", scale=2)

print("تم إنشاء جميع الرسوم البيانية بنجاح مع تصحيح اللغة العربية")
